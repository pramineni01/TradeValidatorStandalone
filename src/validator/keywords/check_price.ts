import Ajv from 'ajv';
import type {FuncKeywordDefinition} from 'ajv';
import { DataValidateFunction, DataValidationCxt } from 'ajv/dist/types';

import {Cache} from '../../cache/Cache';
import {PriceWithinLimit} from './utils/utils';

// check_price keyword definition
export function ChkPriceDef(): FuncKeywordDefinition {
  return {
    keyword: "check_price",
    type: "number",
    schema: false,
    schemaType: "boolean",
    validate: function v(this: Ajv | any, data: number, dataCxt: any): boolean {
      let pd = (dataCxt as DataValidationCxt).parentData;
      let property = (dataCxt as DataValidationCxt).parentDataProperty
      let res = PriceWithinLimit(this.cache as Cache, pd, property, data)
      if (typeof res === 'boolean') {
        return true
      } else {
        v.errors = res
      }

      return false;
    } as DataValidateFunction,
    errors: true,
    metaSchema: {
      "type": "boolean"
    }
  }
}