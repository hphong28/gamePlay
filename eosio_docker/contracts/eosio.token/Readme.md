DICE GAME
-----------------

Example game session using cleos
-------
#### Prerequisites


* Please use following accounts to play bet

ilovebet123 -  5JXZVqbaH9eNAHH8cNErrgL4dQJcduXQkmfrmaGe55YfCXL212G
eosluckydice - 5JXZVqbaH9eNAHH8cNErrgL4dQJcduXQkmfrmaGe55YfCXL212G
onetoken1234

* Endpoint network:

http://jungle2.cryptolions.io:80

* Contract name: onetoken1234


##### Set dice contract to onetoken1234 account
````bash
$ cleos -u http://jungle2.cryptolions.io:80 set contract onetoken1234 ./eosio.token/ -p onetoken1234
````

##### Check contract ram
````bash
cleos -u http://jungle2.cryptolions.io:80 get account onetoken1234
...
memory: 
    quota:     1.605 MiB    used:     189.3 KiB 
````

##### crea tokens

````bash
$ cleos -u http://jungle2.cryptolions.io:80 push action onetoken1234 create '[onetoken1234, "10000000000.0000 ONE"]' -p onetoken1234

$ cleos -u http://jungle2.cryptolions.io:80 get table onetoken1234 ONE stat
{
  "rows": [{
      "supply": "0.0000 ONE",
      "max_supply": "10000000000.0000 ONE",
      "issuer": "onetoken1234"
    }
  ],
  "more": false
}

````


##### issue token 
````bash


$ cleos -u http://jungle2.cryptolions.io:80 push action onetoken1234 issue '[onetoken1234, "1000000000.0000 ONE", "issue to owner"]' -p onetoken1234

$ cleos -u http://jungle2.cryptolions.io:80 get table onetoken1234 onetoken1234 accounts
{
  "rows": [{
      "balance": "1000000000.0000 ONE"
    }
  ],
  "more": false
}
````

##### tranfer to bet contract
````bash
$ cleos -u http://jungle2.cryptolions.io:80 get table onetoken1234 dicedice1234 accounts
{
  "rows": [{
      "balance": "123456789.0000 ONE"
    }
  ],
  "more": false
}


````

