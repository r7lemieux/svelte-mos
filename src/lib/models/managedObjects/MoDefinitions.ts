import {MoDefinition, moDefDef} from '$lib/models/managedObjects/MoDefinition.js'
import {FieldDefinitionMo} from '$lib/models/fields/FieldDefinitionMo'
import type {FieldDefinition} from '$lib/models/fields/FieldDefinition'

export const UiMoDefs = {}
export const getUiMoDef = moDef => {
  const uiMoDef: MoDefinition = new MoDefinition(moDef.name)
  Object.assign(uiMoDef, moDef)
  uiMoDef.fieldDefs = new Map<string, FieldDefinition<any>>()
  for (const fieldDef of (Array.from(moDef.fieldDefs.values())) as FieldDefinition<any>[]) {
    const uiFieldDef = new FieldDefinitionMo(fieldDef as FieldDefinition<any>)
    uiMoDef.fieldDefs.set(fieldDef.name, uiFieldDef as unknown as FieldDefinition<any>)
  }
  return moDef
}
export const registerMoDef = (moDef: MoDefinition) => {
  moDefDef.dataSource.saveMo(moDef)
}
export const getMoDef = (moname:string): Promise<MoDefinition> => {
  return moDefDef.dataSource.getMo(moname)
    .then( mo => {
      return mo as MoDefinition
    })
}