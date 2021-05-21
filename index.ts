
import {DataProvider} from './src/dataprovider/DataProvider';
import {NewDataProvider} from './src/dataprovider/DataProviderFactory';
import {Trade, TradeFact} from './src/shared/Types';
import {TradeValidator} from './src/validator/validator';
import {LoadTrades} from './src/validator/tradeloader';
import {Cache, NewCache} from './src/cache/Cache';
import {DataSourceCfg, LoadConfig} from './src/validator/config';

import appRoot from 'app-root-path';

process.env["NODE_CONFIG_DIR"] = appRoot + "/config";
console.log("Loading configurations ...")
let ds: DataSourceCfg = LoadConfig();

console.log("Creating data provider as configured ...")
let provider: DataProvider = NewDataProvider(ds);

console.log("Creating cache from data provider ...")
let cache: Cache = NewCache(provider)

console.log("Loading Trades for validation ...")
let trades: Array<Trade> = LoadTrades(ds.InputData.TradesSrc);

console.log("Finally Validate ...")
let tv = new TradeValidator(cache)
tv.Validate(trades)