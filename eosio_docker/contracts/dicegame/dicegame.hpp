#include <eosiolib/eosio.hpp>

using namespace std;
class eosdicegame : public eosio::contract
{

private:
  enum game_status : int8_t
  {
    ONGOING = 0,
    DONE = 1,
    SUSPEND = -1
  };

  enum bet_case : uint8_t
  {
    SMALL = 0,
    BIG = 1,
    TRIPLE_ONE = 2,
    TRIPLE_TWO 3,
    TRIPLE_THREE = 4,
    TRIPLE_FOUR = 5,
    TRIPLE_FIVE = 6,
    TRIPLE_SIX = 7,
    NUM_4 = 8,
    NUM_5 = 9,
    NUM_5 = 10,
    NUM_6 = 11,
    NUM_7 = 12,
    NUM_8 = 13,
    NUM_9 = 14,
    NUM_10 = 15,
    NUM_11 = 16,
    NUM_12 = 17,
    NUM_13 = 18,
    NUM_14 = 19,
    NUM_15 = 20,
    NUM_16 = 21,
    NUM_17 = 22,
    SINGLE_1 = 23,
    SINGLE_2 = 24,
    SINGLE_3 = 25,
    SINGLE_4 = 26,
    SINGLE_5 = 27,
    SINGLE_6 = 28,
  };

  const map<bet_case, bet_reward> bet_dict = {
      {SMALL, 1, {BIG, 1}, {TRIPLE_ONE, 150}, {TRIPLE_TWO, 150}, {TRIPLE_THREE, 150}, {TRIPLE_FOUR, 150}, {TRIPLE_FIVE, 150}, {TRIPLE_SIX, 150}, {NUM_4, 150}, {NUM_5, 150}, {NUM_6, 150}, {NUM_7, 150}, {NUM_8, 150}, {NUM_9, 150}, {NUM_10, 150}, {NUM_11, 150}, {NUM_12, 150}, {NUM_13, 150}, {NUM_14, 150}, {NUM_15, 150}, {NUM_16, 150}, {NUM_17, 150}, {SINGLE_1, 1}, {SINGLE_2, 1}, {SINGLE_3, 1}, {SINGLE_4, 1}, {SINGLE_5, 1}, {SINGLE_6, 1}}};

  struct st_transfer
  {
    account_name from;
    account_name to;
    asset quantity;
    std::string memo;
  };

  struct global
  {
    uint64_t id;
    uint64_t value;

    EOSLIB_SERIALIZE(global, (id)(value))
  };

  typedef eosio::multi_index<N(globals), global> global_table

      // @abi table players i64
      struct player
  {
    account_name bettor;
    account_name referral;
    uint64_t bet_total;
    uint64_t bet_win;
    time_point_sec last_time;

    uint64_t primary_key() const { return id; }

    EOSLIB_SERIALIZE(player, (id)(bettor)(referral)(bet_amount)(bet_num)(bet_time))
  };

  typedef eosio::multi_index<N(players), player> players_table;

  // @abi table activebets i64
  struct game
  {
    uint64_t round;
    uint8_t dice_one = 0;
    uint8_t dice_two = 0;
    uint8_t dice_three = 0;
    time_point_sec start_at = 0;
    time_point_sec stop_at = 0;
    uint32_t player_num = 0;
    uint32_t total_amount = 0;
    int8_t status = ONGOING;
    checksum256 seed;
    time_point_sec start_at;
    uint64_t primary_key() const { return round; }

    EOSLIB_SERIALIZE(game, (round)(dice_one)(dice_two)(dice_three)(player_num)(total_amount)(status)(seed)(start_at))
  };

  typedef eosio::multi_index<N(games), game> games_table;

  //@abi table global i64
  struct bet
  {
    uint64_t bet_id;
    uint64_t bet_round;
    account_name bettor;
    uint64_t bet_case;
    asset bet_amount;
    bool active;
    time_point_sec bet_at;

    EOSLIB_SERIALIZE(bet, (bet_id)(bet_round)(bettor)(bet_case)(bet_amount)(active)(bet_at))
  };

  typedef eosio::multi_index<N(seed), seed> seed_table;

  players_table _players;
  games_table _games;
  game_setting_table _game_setting;
  global_table _global;
  global_item _global_state;

public:
  eosdicegame(account_name self) : contract(self), _users(self, self), _seed(self, self) {}

  void startgame(account_name username);

  void endgame(account_name username);

  ///@abi action
  void setactived(bool actived);

  // @abi action
  void setglobal(uint64_t id, uint64_t val);

  void playgame(account_name username, uint8_t bet_num);

  void nextround(account_name username);

  void reveal(account_name username);
};
