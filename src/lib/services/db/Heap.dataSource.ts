import {DbService} from  '$lib/services/db/db.service'
import type {Mo} from  '$lib/models/generic/Mo'
import type {MoMeta} from  '$lib/models/generic/MoMeta'
import {Rezult} from  '$lib/services/common/message/rezult'
import {ErrorName} from  '$lib/services/common/message/errorName'
import type {DataSource} from  '$lib/services/db/DataSource'

export class HeapDataSource implements DataSource {
  moMeta: MoMeta
  records: {[key:string]: Mo} = {}
  keyname = 'id'

  constructor(moMeta) {
    this.moMeta = moMeta
  }

  getMo = async (key: any): Promise<Mo | undefined> => {
      return this.records[key]
  }
  saveMo = async (mo) => {
    if (!mo) throw new Rezult(ErrorName.missing_param)
    this.records[mo[this.keyname!]] = mo
    return mo
  }

  updateMo = async (mo) => {
    if (!mo) throw new Rezult(ErrorName.missing_param)
    this.records[mo[this.keyname!]] = mo
    return mo
  }

  addMo = async (mo) => {
    if (!mo) throw new Rezult(ErrorName.missing_param)
    this.records[mo[this.keyname!]] = mo
    return mo
  }

  getMos = async (): Promise<Mo[]> => {
    return Object.values(this.records)
  }

  saveMos = async (givenMos: Mo[]): Promise<Mo[]> => {
    for (const mo of givenMos) {
      this.records[mo[this.keyname!]] = mo
    }
    return givenMos
  }

  deleteMo = async (id) => {
    delete this.records[id]
  }
}

