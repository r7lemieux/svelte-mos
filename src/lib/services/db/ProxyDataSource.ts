import {DbService} from  '$lib/services/db/db.service'
import type {Mo} from '$lib/models/managedObjects/Mo.js'
import type {DataSource} from  '$lib/services/db/DataSource'

export class ProxyDataSource implements DataSource {
  next: DataSource
  target: any

  constructor(next, target) {
    this.next = next
    this.target = target
  }

  getMo = async (id: any): Promise<Mo | undefined> => {
    return this.next.getMo(id)
  }
  saveMo = async (mo) => {
    return this.next.saveMo(mo)
  }

  updateMo = async (mo) => {
    return this.next.updateMo(mo)
  }

  addMo = async (mo) => {
    return this.next.addMo(mo)
  }

  getMos = async (): Promise<Mo[]> => {
    return this.next.getMos()
  }

  saveMos = async (givenMos: Mo[]): Promise<Mo[]> => {
    return this.next.saveMos(givenMos)
  }
  deleteMo = async (id) => {
    return this.next.deleteMo(id)
  }
}

