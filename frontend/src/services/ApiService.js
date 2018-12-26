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
    static async GetData() {
        console.log('tam_ get data');

        try {
            const rpc = new Rpc.JsonRpc('http://jungle2.cryptolions.io:80');

            console.log('tam_ rpc', rpc)
            const result = await rpc.get_table_rows({
                "json": true,
                "code": "dicedice1234",    // contract who owns the table
                "scope": "dicedice1234",   // scope of the table
                "table": "globals",    // name of the table as specified by the contract abi
                "limit": 10,
            });
            console.log('tam_ result', result)
            return result.rows[0];
        } catch (err) {
            console.error(err);
        }








    }




}

export default ApiService;