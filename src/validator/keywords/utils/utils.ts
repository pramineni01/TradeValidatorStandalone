/**
 *  helper functions for ajv keyword handlers
 */

import {Cache} from '../../../cache/Cache';
import {Facts, Trade, TradeIdentifier} from '../../../shared/Types';
import {ErrorObject, KeywordErrorDefinition} from 'ajv/dist/types';


/**
 * @desc: helper function for 'check_quantity' keyword handler
 * @param cache: cache for facts and running values
 * @param parentData: trade record data
 * @param property: quantity
 * @param data: quantity value
 * @returns: boolean. If valid or not
 */
export function QtyWithinLimit(cache: Cache, parentData: Trade, property: string, data: number): boolean | Array<ErrorObject> {

    let errors: Array<ErrorObject> = [];

    // build the key for query
    let ti = getTradeIdentifier(parentData);

    // query cache from facts coll
    let tf = cache.GetTradeFact(ti);
    if ((tf === undefined) || (tf?.facts === undefined)) {
        return true;
    }

    // get facts and process
    let facts = new Map(Object.entries(tf.facts));

    let max_cty = facts?.get("max_capacity");
    if (max_cty === undefined) {  // no limit defined
        return true;
    } else if (data > max_cty) {    // excess to max quantity
       errors.push( {keyword: "check_quantity", message: `trade quantity ${data} cannot exceed asset maximum capacity ${max_cty}`} as ErrorObject);
       return errors;
    }
    
    // query cache for running values coll
    let rvs = cache.GetRunningValues(ti);
    if ((rvs === undefined) || (rvs?.facts === undefined))  {
        return true
    }

    facts = new Map(Object.entries(rvs.facts));
    let consumed = facts?.get("consumed_capacity");
    if (consumed === undefined) {
        consumed = 0;
    }
    if (data > max_cty - consumed) {
        errors.push({ keyword: "check_quantity", message: `trade quantity '${data}' is exceeding beyond available capacity '${max_cty - consumed}'`} as ErrorObject)
        return errors;
    }
    return true
}

/**
 * @desc: helper function for 'check_price' keyword handler
 * @param cache: cache for facts and running values
 * @param parentData: trade record data
 * @param property: price
 * @param data: price value
 * @returns: boolean. If valid or not
 */
export function PriceWithinLimit(cache: Cache, parentData: Trade, property: string, data: number): boolean | Array<ErrorObject> {

    let errors: Array<ErrorObject> = [];

    // build the key for cache query
    let ti = getTradeIdentifier(parentData);

    // query cache from facts coll
    let tf = cache.GetTradeFact(ti);
    if ((tf === undefined) || (tf?.facts === undefined)) {
        return true;
    }

    // get facts and process
    let facts = new Map(Object.entries(tf.facts));

    // min limit check
    let min_price = facts?.get("min_price");
    if ( (min_price !== undefined) && (data < min_price) ) {
       errors.push( {keyword: "check_price", message: `trade price '${data}' cannot be below market minimum price '${min_price}'`} as ErrorObject);
    }

    // max price check
    let max_price = facts?.get("max_price");
    if ( (max_price !== undefined) && (data > max_price) ) {
       errors.push( {keyword: "check_price", message: `trade price ${data} cannot exceed market maximum price ${max_price}`} as ErrorObject);
    }

    if (errors.length != 0) {
        return errors
    }
    return true
}

// gets trade identifier which uniquely identifies trade related rules and running values in cache
function getTradeIdentifier(trade: Trade): TradeIdentifier {
    return { start_date: trade.start_date,
          end_date: trade.end_date,
          portfolio: trade.portfolio,
          asset: trade.asset,
          market: trade.market 
        } as TradeIdentifier;
}