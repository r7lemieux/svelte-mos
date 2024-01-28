import {DbService} from  '$lib/services/db/db.service'
import type {Mo} from '$lib/models/managedObjects/Mo'
import type {MoDefinition} from '$lib/models/managedObjects/MoDefinition.js'
import type {DataSource} from  '$lib/services/db/DataSource'

export class DbDataSource implements DataSource {
  moDef: MoDefinition
  db: DbService = new DbService()

  constructor(moDef, dbService) {
    this.moDef = moDef
    this.db = dbService
  }

  getMo = async (id: any): Promise<Mo | undefined> => this.db.getMo(this.moDef, id)
  saveMo = async (mo) => this.db.saveMo(mo)
  updateMo = async (mo) => this.db.updateMo(mo)
  addMo = async (mo) => this.db.addMo(mo)
  getMos = async (): Promise<Mo[]> => this.db.getMos(this.moDef)
  saveMos = async (givenMos: Mo[]): Promise<Mo[]> => this.db.saveMos(givenMos)
  deleteMo = async (id) => this.db.deleteMo(id)

}