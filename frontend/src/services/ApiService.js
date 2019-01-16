import Eos from 'eosjs';
import ScatterEOS from 'scatterjs-plugin-eosjs'
import ScatterJS from 'scatterjs-core';

const { Blockchains } = ScatterJS

let _account = {
    name: null,
    authority: null
}
//main net
export const MAIN_NETWORK = {
    blockchain: Blockchains.EOS,
    protocol: 'https',
    host: 'nodes.get-scatter.com',
    port: 443,
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906'
}
// testnet
export const TEST_NETWORK = {
    blockchain: Blockchains.EOS,
    protocol: 'https',
    host: 'jungle2.cryptolions.io',
    port: 443,
    chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473'
}

class ApiService {
    static async LoginScatter() {

        ScatterJS.plugins(new ScatterEOS())
        const connected = await ScatterJS.scatter.connect(ScatterJS.Blockchains.EOS)

        if (!connected) return false;
        const scatter = ScatterJS.scatter;
        window.ScatterJS = null;

        //connect to scatter
        const res = await ScatterJS.scatter.getIdentity({ accounts: [TEST_NETWORK] });
        return res.accounts;
    }

    static async hasIdentity() {
        ScatterJS.plugins(new ScatterEOS())
        const connected = await ScatterJS.scatter.connect(ScatterJS.Blockchains.EOS)

        if (!connected) return false;
        const scatter = ScatterJS.scatter;
        window.ScatterJS = null;
        if (ScatterJS.scatter.identity)
            return ScatterJS.scatter.identity;

        return null;
    }
    static async LogOutScatter() {
        ScatterJS.scatter.connect(ScatterJS.Blockchains.EOS).then(connected => {
            if (connected) {
                window.ScatterJS = null;
            }
            ScatterJS.scatter.forgetIdentity();
        });
        return true;
    }
    static async  GetRefferal(account, limit) {
        // console.log('tam123_ get data');
        try {

            const response = await fetch('https://jungle2.cryptolions.io:443/v1/chain/get_table_rows', {
                method: 'POST',
                body: JSON.stringify({
                    scope: 'EOS',
                    code: 'dicedice1234',
                    table: 'players',
                    lower_bound: account,
                    upper_bound: account,
                    index_position: "2",
                    key_type: "i64",
                    reverse: "true",
                    json: "true",
                }),
            });
            const responseJson = await response.json();
            // console.log('tam_ responseJson.rows', responseJson.rows)
            return responseJson.rows;

        } catch (error) {
            console.log(error);
        }
    }

    static async GetAccountDetail(account) {
        // console.log('tam_ GetAccountDetail', account)

        try {
            const response = await fetch('https://jungle2.cryptolions.io:443/v1/chain/get_account ', {
                method: 'POST',
                body: JSON.stringify({
                    account_name: account,
                }),
            });
            const responseJson = await response.json();
            // console.log("tam_ GetAccountDetail ", responseJson)

            return responseJson;
        } catch (error) {
            console.log(error);
        }

    }


    static async  getMyBet(account, limit1) {
        try {
            const response = await fetch('https://jungle2.cryptolions.io:443/v1/chain/get_table_rows', {
                method: 'POST',
                body: JSON.stringify({
                    scope: 'dicedice1234',
                    code: 'dicedice1234',
                    table: 'bet2s',
                    lower_bound: account,
                    upper_bound: account,
                    index_position: "3",
                    key_type: "i64",
                    reverse: "true",
                    json: "true",
                    limit: limit1
                }),
            });
            const responseJson = await response.json();
            return responseJson.rows;
        } catch (error) {
            console.log(error);
        }
    }

    static async getAllBet(limit1, lower_bound1, upper_bound1) {
        try {
            const response = await fetch('https://jungle2.cryptolions.io:443/v1/chain/get_table_rows', {
                method: 'POST',
                body: JSON.stringify({
                    scope: 'dicedice1234',
                    code: 'dicedice1234',
                    table: 'bet2s',
                    lower_bound: lower_bound1,
                    upper_bound: upper_bound1,
                    index_position: "1",
                    key_type: "i64",
                    reverse: "true",
                    json: "true",
                    limit: limit1
                }),
            });
            const responseJson = await response.json();
            // console.log("Phong AllBet ", responseJson.rows)
            return responseJson.rows;
        } catch (error) {
            console.log(error);
        }
    }

    static async getRecords(limit1) {
        try {
            const response = await fetch('https://jungle2.cryptolions.io:443/v1/chain/get_table_rows', {
                method: 'POST',
                body: JSON.stringify({
                    scope: 'dicedice1234',
                    code: 'dicedice1234',
                    table: 'game1s',
                    // lower_bound: account,
                    // upper_bound: account,
                    // index_position: "1",
                    key_type: "i64",
                    reverse: "true",
                    json: "true",
                    limit: limit1
                }),
            });
            const responseJson = await response.json();
            // console.log("Phong Records",responseJson.rows);
            return responseJson.rows;
        } catch (error) {
            console.log(error);
        }
    }

    static async getGlobal(limit1) {
        try {
            const response = await fetch('https://jungle2.cryptolions.io:443/v1/chain/get_table_rows', {
                method: 'POST',
                body: JSON.stringify({
                    scope: 'dicedice1234',
                    code: 'dicedice1234',
                    table: 'globals',
                    // lower_bound: account,
                    // upper_bound: account,
                    // index_position: "1",
                    key_type: "i64",
                    reverse: "true",
                    json: "true",
                    limit: limit1
                }),
            });
            const responseJson = await response.json();
            // console.log("Phong Global",responseJson.rows);
            return responseJson.rows;
        } catch (error) {
            console.log(error);
        }
    }

    static async startBet(betAccount, betCase, betVal, betReffer) {

        ScatterJS.plugins(new ScatterEOS())
        const connected = await ScatterJS.scatter.connect(ScatterJS.Blockchains.EOS)

        if (!connected) return false;
        const scatter = ScatterJS.scatter;
        window.ScatterJS = null;

        //connect to scatter
        const res = await ScatterJS.scatter.getIdentity({ accounts: [TEST_NETWORK] });

        const eosOptions = {
            broadcast: true,
            sign: true,
            expireInSeconds: 60,
        };

        console.log("quoc12345", res)
        const account = res.accounts[0];

        const transactionOptions = { authorization: [`${account.name}@${account.authority}`] };
        const eos = ScatterJS.scatter.eos(TEST_NETWORK, Eos, eosOptions);
        // const eos = scatter.eos(TEST_NETWORK, Eos, eosOptions);
        eos.transfer(betAccount, 'dicedice1234', `${Number(betVal).toFixed(4).toString()} EOS`, betCase + betReffer + "", transactionOptions).then(trx => {
            // That's it!
            console.log(`Transaction ID: ${trx.transaction_id}`);

        });
    }

    static async  GetDailyReward(AccountGetDailyGift) {
        // console.log('tam123_ get GetDailyReward', AccountGetDailyGift);
        try {

            ScatterJS.plugins(new ScatterEOS())
            const connected = await ScatterJS.scatter.connect(ScatterJS.Blockchains.EOS)

            if (!connected) return false;
            const scatter = ScatterJS.scatter;
            window.ScatterJS = null;

            //connect to scatter
            const res = await ScatterJS.scatter.getIdentity({ accounts: [TEST_NETWORK] });

            const eosOptions = {
                broadcast: true,
                sign: true,
                expireInSeconds: 60,
            };

            // console.log("tam123_", res)
            const account = res.accounts[0];

            const transactionOptions = { authorization: [`${account.name}@${account.authority}`] };
            const eos = ScatterJS.scatter.eos(TEST_NETWORK, Eos, eosOptions);
            // console.log("tam1234_", eos, transactionOptions);

            const transaction = {
                // ...headers,
                // context_free_actions: [],
                actions: [
                    {
                        // account: AccountGetDailyGift,
                        account: "dicedice1234",
                        name: 'dailyreward',
                        authorization: [{
                            actor: account.name,
                            permission: account.authority
                        }],
                        data: {
                            ref: AccountGetDailyGift,
                        }
                    }
                ]

            }
            const result = await eos.transaction(transaction)
            // console.log(":tam_ Transaction ID:", result);

        } catch (e) {
            console.log('\nCaught exception: ' + e);

        }
    }

    static async GetTokenInfo(account, symbol, code) {
        // console.log('GetTokenInfo;', account, symbol, code);
        try {
            const response = await fetch('https://jungle2.cryptolions.io:443/v1/chain/get_currency_balance ', {
                method: 'POST',
                body: JSON.stringify({
                    code: code,
                    account: account,
                    symbol: symbol,
                }),
            });
            const TokenValue = await response.json();
            // console.log("tam_ GetTokenInfo responseJson",TokenValue);
            return TokenValue;
        } catch (error) {
            console.log(error);
        }
    }


}
export default ApiService;