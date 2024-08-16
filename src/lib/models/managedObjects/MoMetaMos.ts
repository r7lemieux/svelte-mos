import {FieldDefinitionMo} from '$lib/models/fields/FieldDefinitionMo'
import type {FieldDefinition} from '$lib/models/fields/FieldDefinition'
import { MoMeta } from './MoMeta.js'
import { MoMetaMo } from './MoMetaMo.js'
import { moMetaMoMeta } from './MoMetaMo.js'
import { ErrorName, Rezult } from '$lib/services/index.js'

export const UiMoMeta = {}
export const getUiMoMeta = moMeta => {
  const uiMoMeta: MoMeta = new MoMeta(moMeta.name || moMeta.moDef.name)
  Object.assign(uiMoMeta.moDef, moMeta.moDef)
  Object.assign(uiMoMeta.dataSource, moMeta.dataSource)
  uiMoMeta.moDef.fieldDefs = new Map<string, FieldDefinition<any>>()
  for (const fieldDef of (Array.from(moMeta.moDef.fieldDefs.values())) as FieldDefinition<any>[]) {
    const uiFieldDef = new FieldDefinitionMo(fieldDef as FieldDefinition<any>)
    uiMoMeta.moDef.fieldDefs.set(fieldDef.name, uiFieldDef as unknown as FieldDefinition<any>)
  }
  return moMeta
}

// let nextId = 0
export const registerMoMeta = (moMeta: MoMeta) => {
  const moMetaMo = new MoMetaMo(moMeta)
  // moMetaMo.id = moMetaMo.id || nextId++
  moMetaMo.name = moMetaMo.id = moMeta.name
  moMetaMoMeta.dataSource?.saveMo(moMetaMo)
}
export const getMoMetaMo = (name): Promise<MoMetaMo> => {
  return moMetaMoMeta.dataSource?.getMo(name)
    .then( mo => {
      return mo as MoMetaMo
    })
}
export const getMoMeta = (name): Promise<MoMeta> => {
  return moMetaMoMeta.dataSource?.getMo(name)
    .then( mo => {
      const moMeta = (mo as MoMetaMo).moMeta
      if (!moMeta) throw new Rezult(ErrorName.missing_field)
      return moMeta as MoMeta
    })
}