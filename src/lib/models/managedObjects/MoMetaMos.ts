import {FieldDefinitionMo} from '$lib/models/fields/FieldDefinitionMo'
import type {FieldDefinition} from '$lib/models/fields/FieldDefinition'
import { MoMeta } from './MoMeta.js'
import { MoMetaMo } from './MoMetaMo.js'
import { moMetaMoMeta } from './MoMetaMo.js'
import { ErrorName, Rezult } from '$lib/services/index.js'
import { MoDefinitionMo } from './MoDefinitionMo'


// export const registerMoMeta = (moMeta: MoMeta) => {
//   const moMetaMo = new MoMetaMo(moMeta)
//   const moDefMo = new MoDefinitionMo(moMeta.moDef)
//   // moMetaMo.id = moMetaMo.id || nextId++
//   moMetaMo.id = moMetaMo.id || moMeta.name
//   moMetaMo.name = moMetaMo.name || moMetaMo.id
//   moMetaMo.moDef = moDefMo
//   moMetaMoMeta.dataSource?.saveMo(moMetaMo)
// }
export const getMoMetaMo = (name): Promise<MoMetaMo> => {
  return moMetaMoMeta.dataSource?.getMo(name)
    .then( mo => {
      return mo as MoMetaMo
    })
}
export const getMoMeta = (name): Promise<MoMeta> => {
  return moMetaMoMeta.dataSource?.getMo(name)
    .then( mo => {
      return mo
    })
}