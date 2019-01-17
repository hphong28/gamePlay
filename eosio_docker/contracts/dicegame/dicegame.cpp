#include "dicegame.hpp"
#include "eosio.token.hpp"
#include <eosiolib/transaction.hpp>
#include <algorithm>
#include <iostream>
#include <iterator>
#include <vector>

#define GLOBAL_ID_BET 101
#define GLOBAL_ID_ACTIVE 102
#define GLOBAL_ID_ROUND 103
#define GLOBAL_ID_ROUND_DURATION_SEC 104
#define GLOBAL_ID_ROUND_MAX_PLAYERS 105

const double REF_REWARD_PERCENT = 0.01;     // 1%
const double SINGLE_BET_MAX_PERCENT = 0.05; // 5%

const int DAILY_BONUS_REWARD_DURATION = 24 * 60 * 60;

const int DAILY_BONUS_REWARD_AMOUNT = 30000;

#define GAME_SYMBOL S(4, ONE)
#define EOS_SYMBOL S(4, EOS)
#define GAME_TOKEN_CONTRACT N(onetoken1234)
#define EOS_TOKEN_CONTRACT N(eosio.token)

dicegame::dicegame(account_name _self) : contract(_self),
                                         _globals(_self, _self),
                                         _games(_self, _self),
                                         _bets(_self, _self),
                                         _bettokens(_self, _self),
                                         _players(_self, _self),
                                         _seed(_self, _self)
{
}

void dicegame::transfer(uint64_t sender, uint64_t receiver)
{
    print("\n>>> sender >>>", sender, " - name: ", eosio::name{sender});
    print("\n>>> receiver >>>", receiver, " - name: ", eosio::name{receiver});

    auto transfer_data = eosio::unpack_action_data<st_transfer>();
    if (transfer_data.from == _self || transfer_data.to != _self)
    {
        return;
    }

    //eosio_assert(transfer_data.quantity.symbol == eosio::string_to_symbol(4, "EOS"), "Only accepts EOS");
    if (transfer_data.memo == "deposit")
    {
    }
    else
    {
        eosio_assert(transfer_data.quantity.is_valid(), "Invalid token transfer");
        eosio_assert(transfer_data.quantity.amount > 0, "Quantity must be positive");

        auto active_pos = _globals.find(GLOBAL_ID_ACTIVE);
        eosio_assert(active_pos != _globals.end() && active_pos->val, "Maintaining ...");

        eosio::symbol_name sym_name = eosio::symbol_type(transfer_data.quantity.symbol).name();
        auto token_iter = _bettokens.find(sym_name);
        eosio_assert(token_iter != _bettokens.end(), "bet token doesn't allow");
        eosio::token bet_token(token_iter->contract);
        eosio::asset balance = bet_token.get_balance(_self, sym_name);

        int64_t max = (balance.amount * SINGLE_BET_MAX_PERCENT);
        eosio_assert(transfer_data.quantity.amount <= max, "Bet amount exceeds");

        const std::size_t first_break = transfer_data.memo.find("-");
        const std::size_t second_break = transfer_data.memo.find('-', first_break + 1);
        std::string bet_str = transfer_data.memo.substr(0, first_break);
        std::string ref_str = transfer_data.memo.substr(first_break + 1, second_break - first_break - 1);

        account_name tmp_referral = N("");

        const account_name possible_ref = eosio::string_to_name(ref_str.c_str());

        if (possible_ref != _self && possible_ref != transfer_data.from && is_account(possible_ref))
        {
            tmp_referral = possible_ref;
        }

        auto existing = _players.find(transfer_data.from);

        auto referral_quantity = transfer_data.quantity;
        referral_quantity.amount *= REF_REWARD_PERCENT;

        if (existing == _players.end())
        {
            std::vector<eosio::asset> init_amount;
            init_amount.push_back(referral_quantity);
            _players.emplace(_self, [&](auto &player) {
                player.bettor = transfer_data.from;
                player.referral = N("");
                player.referral_bonus = init_amount;
            });
        }
        else
        {
            auto temp_referral_bonus = existing->referral_bonus;

            for (auto it = temp_referral_bonus.begin(); it != temp_referral_bonus.cend(); ++it)
            {

                if ((*it).symbol.name() == referral_quantity.symbol.name())
                {
                    *it += referral_quantity;
                    break;
                }
                else if (std::next(it) == temp_referral_bonus.end())
                {
                    temp_referral_bonus.push_back(referral_quantity);
                }
            }
            _players.modify(existing, 0, [&](auto &player) {
                player.referral = player.referral == N("") ? tmp_referral : player.referral;
                player.referral_bonus = temp_referral_bonus;
            });
        }

        // check bet case is valid
        auto betcase_itr = find_prefix(betcase_reward, bet_str);
        eosio_assert(betcase_itr != betcase_reward.end(), "Bet case doesn't exist");

        auto round_itr = _globals.find(GLOBAL_ID_ROUND);
        eosio_assert(round_itr != _globals.end(), "Unknown global id");
        uint64_t current_round = round_itr->val;

        auto betid_itr = _globals.find(GLOBAL_ID_BET);
        eosio_assert(betid_itr != _globals.end(), "Unknown global id");

        auto round_max_players_itr = _globals.find(GLOBAL_ID_ROUND_MAX_PLAYERS);
        eosio_assert(round_max_players_itr != _globals.end(), "Unknown global id");
        uint64_t round_max_players = round_max_players_itr->val;

        auto game_itr = _games.find(current_round);

        eosio_assert((game_itr->status == ONGOING), "Game does't not start yet");

        eosio_assert((game_itr->player_num < round_max_players), "Game was reached to max players ");

        eosio_assert((game_itr->stop_at.sec_since_epoch() >= eosio::time_point_sec(now()).sec_since_epoch()), "Game has ended");

        _games.modify(game_itr, 0, [&](auto &game) {
            game.player_num += 1;
        });
        // Todo: check bet_num by eosio_assert
        _bets.emplace(_self, [&](auto &bet) {
            bet.id = betid_itr->val;
            bet.round = current_round;
            bet.contract = token_iter->contract;
            bet.bettor = transfer_data.from;
            bet.bet_case = bet_str;
            bet.bet_amount = transfer_data.quantity;
            bet.pay_out = eosio::asset(0, transfer_data.quantity.symbol);
            bet.active = 1;
            bet.bet_at = eosio::time_point_sec(now());
        });

        _globals.modify(betid_itr, 0, [&](auto &betid) {
            betid.val += 1;
        });
    }
}

/// @abi action
void dicegame::initialize()
{
    require_auth(_self);

    _globals.emplace(_self, [&](auto &a) {
        a.id = GLOBAL_ID_BET;
        a.val = 0;
    });

    _globals.emplace(_self, [&](auto &a) {
        a.id = GLOBAL_ID_ACTIVE;
        a.val = 0;
    });

    _globals.emplace(_self, [&](auto &a) {
        a.id = GLOBAL_ID_ROUND;
        a.val = 0;
    });

    _globals.emplace(_self, [&](auto &a) {
        a.id = GLOBAL_ID_ROUND_DURATION_SEC;
        a.val = 0;
    });

    _globals.emplace(_self, [&](auto &a) {
        a.id = GLOBAL_ID_ROUND_MAX_PLAYERS;
        a.val = 0;
    });
}

void dicegame::setbettoken(eosio::asset token_name, account_name contract, uint64_t min, uint64_t max)
{
    auto token_iter = _bettokens.find(token_name.symbol);
    if (token_iter == _bettokens.end())
    {
        _bettokens.emplace(_self, [&](auto &a) {
            a.token_name = eosio::symbol_type(token_name.symbol).name();
            a.contract = contract;
            a.min_bet = min;
            a.max_bet = max;
        });
    }
    else
    {
        _bettokens.modify(token_iter, 0, [&](auto &a) {
            a.contract = contract;
            a.min_bet = min;
            a.max_bet = max;
        });
    }
}

void dicegame::setglobal(uint64_t id, uint64_t val)
{
    require_auth(_self);
    auto pos = _globals.find(id);
    if (pos == _globals.end())
    {
        _globals.emplace(_self, [&](auto &info) {
            info.id = id;
            info.val = val;
        });
    }
    else
    {
        _globals.modify(pos, 0, [&](auto &info) {
            info.val = val;
        });
    }
}

void dicegame::startgame()
{
    // Ensure this action is authorized by contract owner
    require_auth(_self);

    auto round_itr = _globals.find(GLOBAL_ID_ROUND);
    auto duration_itr = _globals.find(GLOBAL_ID_ROUND_DURATION_SEC);
    eosio_assert((round_itr != _globals.end()) && (duration_itr != _globals.end()), "Unknown global id");
    uint64_t current_round = round_itr->val;
    uint64_t duration = duration_itr->val;

    // check current round was ended
    if (current_round == 0)
    {
        _games.emplace(_self, [&](auto &game) {
            game.round = 0;
            game.start_at = eosio::time_point_sec(now());
            game.stop_at = eosio::time_point_sec(now());
            game.status = DONE;
        });
    }

    auto game_itr = _games.find(current_round);
    eosio_assert((game_itr != _games.end()) && (game_itr->status == DONE), "current game hasn't done yet");
    uint64_t next = current_round + 1;
    eosio_assert(next > round_itr->val, "new round number should greater than the old!");

    //Todo: initial for new game
    _games.emplace(_self, [&](auto &game) {
        game.round = next;
        game.start_at = eosio::time_point_sec(now());
        game.stop_at = eosio::time_point_sec(now()) + duration;
        game.status = ONGOING;
    });

    _globals.modify(round_itr, 0, [&](auto &round) {
        round.val = next;
    });

    // end game

    eosio::transaction out;
    out.actions.emplace_back(eosio::permission_level{_self, N(active)}, _self, N(revealdice), std::make_tuple());
    out.delay_sec = duration;
    out.send(0, _self, false);
}

void dicegame::revealdice()
{
    require_auth(_self);

    auto round_itr = _globals.find(GLOBAL_ID_ROUND);
    eosio_assert(round_itr != _globals.end(), "Unknown global id");
    uint64_t current_round = round_itr->val;

    auto round_duration_itr = _globals.find(GLOBAL_ID_ROUND_DURATION_SEC);
    eosio_assert(round_duration_itr != _globals.end(), "Unknown global id");
    uint64_t round_duration = round_duration_itr->val;

    auto game_itr = _games.find(current_round);
    eosio_assert(game_itr->status == ONGOING, "current game hasn't active yet");

    int dice1 = random(6) + 1;
    int dice2 = random(6) + 1;
    int dice3 = random(6) + 1;

    vector<string> result_tmp;

    //Check Big, Small
    auto sum_dice = dice1 + dice2 + dice3;
    if ((sum_dice >= 4) && (sum_dice <= 10) && !(dice1 & dice2 & dice3))
        result_tmp.push_back("SMALL");
    else if ((sum_dice >= 11) && (sum_dice <= 17) && !(dice1 & dice2 & dice3))
        result_tmp.push_back("BIG");

    //Check Oven, Odd
    if (!(sum_dice % 2) && !(dice1 & dice2 & dice3))
        result_tmp.push_back("OVEN");
    else if ((sum_dice % 2) && !(dice1 & dice2 & dice3))
        result_tmp.push_back("ODD");

    // Check Number
    if ((sum_dice >= 4) && (sum_dice <= 17))
        result_tmp.push_back("NUM_" + std::to_string(sum_dice));

    // Check triple
    for (int i = 1; i <= 6; i++)
    {
        if ((dice1 & dice2 & dice3) == i)
            result_tmp.push_back("TRIPLE_" + std::to_string(dice1));
    }

    // Check Single
    for (int i = 1; i <= 6; i++)
    {
        if (dice1 == i)
            result_tmp.push_back("SINGLE_" + std::to_string(dice1));
        if (dice2 == i)
            result_tmp.push_back("SINGLE_" + std::to_string(dice2));
        if (dice3 == i)
            result_tmp.push_back("SINGLE_" + std::to_string(dice3));
    }

    // get radom for three bet:
    _games.modify(game_itr, 0, [&](auto &game) {
        game.dice_one = dice1;
        game.dice_two = dice2;
        game.dice_three = dice3;
        game.result = result_tmp;
        game.stop_at = eosio::time_point_sec(now());
        game.status = MINING;
    });

    eosio::transaction out;
    out.actions.emplace_back(eosio::permission_level{_self, N(active)}, _self, N(mine), std::make_tuple(current_round));
    out.send(0, _self, false);
}

void dicegame::mine(uint64_t round_id)
{
    require_auth(_self);

    auto game_itr = _games.find(round_id);
    eosio_assert(game_itr->status == MINING, "game hasn't in minning mode");
    vector<string> bet_result = game_itr->result;

    auto round_idx = _bets.get_index<N(by_round)>();
    auto round_find = round_idx.find(round_id);
    eosio_assert(round_find != round_idx.end(), "round doesn't exist");

    eosio::transaction transfer;

    for (auto round_it = round_find; round_it != round_idx.cend() && (round_find->round == round_id); ++round_it)
    {
        auto tmp_reward = round_it->bet_amount;
        for (auto result_itr = bet_result.begin(); result_itr != bet_result.cend() && (round_find->bet_case == *result_itr); ++result_itr)
        {
            tmp_reward += get_bet_reward(round_it->bet_case, round_it->bet_amount);
        }
        if (tmp_reward.amount != round_it->bet_amount.amount)
        {
            round_idx.modify(round_it, 0, [&](auto &bet) {
                bet.pay_out = tmp_reward;
            });

            transfer.actions.emplace_back(eosio::permission_level{_self, N(active)}, round_it->contract, N(transfer), std::make_tuple(_self, round_it->bettor, tmp_reward, std::string("Bet Reward: oneplay.io")));
        }
    }
    if(transfer.actions.size())
    transfer.send(0, _self, false);

    _games.modify(game_itr, 0, [&](auto &game) {
        game.status = DONE;
    });
}

void dicegame::clearrow(uint64_t table, uint64_t row)
{
    // Ensure this action is authorized by the player
    require_auth(_self);
    switch (table)
    {
    case 0:
    {
        auto game_itr = _games.find(row);
        eosio_assert(game_itr != _games.end(), "Game row not found");
        _games.erase(game_itr);
        break;
    }
    case 1:
    {
        auto bet_itr = _bets.find(row);
        eosio_assert(bet_itr != _bets.end(), "Bet row not found");
        _bets.erase(bet_itr);
        break;
    }
    case 2:
    {
        auto player_itr = _players.find(row);
        eosio_assert(player_itr != _players.end(), "Player row not found");
        _players.erase(player_itr);
        break;
    }
    default:
    {
        break;
    }
    }
}

void dicegame::claimbet(account_name player, uint64_t bet_id)
{
}

///@abi action
void dicegame::claimref(account_name ref)
{
    // send
}

void dicegame::dailyreward(account_name account, account_name referral)
{
    require_auth(account);
    account_name tmp_referral = N("");
    if (referral != _self && is_account(referral))
    {
        tmp_referral = referral;
    }

    auto player = _players.find(account);

    if (player == _players.end())
    {
        std::vector<eosio::asset> init_amount;
        init_amount.push_back(eosio::asset(0, GAME_SYMBOL));
        init_amount.push_back(eosio::asset(0, EOS_SYMBOL));
        _players.emplace(_self, [&](auto &player) {
            player.bettor = account;
            player.referral = tmp_referral;
            player.last_update = eosio::time_point_sec(now());
            player.referral_bonus = init_amount;
        });
    }
    else
    {
        int remain_time = DAILY_BONUS_REWARD_DURATION - player->last_update.sec_since_epoch() % DAILY_BONUS_REWARD_DURATION;
        int last_time_count = player->last_update.sec_since_epoch() / DAILY_BONUS_REWARD_DURATION;
        int current_time_count = eosio::time_point_sec(now()).sec_since_epoch() / DAILY_BONUS_REWARD_DURATION;

        eosio_assert(last_time_count > current_time_count, "Please wait next day");

        _players.modify(player, 0, [&](auto &player) {
            player.referral = player.referral == N("") ? tmp_referral : player.referral;
            player.last_update = eosio::time_point_sec(now());
        });
    }
    auto daily_reward = eosio::asset(DAILY_BONUS_REWARD_AMOUNT, GAME_SYMBOL);

    eosio::transaction transfer;
    transfer.actions.emplace_back(eosio::permission_level{_self, N(active)}, GAME_TOKEN_CONTRACT, N(transfer), std::make_tuple(_self, account, daily_reward, std::string("Daily Reward: oneplay.io")));
    transfer.send(0, _self, false);
}
eosio::asset dicegame::get_bet_reward(string bet_case, eosio::asset amount_atm)
{
    auto tmp = amount_atm;
    tmp.amount = amount_atm.amount * find_prefix(betcase_reward, bet_case)->second;
    return tmp;
}

uint64_t dicegame::get_global_val(const uint64_t global_id)
{
    auto global_itr = _globals.find(GLOBAL_ID_ROUND);
    eosio_assert(global_itr != _globals.end(), "Unknown global id");
    return global_itr->val;
}

void dicegame::set_global_val(const uint64_t global_id, uint64_t global_val)
{
    auto global_itr = _globals.find(GLOBAL_ID_ROUND);
    eosio_assert(global_itr != _globals.end(), "Unknown global id");
    _globals.modify(global_itr, 0, [&](auto &global) {
        global.val = global_val;
    });
}

// Simple Pseudo Random Number Algorithm, randomly pick a number within 0 to n-1
int dicegame::random(const int range)
{
    // Find the existing seed
    auto seed_iterator = _seed.begin();

    // Initialize the seed with default value if it is not found
    if (seed_iterator == _seed.end())
    {
        seed_iterator = _seed.emplace(_self, [&](auto &seed) {});
    }

    // Generate new seed value using the existing seed value
    int prime = 65537;
    auto new_seed_value = (seed_iterator->value + now()) % prime;

    // Store the updated seed value in the table
    _seed.modify(seed_iterator, _self, [&](auto &s) {
        s.value = new_seed_value;
    });

    // Get the random result in desired range
    int random_result = new_seed_value % range;
    return random_result;
}

#define EOSIO_ABI_EX(TYPE, MEMBERS)                                                                             \
    extern "C"                                                                                                  \
    {                                                                                                           \
        void apply(uint64_t receiver, uint64_t code, uint64_t action)                                           \
        {                                                                                                       \
            auto self = receiver;                                                                               \
            if (code == self || code == N(eosio.token) || code == GAME_TOKEN_CONTRACT || action == N(onerror))  \
            {                                                                                                   \
                if (action == N(transfer))                                                                      \
                {                                                                                               \
                    eosio_assert(code == N(eosio.token) || code == GAME_TOKEN_CONTRACT, "Must transfer Token"); \
                }                                                                                               \
                TYPE thiscontract(self);                                                                        \
                switch (action)                                                                                 \
                {                                                                                               \
                    EOSIO_API(TYPE, MEMBERS)                                                                    \
                }                                                                                               \
                /* does not allow destructor of thiscontract to run: eosio_exit(0); */                          \
            }                                                                                                   \
        }                                                                                                       \
    }

EOSIO_ABI_EX(dicegame, (transfer)(initialize)(setbettoken)(setglobal)(startgame)(revealdice)(mine)(clearrow)(claimbet)(claimref)(dailyreward))
