// Prototype
import type { Mo } from '$lib/models/managedObjects/Mo.js'
import type {MoDefinition} from '$lib/models/managedObjects/MoDefinition'
import type { MoDefinitionInterface } from '$lib/models/index.js';

export interface DbServiceInterface {
  getMo: (moDef: MoDefinitionInterface, id: any) => Promise<Mo | undefined>
  addMo: (mo: Mo) => Promise<Mo>
  saveMo: (mo: Mo) => Promise<Mo>
  updateMo: (mo: Mo) => Promise<Mo>
  deleteMo: (mo: Mo) => Promise<void>
  getMos: (moDef: MoDefinition) => Promise<Mo[]>
  saveMos: (mos: Mo[]) => Promise<Mo[]>
}
