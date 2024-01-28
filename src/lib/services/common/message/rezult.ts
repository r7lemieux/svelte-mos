import {ErrorName} from './errorName'
import { jsonToDisplayString } from '$lib/services/common/util/string.utils'

export type RezultStatus = 'message' | 'error'

export class Rezult extends Error {

  status: RezultStatus = 'error'
  data: any
  context: string | undefined
  static mode: 'test' | 'app' = 'test'


  constructor( errorName:ErrorName = ErrorName.ok, data?:any, context?:string) {
    super()
    this.setName(errorName)
    this.data = data
    this.context = context
    if (errorName != ErrorName.ok)
    console.trace(`==>rezult.ts:19 `, this.toString())
  }

  setName = (errorName: ErrorName) => {
    this.name = ErrorName[errorName]
  }

  toString = () => {
    let data = this.data
    try {
      data = JSON.stringify(this.data)}
    catch (err) {
      try {
        data = this.stringifyOneLevel(this.data)
      }
      catch(err) {
        try {
          data = this.data.toString()
        } catch (err) {
          data = this.data
        }
      }
    }

    return `${this.status} ${this.context || ''} ${this.name} ${this.message} ${data?JSON.stringify(data):''}`
  }

  toDetailString = () => jsonToDisplayString({
    status: this.status, data: this.data, context: this.context
  })

  stringifyOneLevel = obj => JSON.stringify(obj, function (k, v) { return k && v && typeof v !== "number" ? (Array.isArray(v) ? "[object Array]" : "" + v) : v; });

  print = (str: string) => {
    this.context = str
    if (!process.env.testing) {
      console.log(this.toString())
    }
  }
}

export const OK = new Rezult(ErrorName.ok)
