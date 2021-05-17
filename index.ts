
import {DataProvider} from './src/dataprovider/DataProvider';
import {NewDataProvider} from './src/dataprovider/DataProviderFactory';
import {Trade, TradeFact} from './src/shared/Types';
import {TradeValidator} from './src/validator/validator';
import {LoadTrades} from './src/validator/tradeloader';
import {Cache, NewCache} from './src/cache/Cache';
import {DataSourceCfg, LoadConfig} from './src/validator/config';

import appRoot from 'app-root-path';

process.env["NODE_CONFIG_DIR"] = appRoot + "/config";
console.log(`Currently in: ${__dirname}`)
let ds: DataSourceCfg = LoadConfig();

let provider: DataProvider = NewDataProvider(ds);
let cache: Cache = NewCache(provider)

let trades: Array<Trade> = LoadTrades(ds.InputData.TradesSrc);

let tv = new TradeValidator(cache)
tv.Validate(trades)