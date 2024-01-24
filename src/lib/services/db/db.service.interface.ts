// Prototype
import type { Mo } from '$lib/models/generic/Mo';
import type { MoMeta } from '$lib/models/generic/MoMeta';

export interface DbServiceInterface {
  getMo: (moMeta: MoMeta, id: any) => Promise<Mo | undefined>
  addMo: (mo: Mo) => Promise<Mo>
  saveMo: (mo: Mo) => Promise<Mo>
  updateMo: (mo: Mo) => Promise<Mo>
  deleteMo: (mo: Mo) => Promise<void>
  getMos: (moMeta: MoMeta) => Promise<Mo[]>
  saveMos: (mos: Mo[]) => Promise<Mo[]>
}
