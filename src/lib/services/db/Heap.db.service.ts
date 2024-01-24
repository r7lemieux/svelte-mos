import {DbService} from  '$lib/services/db/db.service'
import type {Mo} from  '$lib/models/generic/Mo'
import type {MoMeta} from  '$lib/models/generic/MoMeta'
import {Rezult} from  '$lib/services/common/message/rezult'
import {ErrorName} from  '$lib/services/common/message/errorName'

export class HeapDbService implements DbService {
  records: {[tableName: string] : {[key:string]: Mo}} = {}

  getMo = async (moMeta: MoMeta, key: any): Promise<Mo | undefined> => {
      return this.records[moMeta.dbName][key]
  }
  saveMo = async (mo: Mo) => {
    if (!mo) throw new Rezult(ErrorName.missing_param)
    this.records[mo.moMeta.dbName][mo.id] = mo
    return mo
  }

  updateMo = async (mo: Mo) => {
    if (!mo) throw new Rezult(ErrorName.missing_param)
    this.records[mo.moMeta.dbName][mo.id] = mo
    return mo
  }

  addMo = async (mo) => {
    if (!mo) throw new Rezult(ErrorName.missing_param)
    this.records[mo.moMeta.dbName][mo.id] = mo
    return mo
  }

  getMos = async (moMeta: MoMeta): Promise<Mo[]> => {
    return Object.values(this.records[moMeta.dbName])
  }

  saveMos = async (givenMos: Mo[]): Promise<Mo[]> => {
    for (const mo of givenMos) {
      this.records[mo.moMeta.dbName][mo.id] = mo
    }
    return givenMos
  }

  deleteMo = async (mo: Mo) => {
    delete this.records[mo.moMeta.dbName][mo.id]
  }
}

