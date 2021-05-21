const fs = require('fs-extra')
import {Trade, TradeFact} from '../shared/Types';

export class FileDataProvider {

    private schemaSrc: string;
    private factsSrc: string;
    private rvSrc: string;

    constructor(schemaSrc: string, factsSrc: string, rvSrc: string) {
        console.log(`FileDataProvider Inputs: ${schemaSrc}, ${factsSrc}, ${rvSrc}\n`)
        this.schemaSrc = schemaSrc;
        this.factsSrc = factsSrc;
        this.rvSrc = rvSrc;
    }

    GetSchema(): Object | null {
        // load schema and validation facts here from source
        const schemaObj = fs.readJsonSync(this.schemaSrc, {throws: false});
        if (schemaObj === null) {
            console.log(__dirname)
            console.log("Cache: Schema load failed.")
            return null;
        }

        return schemaObj;
    }
    
    GetTradeFacts(): Array<TradeFact> | null {
        const TradeFactsObj = fs.readJsonSync(this.factsSrc, {throws: false});
        if (TradeFactsObj === null) {
            console.log("Cache: facts load failed.")
            return null;
        }

        return TradeFactsObj;
    }

    GetRunningValues(): Array<TradeFact> | null {
        const runningValsObj = fs.readJsonSync(this.rvSrc, {throws: false});
        if (runningValsObj === null) {
            console.log("Cache: facts load failed.")
            return null;
        }

        return runningValsObj;
    }
}
