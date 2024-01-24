import {DbService} from  '$lib/services/db/db.service'
import type {Mo} from  '$lib/models/generic/Mo'
import type {MoMeta} from  '$lib/models/generic/MoMeta'
import {Rezult} from  '$lib/services/common/message/rezult'
import {ErrorName} from  '$lib/services/common/message/errorName'
import type {DataSource} from  '$lib/services/db/DataSource'

export class CacheDataSource implements DataSource {
  moMeta: MoMeta
  records = new Map<string | number, Mo>()
  db: DbService = new DbService()

  constructor(moMeta) {
    this.moMeta = moMeta
  }

  getMo = async (id: any): Promise<Mo | undefined> => {
    if (this.records.has(id)) {
      return this.records.get(id)
    } else {
      const mo = await this.db.getMo(this.moMeta, id)
      if (mo) {
        this.records.set(id, mo)
      }
      return mo
    }
  }
  saveMo = async (mo) => {
    if (!mo) throw new Rezult(ErrorName.missing_param)
    return this.db.saveMo(mo)
      .then(mo => {
        if (mo) {
          this.records.set(mo.id!, mo)
        }
        return mo
      })
  }

  updateMo = async (mo) => {
    if (!mo) throw new Rezult(ErrorName.missing_param)
    return this.db.updateMo(mo)
      .then(mo => {
        if (mo) {
          this.records.set(mo.id!, mo)
        }
        return mo
      })
  }

  addMo = async (mo) => {
    if (!mo) throw new Rezult(ErrorName.missing_param)
    return this.db.addMo(mo)
      .then(mo => {
        if (mo) {
          this.records.set(mo.id!, mo)
        }
        return mo
      })
  }

  getMos = async (): Promise<Mo[]> => {
    const mos: Mo[] = await this.db.getMos(this.moMeta)
    if (mos) {
      for (const mo of mos) {
        this.records.set(mo.id!, mo)
      }
    }
    return mos
  }

  saveMos = async (givenMos: Mo[]): Promise<Mo[]> => {
    const savedMos: Mo[] = await this.db.saveMos(givenMos)
    for (const mo of savedMos) {
      this.records.set(mo.id!, mo)
    }
    return savedMos
  }

  deleteMo = async (id) => {
    await this.db.deleteMo(id)
    this.records.delete(id)
  }
}
