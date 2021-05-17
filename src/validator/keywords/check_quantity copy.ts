import type {KeywordCxt, FuncKeywordDefinition, CodeKeywordDefinition, KeywordErrorDefinition} from "ajv";
import {getData} from "ajv/dist/compile/validate";
import { DataValidationCxt } from "ajv/dist/types";

// import {_, or, and, getProperty, Code} from "ajv/dist/compile/codegen"
const error: KeywordErrorDefinition = {
  // message: ({params: {len}}) => str`must NOT have more than ${len} items`,
  // params: ({params: {len}}) => _`{limit: ${len}}`,
  message: "Errors working"
}

export function ChkQtyDef(): FuncKeywordDefinition {
  return {
    keyword: "check_quantity",
    type: "number",
    schemaType: "object",
    validate: (schema: any, data: number, dataSch: any, dataCxt: any): boolean => {
      let pd = (dataCxt as DataValidationCxt).parentData;
      let s = schema
      let dc = dataCxt
      // let cache = this;
      return false;
    },
    error,
    metaSchema: {
      "type": "object",
      "properties": {
        "field": {"type":"string", "format": "relative-json-pointer"},
        "trade": {"type":"string", "format": "relative-json-pointer"}
      }
    }
  }
}



// export function ChkQtyDef(): CodeKeywordDefinition {
  
//   return {
//     keyword: "check_quantity",
//     type: "array",
//     schemaType: "array",
//     code(ctx: KeywordCxt) {
//       const {schema, data} = ctx
//       let x: any = getData(ctx.schema[0], ctx.it)
//       let portfolio = x.toString()
//       // const props = (schema as string[]).map((jp: string) => _`(${getData(ctx.schema[0], ctx.it)} === undefined`)
//       // ctx.fail(or(...props))
      
//         console.log(JSON.stringify(ctx))
//     //   const {schema, data} = ctx;
//     //   console.log("schema: ", JSON.stringify(schema));
//     //   console.log("data: ", data.toString());
//     },
//     metaSchema: {
//       type: "array",
//       items: {type:"string", format: "relative-json-pointer"},
//     },
//   }
// }

// import {_, or, and, getProperty, Code, CodeGen} from "ajv/dist/compile/codegen"

// export default function getDef(): CodeKeywordDefinition {
//   return {
//     keyword: "deepRequired",
//     type: "object",
//     schemaType: "array",
//     code(ctx: KeywordCxt) {
//       const {schema, data} = ctx
//       const props = (schema as string[]).map((jp: string) => _`(${getData(jp)}) === undefined`)
//       ctx.fail(or(...props))

//       function getData(jsonPointer: string): Code {
//         if (jsonPointer === "") throw new Error("empty JSON pointer not allowed")
//         const segments = jsonPointer.split("/")
//         let x: Code = data
//         const xs = segments.map((s, i) =>
//           i ? (x = _`${x}${getProperty(unescapeJPSegment(s))}`) : x
//         )
//         return and(...xs)
//       }
//     },
//     metaSchema: {
//       type: "array",
//       items: {type: "string", format: "json-pointer"},
//     },
//   }
// }

// function unescapeJPSegment(s: string): string {
//   return s.replace(/~1/g, "/").replace(/~0/g, "~")
// }





// --------

// export function ChkQtyDef(): CodeKeywordDefinition {
//   return {
//     keyword: "check_quantity",
//     type: "number",
//     $data: true,
//     // schemaType: "object",
//     code(ctx: KeywordCxt) {

//       let x =  ctx.it.parentData.toString()
//         console.log(JSON.stringify(ctx))
//     //   const {schema, data} = ctx;
//     //   console.log("schema: ", JSON.stringify(schema));
//     //   console.log("data: ", data.toString());
//     },
//     metaSchema: {
//       type: "object",
//       properties: {
//           "trade": {
//               type: "string",
//               format: "relative-json-pointer"
//             //   anyOf: [{"format": "relative-json-pointer"}, {"format": "json-pointer"}],
//           }
//       },
//       required: ["trade"]
//     },
//   }
// }

// ---------


// export function ChkQtyDef(): CodeKeywordDefinition {
//   return {
//     keyword: "check_quantity",
//     type: "object",
//     $data: true,
//     schemaType: "array",
//     code(ctx: KeywordCxt) {

//       let x =  ctx.it.parentData.toString()
//         console.log(JSON.stringify(ctx))
//     //   const {schema, data} = ctx;
//     //   console.log("schema: ", JSON.stringify(schema));
//     //   console.log("data: ", data.toString());
//     },
//     metaSchema: {
//       type: "array",
//       items: {type:"string", format: "json-pointer"},
//     },
//   }
// }



// ---------

/*
// import type {KeywordCxt} from "../../compile/validate"
import {_, str, not, Name} from "../../compile/codegen"
import {alwaysValidSchema, checkStrictMode, Type} from "../../compile/util"


const error: KeywordErrorDefinition = {
  message: ({params: {len}}) => str`must NOT have more than ${len} items`,
  params: ({params: {len}}) => _`{limit: ${len}}`,
}

const def: CodeKeywordDefinition = {
  keyword: "additionalItems" as const,
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error,
  code(cxt: KeywordCxt) {
    const {parentSchema, it} = cxt
    const {items} = parentSchema
    if (!Array.isArray(items)) {
      checkStrictMode(it, '"additionalItems" is ignored when "items" is not an array of schemas')
      return
    }
    validateAdditionalItems(cxt, items)
  },
}

export function validateAdditionalItems(cxt: KeywordCxt, items: AnySchema[]): void {
  const {gen, schema, data, keyword, it} = cxt
  it.items = true
  const len = gen.const("len", _`${data}.length`)
  if (schema === false) {
    cxt.setParams({len: items.length})
    cxt.pass(_`${len} <= ${items.length}`)
  } else if (typeof schema == "object" && !alwaysValidSchema(it, schema)) {
    const valid = gen.var("valid", _`${len} <= ${items.length}`) // TODO var
    gen.if(not(valid), () => validateItems(valid))
    cxt.ok(valid)
  }

  function validateItems(valid: Name): void {
    gen.forRange("i", items.length, len, (i) => {
      cxt.subschema({keyword, dataProp: i, dataPropType: Type.Num}, valid)
      if (!it.allErrors) gen.if(not(valid), () => gen.break())
    })
  }
}

export default def

// ---------
import {_, or, and, getProperty, Code} from "ajv/dist/compile/codegen"

export default function getDef(): CodeKeywordDefinition {
  return {
    keyword: "deepRequired",
    type: "object",
    schemaType: "array",
    code(ctx: KeywordCxt) {
      const {schema, data} = ctx
      const props = (schema as string[]).map((jp: string) => _`(${getData(jp)}) === undefined`)
      ctx.fail(or(...props))

      function getData(jsonPointer: string): Code {
        if (jsonPointer === "") throw new Error("empty JSON pointer not allowed")
        const segments = jsonPointer.split("/")
        let x: Code = data
        const xs = segments.map((s, i) =>
          i ? (x = _`${x}${getProperty(unescapeJPSegment(s))}`) : x
        )
        return and(...xs)
      }
    },
    metaSchema: {
      type: "array",
      items: {type: "string", format: "json-pointer"},
    },
  }
}

function unescapeJPSegment(s: string): string {
  return s.replace(/~1/g, "/").replace(/~0/g, "~")
}

module.exports = getDef

*/