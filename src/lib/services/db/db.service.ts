// Prototype
import type {Mo} from '$lib/models/managedObjects/Mo'
import {Rezult} from  '$lib/services/common/message/rezult'
import {ErrorName} from  '$lib/services/common/message/errorName'
import type {MoListModel} from '$lib/models/managedObjects/MoList.model'
import type {MoDefinition} from '$lib/models/managedObjects/MoDefinition.js'
import type {DataSource} from  '$lib/services/db/DataSource'
import type {DbServiceInterface} from '$lib/services/db/db.service.interface.js'

export class DbService implements DbServiceInterface{

  getMo = async(moDef: MoDefinition, id: any): Promise<Mo | undefined> =>
    Promise.reject(new Rezult(ErrorName.missing_implementation))
  addMo = async(mo: Mo): Promise<Mo> =>
    Promise.reject(new Rezult(ErrorName.missing_implementation))
  saveMo = async(mo: Mo): Promise<Mo> =>
    Promise.reject(new Rezult(ErrorName.missing_implementation))
  updateMo = async(mo: Mo): Promise<Mo> =>
    Promise.reject(new Rezult(ErrorName.missing_implementation))
  deleteMo = async(mo: Mo): Promise<void> =>
    Promise.reject(new Rezult(ErrorName.missing_implementation))

  getMos = async (moDef: MoDefinition): Promise<Mo[]> =>
    Promise.reject(new Rezult(ErrorName.missing_implementation))
  saveMos = (mos: Mo[]): Promise<Mo[]> =>
    Promise.reject(new Rezult(ErrorName.missing_implementation))
}
