import {Cache} from '../../../cache/Cache';
import {Facts, Trade, TradeIdentifier} from '../../../shared/Types';
import {KeywordErrorDefinition} from 'ajv/dist/types';


export function WithinLimit(cache: Cache, parentData: Trade, property: string, data: number): boolean | KeywordErrorDefinition {

    let err: KeywordErrorDefinition = { message: "" };

    // build the key for query
    let ti = getTradeIdentifier(parentData);

    // query cache from facts coll
    let tf = cache.GetTradeFact(ti);
    if (tf === undefined) {
        return true
    }

    let facts = new Map(Object.entries(tf.facts));
    let max_cty = facts?.get("max_capacity")
    if (max_cty === undefined) {  // no limit defined
        return true;
    } else if (data > max_cty) {    // excess to max quantity
        err.message = "trade quantity should not exceed asset maximum capacity"
        return err
    }
    
    // query cache for running values coll
    let rvs = cache.GetRunningValues(ti);
    if (rvs == undefined) {
        return true
    }

    facts = new Map(Object.entries(rvs.facts));
    let consumed = facts?.get("consumed_capacity");
    if (consumed === undefined) {
        consumed = 0;
    }
    if (data > max_cty - consumed) {
        err.message = "trade quantity exceeds beyond left over capacity"
        return err
    }
    return true
}

function getTradeIdentifier(trade: Trade): TradeIdentifier {
    return { start_date: trade.start_date,
          end_date: trade.end_date,
          portfolio: trade.portfolio,
          asset: trade.asset,
          market: trade.market 
        } as TradeIdentifier;
}