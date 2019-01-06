DICE GAME
-----------------

Example game session using cleos
-------
#### Prerequisites


* Please use following accounts to play bet

ilovebet123 -  5JXZVqbaH9eNAHH8cNErrgL4dQJcduXQkmfrmaGe55YfCXL212G
eosluckydice - 5JXZVqbaH9eNAHH8cNErrgL4dQJcduXQkmfrmaGe55YfCXL212G

* Endpoint network:

http://jungle2.cryptolions.io:80

* Contract name: dicedice1234


##### Set dice contract to dicedice1234 account
````bash
$ cleos -u http://jungle2.cryptolions.io:80 set contract dicedice1234 ./dicegame/ -p dicedice1234
````

##### Check contract ram
````bash
cleos -u http://jungle2.cryptolions.io:80 get account dicedice1234
...
memory: 
    quota:     977.3 KiB    used:     594.8 KiB  
````

##### Check globalvars table
````bash
#define GLOBAL_ID_BET 101
#define GLOBAL_ID_ACTIVE 102
#define GLOBAL_ID_ROUND 103
#define GLOBAL_ID_ROUND_DURATION_SEC 104
#define GLOBAL_ID_ROUND_MAX_PLAYERS 105
$ cleos -u http://jungle2.cryptolions.io:80 push action dicedice1234 initialize '[""]' -p dicedice1234

$ cleos -u http://jungle2.cryptolions.io:80 push action dicedice1234 setglobal '[104, 90]' -p dicedice1234

$ cleos -u http://jungle2.cryptolions.io:80 push action dicedice1234 setglobal '[105, 50]' -p dicedice1234

$ cleos -u http://jungle2.cryptolions.io:80 push action dicedice1234 setglobal '[102, 1]' -p dicedice1234

$ cleos -u http://jungle2.cryptolions.io:80 get table dicedice1234 dicedice1234 globals
{
  "rows": [{
      "id": 101,
      "val": 0
    },{
      "id": 102,
      "val": 1
    },{
      "id": 103,
      "val": 0
    },{
      "id": 104,
      "val": 90
    },{
      "id": 105,
      "val": 50
    }
  ]
  "more": false
}
````
##### Enable tokens

````bash
$ cleos -u http://jungle2.cryptolions.io:80 push action dicedice1234 setbettoken '["0.0000 SYS", eosio.token, 500, 100000]' -p dicedice1234

$ cleos -u http://jungle2.cryptolions.io:80 get table dicedice1234 dicedice1234 bettokens
{
  "rows": [{
      "token_name": 5462355,
      "contract": "eosio.token",
      "min_bet": 500,
      "max_bet": 100000
    }
  ],
  "more": false
}

````


````bash
// eosio.code permission

$ cleos -u http://jungle2.cryptolions.io:80 set account permission dicedice1234 active '{"threshold": 1,"keys": [{"key": "EOS5ZwsT4k5szwhgbxyoWa5D2tHYAPxEwQKrHxWtU3xnPeJkudLfF","weight": 1}],"accounts": [{"permission":{"actor":"dicedice1234","permission":"eosio.code"},"weight":1}]}' owner -p dicedice1234

````

##### Start game
````bash


$ cleos -u http://jungle2.cryptolions.io:80 push action dicedice1234 startgame '[""]' -p dicedice1234

$ cleos -u http://jungle2.cryptolions.io:80 get table dicedice1234 dicedice1234 game1s
{
  "rows": [{
      "round": 0,
      "dice_one": 0,
      "dice_two": 0,
      "dice_three": 0,
      "result": [],
      "start_at": "2018-12-22T16:02:37",
      "stop_at": "2018-12-22T16:02:37",
      "player_num": 0,
      "total_amount": 0,
      "status": 3,
      "seed": "0000000000000000000000000000000000000000000000000000000000000000"
    },{
      "round": 1,
      "dice_one": 0,
      "dice_two": 0,
      "dice_three": 0,
      "result": [],
      "start_at": "2018-12-22T16:02:37",
      "stop_at": "1970-01-01T00:00:00",
      "player_num": 0,
      "total_amount": 0,
      "status": 1,
      "seed": "0000000000000000000000000000000000000000000000000000000000000000"
    }
  ],
  "more": false
}

````

##### bet
````bash
$ cleos -u http://jungle2.cryptolions.io:80 transfer "ilovedice123" "dicedice1234" "0.6000 EOS" "BIG-dicedicedice"
$ cleos -u http://jungle2.cryptolions.io:80 transfer "ilovedice123" "dicedice1234" "0.6000 EOS" "SMALL-dicedicedice"
$ cleos -u http://jungle2.cryptolions.io:80 transfer "ilovedice123" "dicedice1234" "0.4000 EOS" "SINGLE_1-dicedicedice"
$ cleos -u http://jungle2.cryptolions.io:80 transfer "ilovedice123" "dicedice1234" "0.5000 EOS" "TRIPLE_3-ilovedice123"

{
  "rows": [{
      "id": 0,
      "round": 1,
      "contract": "eosio.token",
      "bettor": "ilovedice123",
      "bet_case": "BIG",
      "bet_amount": "0.6000 EOS",
      "pay_out": "0.0000 EOS",
      "active": 1,
      "bet_at": "2018-12-23T02:13:03"
    },{
      "id": 1,
      "round": 1,
      "contract": "eosio.token",
      "bettor": "ilovedice123",
      "bet_case": "SMALL",
      "bet_amount": "0.6000 EOS",
      "pay_out": "0.0000 EOS",
      "active": 1,
      "bet_at": "2018-12-23T02:13:18"
    },{
      "id": 2,
      "round": 1,
      "contract": "eosio.token",
      "bettor": "ilovedice123",
      "bet_case": "SINGLE_1",
      "bet_amount": "0.4000 EOS",
      "pay_out": "0.0000 EOS",
      "active": 1,
      "bet_at": "2018-12-23T02:13:39"
    },{
      "id": 3,
      "round": 1,
      "contract": "eosio.token",
      "bettor": "ilovedice123",
      "bet_case": "TRIPLE_3",
      "bet_amount": "0.5000 EOS",
      "pay_out": "0.0000 EOS",
      "active": 1,
      "bet_at": "2018-12-23T02:14:15"
    }

````

##### reveal dice

````bash

$ cleos -u http://jungle2.cryptolions.io:80 push action dicedice1234 revealdice '[]' -p dicedice1234

$ cleos -u http://jungle2.cryptolions.io:80 get table dicedice1234 dicedice1234 game1s
{
  "rows": [{
      "round": 0,
      "dice_one": 0,
      "dice_two": 0,
      "dice_three": 0,
      "result": [],
      "start_at": "2018-12-23T02:12:00",
      "stop_at": "2018-12-23T02:12:00",
      "player_num": 0,
      "total_amount": 0,
      "status": 3,
      "seed": "0000000000000000000000000000000000000000000000000000000000000000"
    },{
      "round": 1,
      "dice_one": 3,
      "dice_two": 5,
      "dice_three": 6,
      "result": [
        "BIG",
        "NUM_14",
        "SINGLE_3",
        "SINGLE_5",
        "SINGLE_6"
      ],
      "start_at": "2018-12-23T02:12:00",
      "stop_at": "2018-12-23T02:20:05",
      "player_num": 4,
      "total_amount": 0,
      "status": 2,
      "seed": "0000000000000000000000000000000000000000000000000000000000000000"
    }
  ],
  "more": false
}

````

##### mining 

````bash

$ cleos -u http://jungle2.cryptolions.io:80 push action dicedice1234 mine '[1]' -p dicedice1234

$ cleos -u http://jungle2.cryptolions.io:80 get table dicedice1234 dicedice1234 bet2s
{
  "rows": [{
      "id": 0,
      "round": 1,
      "contract": "eosio.token",
      "bettor": "ilovedice123",
      "bet_case": "BIG",
      "bet_amount": "0.6000 EOS",
      "pay_out": "0.6000 EOS",
      "active": 1,
      "bet_at": "2018-12-23T02:13:03"
    },{
      "id": 1,
      "round": 1,
      "contract": "eosio.token",
      "bettor": "ilovedice123",
      "bet_case": "SMALL",
      "bet_amount": "0.6000 EOS",
      "pay_out": "0.0000 EOS",
      "active": 1,
      "bet_at": "2018-12-23T02:13:18"
    },{
      "id": 2,
      "round": 1,
      "contract": "eosio.token",
      "bettor": "ilovedice123",
      "bet_case": "SINGLE_1",
      "bet_amount": "0.4000 EOS",
      "pay_out": "0.0000 EOS",
      "active": 1,
      "bet_at": "2018-12-23T02:13:39"
    },{
      "id": 3,
      "round": 1,
      "contract": "eosio.token",
      "bettor": "ilovedice123",
      "bet_case": "TRIPLE_3",
      "bet_amount": "0.5000 EOS",
      "pay_out": "0.0000 EOS",
      "active": 1,
      "bet_at": "2018-12-23T02:14:15"
    }
  ],
  "more": false
}


````

##### play next round...

````bash
$ cleos -u http://jungle2.cryptolions.io:80 push action dicedice1234 startgame '[""]' -p dicedice1234

$ cleos -u http://jungle2.cryptolions.io:80 transfer "ilovedice123" "dicedice1234" "0.5000 EOS" "TRIPLE_3-ilovedice123"

$ cleos -u http://jungle2.cryptolions.io:80 transfer "ilovedice123" "dicedice1234" "0.6000 EOS" "SMALL-dicedicedice"

$ cleos -u http://jungle2.cryptolions.io:80 transfer "dicedicedice" "dicedice1234" "0.5000 EOS" "TRIPLE_3-ilovedice123"
````

##### get referral...
````bash
$ cleos -u http://jungle2.cryptolions.io:80 get table dicedice1234 "EOS" players
{
  "rows": [{
      "bettor": "dicedicedice",
      "referral": "ilovedice123",
      "bet_total": 5000,
      "last_update": "2018-12-26T15:32:46"
    },{
      "bettor": "ilovedice123",
      "referral": "dicedicedice",
      "bet_total": 11000,
      "last_update": "2018-12-26T15:28:15"
    }
  ],
  "more": false
}
````

##### search by referral...
````bash
$ cleos -u http://jungle2.cryptolions.io:80 get table dicedice1234 "EOS" players --index 2 --key-type i64 --lower "ilovedice123" --upper "ilovedice123"
{
  "rows": [{
      "bettor": "dicedicedice",
      "referral": "ilovedice123",
      "bet_total": 5000,
      "last_update": "2018-12-26T15:32:46"
    },{
      "bettor": "quoctest1234",
      "referral": "ilovedice123",
      "bet_total": 5000,
      "last_update": "2018-12-26T15:43:45"
    },{
      "bettor": "quoctest1243",
      "referral": "ilovedice123",
      "bet_total": 25000,
      "last_update": "2018-12-26T15:44:24"
    },{
      "bettor": "tamtest12345",
      "referral": "ilovedice123",
      "bet_total": 15000,
      "last_update": "2018-12-26T15:53:40"
    }
  ],
  "more": false
}


````

##### get daily reward

````bash

$ cleos -u http://jungle2.cryptolions.io:80 push action dicedice1234 dailyreward '["eosluckydice"]' -p eosluckydice
executed transaction: 132a3fcf6754d890b828b649ffe72d9f005c0ee88f89e191f19040935f6a6d7c  144 bytes  913 us

$ cleos -u http://jungle2.cryptolions.io:80 get table onetoken1234 eosluckydice accounts
{
  "rows": [{
      "balance": "3.0000 ONE"
    }
  ],
}

$ cleos -u http://jungle2.cryptolions.io:80 push action dicedice1234 dailyreward '["eosluckydice"]' -p eosluckydice

assertion failure with message: Please wait after -86396 seconds

````