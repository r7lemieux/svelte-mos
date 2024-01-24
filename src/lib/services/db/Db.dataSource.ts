import {DbService} from  '$lib/services/db/db.service'
import type {Mo} from  '$lib/models/generic/Mo'
import type {MoMeta} from  '$lib/models/generic/MoMeta'
import type {DataSource} from  '$lib/services/db/DataSource'

export class DbDataSource implements DataSource {
  moMeta: MoMeta
  db: DbService = new DbService()

  constructor(moMeta, dbService) {
    this.moMeta = moMeta
    this.db = dbService
  }

  getMo = async (id: any): Promise<Mo | undefined> => this.db.getMo(this.moMeta, id)
  saveMo = async (mo) => this.db.saveMo(mo)
  updateMo = async (mo) => this.db.updateMo(mo)
  addMo = async (mo) => this.db.addMo(mo)
  getMos = async (): Promise<Mo[]> => this.db.getMos(this.moMeta)
  saveMos = async (givenMos: Mo[]): Promise<Mo[]> => this.db.saveMos(givenMos)
  deleteMo = async (id) => this.db.deleteMo(id)

}