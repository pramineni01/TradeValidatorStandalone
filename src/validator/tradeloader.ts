import * as fs from 'fs-extra';

export function LoadTrades(tradesSrc: string) {
    // load trades from source
    console.log("LoadTrades: trades source: " + tradesSrc)
    const tradesObj = fs.readJsonSync(tradesSrc);
    if (tradesObj === null) {
        console.log("Cache: Trades load failed.")
        return null;
    }

    return tradesObj;
}