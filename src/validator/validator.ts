import Ajv, {JSONSchemaType} from "ajv";
import addFormats from "ajv-formats";

import {Cache} from '../cache/Cache';
import {Facts, Trade, TradeFact} from '../shared/Types';

import {ChkQtyDef} from './keywords/check_quantity';


// import {ChkPriceDef} from './keywords/check_price';

// TBD: Define return type struct to return ajv errors and boolean

export class TradeValidator {
    // properties here
    private cache: Cache;

    // constructor
    constructor(cache: Cache) {
        this.cache = cache;
    }

    // methods
    public Validate(trades: ReadonlyArray<Trade>) {

        let schema: JSONSchemaType<Array<TradeFact>> | null = this.cache.GetSchema();
        if (schema === null) {
            console.log('TradeValidator: validation schema missing');
            return false;
        }

        // create ajv
        let ajv: Ajv = new Ajv({passContext: true, $data: true, allErrors: false, coerceTypes: true,
            // strict: true, useDefaults: false, messages: true, verbose: true
        });
        // let ajv1 = defineKeywords(ajv, ["transform", "range"]);

        ajv = addFormats(ajv, ["date-time", "relative-json-pointer"])

        // add keywords
        this.AddKeywords(ajv);

        // validate
        let validate = ajv.compile(schema);
        if (validate.call({cache: this.cache}, trades)) {
            // data is MyData here
            console.log("Trades validated successfully");
          } else {
              console.log("Validation errors: " + ajv.errorsText(validate.errors));
              return validate.errors
          } 
    }

    protected AddKeywords(ajv:Ajv) {
        ajv.addVocabulary([ChkQtyDef()]);
        // ajv.addKeyword(ChkPriceDef());
    }

    // protected AddKeywords(ajv: Ajv) {
    //     function checkTradeQuantity(this: {cache: Cache}, data: any): boolean {
    
    //         let tk = data.$data;
    //         let cache: Cache = this.cache;
    //         console.log("checkTradeQuantity: Evaluating field ${field} for trade: ${trade}", data.field, data.trade);
        
    //         let key = { portfolio: tk.portfolio, asset: tk.asset, market: tk.market }
    //         let factsForAsset: Facts | null = cache.GetRunningValues(key);

    //         if (factsForAsset !== null) {
    //             // rule 1 - min quantity per market
    //             let min_quantity = factsForAsset.get("min_quantity");
    //             if ((min_quantity !== undefined) && (tk.quantity < min_quantity)) {
    //                 return false;
    //             }
    //             // rule 2 - capacity cannot exceed asset max capacity
    //             let max_capacity = factsForAsset.get("max_capacity");
    //             if ((max_capacity !== undefined) && (data.trade.quantity > max_capacity)) {
    //                 return false;
    //             }
    //         }
        
    //         return true;
    //     }
    //     ajv.addKeyword({
    //         keyword: "check_quantity",
    //         type: "number",
    //         validate: checkTradeQuantity,
    //     });
        
    //     ajv.addKeyword({
    //         keyword: "check_price",
    //         type: "number",
    //         validate: checkTradeQuantity,
    //     });
    // }   
};