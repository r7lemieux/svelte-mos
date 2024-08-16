import {DbService} from  '$lib/services/db/db.service'
import type {Mo} from '$lib/models/managedObjects/Mo.js'
import type {MoDefinition} from '$lib/models/managedObjects/MoDefinition'
import {Rezult} from  '$lib/services/common/message/rezult'
import {ErrorName} from  '$lib/services/common/message/errorName'
import type { MoDefinitionInterface } from '$lib/models/index.js';

export class HeapDbService implements DbService {
  records: {[tableName: string] : {[key:string]: Mo}} = {}

  getMo = async (moDef: MoDefinitionInterface, key: any): Promise<Mo | undefined> => {
      return this.records[moDef.dbName][key]
  }
  saveMo = async (mo: Mo) => {
    if (!mo) throw new Rezult(ErrorName.missing_param)
    this.records[mo.moMeta.moDef.dbName][mo.id] = mo
    return mo
  }

  updateMo = async (mo: Mo) => {
    if (!mo) throw new Rezult(ErrorName.missing_param)
    this.records[mo.moMeta.moDef.dbName][mo.id] = mo
    return mo
  }

  addMo = async (mo) => {
    if (!mo) throw new Rezult(ErrorName.missing_param)
    this.records[mo.moDef.dbName][mo.id] = mo
    return mo
  }

  getMos = async (moDef: MoDefinition): Promise<Mo[]> => {
    const moMap = this.records[moDef.dbName]
    if (!moMap) return []
    return Object.values(this.records[moDef.dbName])
  }

  saveMos = async (givenMos: Mo[]): Promise<Mo[]> => {
    for (const mo of givenMos) {
      this.records[mo.moMeta.moDef.dbName][mo.id] = mo
    }
    return givenMos
  }

  deleteMo = async (mo: Mo) => {
    delete this.records[mo.moMeta.moDef.dbName][mo.id]
  }
}

