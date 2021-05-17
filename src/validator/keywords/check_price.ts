// import type {CodeKeywordDefinition, KeywordCxt} from "ajv"
// import {_, or, and, getProperty, Code} from "ajv/dist/compile/codegen"

// // export function ChkPriceDef(): CodeKeywordDefinition {
// export function ChkQtyDef(): CodeKeywordDefinition {
//   return {
//     // keyword: "check_price",
//     keyword: "check_quantity",
//     type: "object",
//     $data: true,
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
//     }
//   }
// }

// function unescapeJPSegment(s: string): string {
//   return s.replace(/~1/g, "/").replace(/~0/g, "~")
// }



/*
import type {CodeKeywordDefinition, KeywordCxt} from "ajv"
import {_, or, and, getProperty, Code} from "ajv/dist/compile/codegen"

export function ChkQtyDef(): CodeKeywordDefinition {
  return {
    keyword: "quantity",
    type: "object",
    $data: true,
    schemaType: "object",
    code(ctx: KeywordCxt) {
      const {schema, data} = ctx;
      console.log("schema: ", JSON.stringify(schema));
      console.log("data: ", data.toString());
    },
    metaSchema: {
      type: "object",
      properties: {
          "field": {
            type: "string",
            format: "relative-json-pointer"
            // anyOf: [{"format": "relative-json-pointer"}, {"format": "json-pointer"}]
          },
          "trade": {
              type: "string",
              format: "relative-json-pointer"
            //   anyOf: [{"format": "relative-json-pointer"}, {"format": "json-pointer"}],
          }
      }
    },
  }
}

*/