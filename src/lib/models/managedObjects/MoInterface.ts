import type { MoMetaInterface } from '$lib/models/managedObjects/MoMetaInterface'

export interface MoInterface {

  moMeta: MoMetaInterface
  id?: number | string

  setProps: (props: any) => MoInterface

  toObj: () => any

  hydrate(partial: Partial<MoInterface>): void


}
