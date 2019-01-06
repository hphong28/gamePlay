import { Eos, Rpc } from 'eosjs'
import Scatter from 'scatterjs-core'
import ScatterEOS from 'scatterjs-plugin-eosjs'

const { Blockchains } = Scatter

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
    protocol: 'http',
    host: 'jungle2.cryptolions.io',
    port: 80,
    chainId: 'e70aaab8997e1dfce58fbfac80cbbb8fecec7b99cf982a9444273cbc64c41473'
}

const network = {
    chainId: 'aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906',
    blockchain: 'eos',
}

class ApiService {
    static async LoginScatter() {
        console.log('tam_ login scatter');

        Scatter.plugins(new ScatterEOS())
        const connected = await Scatter.scatter.connect(Scatter.Blockchains.EOS)

        if (!connected) {
            console.log('tam_ SCATTER NOT Connect')
            alert("Scatter NOT find")
            return
        }
        const win = window
        win.ScatterJS = win.ScatterEOS = win.scatter = undefined

        //If it connected to scatter, forget its Identify
        // if(Scatter.scatter.identity){
        //     Scatter.scatter.forgetIdentity()
        // }

        //connect to scatter
        Scatter.scatter.getIdentity({ accounts: [MAIN_NETWORK] });
    }

    static hasIdentity() {
        Scatter.scatter.connect(Scatter.Blockchains.EOS).then(connected => {
            if (connected) {
                window.ScatterJS = null;
            }
            return Scatter.scatter.identity;
        });


    }
    static LogOutScatter() {
        Scatter.scatter.forgetIdentity();
    }

    static async  GetData() {
        console.log('tam123_ get data');
        try {
            const response = await fetch('http://jungle2.cryptolions.io:80/v1/chain/get_table_rows', {
                method: 'POST',
                body: JSON.stringify({
                    scope: 'EOS',
                    code: 'dicedice1234',
                    table: 'players',
                    lower_bound: 'ilovedice123',
                    upper_bound: 'ilovedice123',
                    index_position: "2",
                    key_type: "i64",
                    reverse: "true",
                    json: "true",
                }),
            });
            const responseJson = await response.json();
            // console.log(responseJson.rows)
            return responseJson.rows;
        } catch (error) {
            console.log(error);
        }
    }

    static async  getMyBet(account,limit1) {
        try {
            const response = await fetch('http://jungle2.cryptolions.io:80/v1/chain/get_table_rows', {
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

    static async getAllBet(limit1) {
        try {
            const response = await fetch('http://jungle2.cryptolions.io:80/v1/chain/get_table_rows', {
                method: 'POST',
                body: JSON.stringify({
                    scope: 'dicedice1234',
                    code: 'dicedice1234',
                    table: 'bet2s',
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
            return responseJson.rows;
        } catch (error) {
            console.log(error);
        }
    }

    static async getRecords(limit1) {
        try {
            const response = await fetch('http://jungle2.cryptolions.io:80/v1/chain/get_table_rows', {
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
            // console.log("Phong Records",responseJson.rows)
            return responseJson.rows;
        } catch (error) {
            console.log(error);
        }
    }
}



export default ApiService;