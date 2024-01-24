import type {MoMetaInterface} from  '$lib/models/generic/MoMetaInterface'

export interface MoInterface {

  moMeta: MoMetaInterface
  id: number | string | undefined

  setProps: (props: any) => MoInterface

  toObj: () => any

  hydrate(partial: Partial<MoInterface>): void


}
