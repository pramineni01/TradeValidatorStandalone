import Ajv from 'ajv';
import type {FuncKeywordDefinition, KeywordErrorDefinition} from 'ajv';
import { DataValidationCxt } from 'ajv/dist/types';

import {Cache} from '../../cache/Cache';
import {WithinLimit} from './utils/utils';


const error: KeywordErrorDefinition = {
  // message: ({params: {len}}) => str`must NOT have more than ${len} items`,
  // params: ({params: {len}}) => _`{limit: ${len}}`,
  message: "Errors working"
}

export function ChkQtyDef(): FuncKeywordDefinition {
  return {
    keyword: "check_quantity",
    type: "number",
    schemaType: "boolean",
    validate: function (this: Ajv | any, schema: any, data: number, dataSch: any, dataCxt: any): boolean {
      if (schema === false) {
        return true;
      }
      let cache: Cache = this.cache as Cache;
      let pd = (dataCxt as DataValidationCxt).parentData;
      let property = (dataCxt as DataValidationCxt).parentDataProperty
      // let cache: Cache = this.cache;
      let res = WithinLimit(this.cache as Cache, pd, property, data)
      if (typeof res === 'boolean') {
        return true
      }
      return false

    },
    error,
    metaSchema: {
      "type": "boolean"
    }
  }

}
