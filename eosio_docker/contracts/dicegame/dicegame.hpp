#include <eosiolib/eosio.hpp>
#include <eosiolib/asset.hpp>
#include <eosiolib/time.hpp>
#include <eosiolib/symbol.hpp>
#include <eosiolib/types.hpp>
#include <eosiolib/currency.hpp>
#include <eosiolib/public_key.hpp>


using namespace std;
class dicegame : public eosio::contract
{

private:
  enum game_status : uint8_t
  {
    SUSPEND = 0,
    ONGOING = 1,
    MINING = 2,
    DONE = 3,

  };

  const map<std::string, uint64_t> betcase_reward = {
      {"SMALL", 1},
      {"BIG", 1},
      {"TRIPLE_1", 150},
      {"TRIPLE_2", 150},
      {"TRIPLE_3", 150},
      {"TRIPLE_4", 150},
      {"TRIPLE_5", 150},
      {"TRIPLE_6", 150},
      {"NUM_4", 150},
      {"NUM_5", 150},
      {"NUM_6", 150},
      {"NUM_7", 150},
      {"NUM_8", 150},
      {"NUM_9", 150},
      {"NUM_10", 150},
      {"NUM_11", 150},
      {"NUM_12", 150},
      {"NUM_13", 150},
      {"NUM_14", 150},
      {"NUM_15", 150},
      {"NUM_16", 150},
      {"NUM_17", 150},
      {"SINGLE_1", 1},
      {"SINGLE_2", 1},
      {"SINGLE_3", 1},
      {"SINGLE_4", 1},
      {"SINGLE_5", 1},
      {"SINGLE_6", 1}};

  struct st_transfer
  {
    account_name from;
    account_name to;
    eosio::asset quantity;
    std::string memo;
  };

  // @abi table globals i64
  struct global
  {
    uint64_t id;
    uint64_t val;

    uint64_t primary_key() const { return id; }
    EOSLIB_SERIALIZE(global, (id)(val))
  };
  typedef eosio::multi_index<N(globals), global> globals_table;

  //@abi table bettokens
  struct bettoken
  {
    eosio::symbol_name token_name;
    account_name contract;
    uint64_t min_bet;
    uint64_t max_bet;
    uint64_t primary_key() const { return token_name; };
    EOSLIB_SERIALIZE(bettoken, (token_name)(contract)(min_bet)(max_bet));
  };
  typedef eosio::multi_index<N(bettokens), bettoken> bettoken_table;

  // @abi table players i64
  struct player
  {
    account_name bettor;
    account_name referral;
    uint64_t bet_total; // only accept EOS
    eosio::time_point_sec last_update;
    uint64_t primary_key() const { return bettor; }
    uint64_t get_referral() const { return referral; }
    EOSLIB_SERIALIZE(player, (bettor)(referral)(bet_total)(last_update))
  };

  typedef eosio::multi_index<N(players), player,
  eosio::indexed_by<N(by_referral), eosio::const_mem_fun<player, uint64_t, &player::get_referral>>> players_table;

  // @abi table game1s i64
  struct game
  {
    uint64_t round;
    uint8_t dice_one = 0;
    uint8_t dice_two = 0;
    uint8_t dice_three = 0;
    vector<std::string> result;
    eosio::time_point_sec start_at;
    eosio::time_point_sec stop_at;
    uint32_t player_num = 0;
    uint32_t total_amount = 0; //should be removed
    uint8_t status = SUSPEND;
    checksum256 seed;

    uint64_t primary_key() const { return round; }

    EOSLIB_SERIALIZE(game, (round)(dice_one)(dice_two)(dice_three)(result)(start_at)(stop_at)(player_num)(total_amount)(status)(seed))
  };

  typedef eosio::multi_index<N(game1s), game> games_table;

  //@abi table bet2s i64
  struct bet_info
  {
    uint64_t id;
    uint64_t round;
    account_name contract;
    account_name bettor;
    std::string bet_case;
    eosio::asset bet_amount;
    eosio::asset pay_out;
    bool active;
    eosio::time_point_sec bet_at;

    uint64_t primary_key() const { return id; }
    uint64_t get_round() const { return round; }
    uint64_t get_better() const { return bettor; }
    EOSLIB_SERIALIZE(bet_info, (id)(round)(contract)(bettor)(bet_case)(bet_amount)(pay_out)(active)(bet_at))
  };

  typedef eosio::multi_index<N(bet2s), bet_info, 
  eosio::indexed_by<N(by_round), eosio::const_mem_fun<bet_info, uint64_t, &bet_info::get_round>>, 
  eosio::indexed_by<N(by_bettor), eosio::const_mem_fun<bet_info, uint64_t, &bet_info::get_better>>> bets_table;

  // @abi table seed
  struct seed
  {
    uint64_t key = 1;
    uint32_t value = 1;

    auto primary_key() const { return key; }
  };

  typedef eosio::multi_index<N(seed), seed> seed_table;

  globals_table _globals;
  // players_table _players;
  games_table _games;
  bets_table _bets;
  bettoken_table _bettokens;
  seed_table _seed;

  int random(const int range);

  eosio::asset get_bet_reward(string bet_case, eosio::asset amount_atm);
  uint64_t get_global_val(const uint64_t global_id);
  void set_global_val(const uint64_t global_id, uint64_t global_val);

  template <typename Map>
  typename Map::const_iterator
  find_prefix(Map const &map, typename Map::key_type const &key)
  {
    typename Map::const_iterator it = map.upper_bound(key);
    while (it != map.begin())
    {
      --it;
      if (key.substr(0, it->first.size()) == it->first)
        return it;
    }

    return map.end(); // map contains no prefix
  }

public:
  dicegame(account_name _self);

  void transfer(uint64_t sender, uint64_t receiver);

  ///@abi action
  void initialize();

  ///@abi action
  void setbettoken(eosio::asset token_name, account_name contract, uint64_t min, uint64_t max);

  // @abi action
  void setglobal(uint64_t id, uint64_t val);

  ///@abi action
  void login(account_name player, account_name referal);

  ///@abi action
  void startgame();

  ///@abi action
  void revealdice();

  ///@abi action
  void mine(uint64_t bet_id);

  ///@abi action
  void clearrow(uint64_t table, uint64_t row);

    ///@abi action
  void claimbet(account_name player, uint64_t bet_id);

    ///@abi action
  void claimref(account_name ref);

      ///@abi action
  void dailyreward(account_name ref);
};
