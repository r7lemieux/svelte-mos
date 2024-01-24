import {MoMeta, moMetaMeta} from  '$lib/models/generic/MoMeta'
import {contactMeta} from  '$lib/models/common/Contact'

import {FieldDefinitionMo} from  '$lib/services/common/validation/FieldDefinitionMo'
import type {FieldDefinition} from  '$lib/services/common/validation/FieldDefinition'

export const MoMetas: { [name: string]: MoMeta } = {
  meta: moMetaMeta,
  contact: contactMeta
}
export const UiMoMetas = {}
for (const moMetaName of Object.keys(MoMetas)) {
  const moMeta = MoMetas[moMetaName]
  const uiMoMeta: MoMeta = new MoMeta(moMeta.name)
  Object.assign(uiMoMeta, moMeta)
  uiMoMeta.fieldDefs = new Map<string, FieldDefinition<any>>()
  for (const fieldDef of (Array.from(moMeta.fieldDefs.values())) as FieldDefinition<any>[]) {
    const uiFieldDef = new FieldDefinitionMo(fieldDef as FieldDefinition<any>)
    uiMoMeta.fieldDefs.set(fieldDef.name, uiFieldDef as unknown as FieldDefinition<any>)
    console.log(`==>MoMetas.ts:21 uiFieldDef`, uiFieldDef['name'])
  }
  UiMoMetas[moMetaName] = uiMoMeta
}
export const saveMetas = () => moMetaMeta.dataSource.saveMos(Object.values(MoMetas))
saveMetas()
// export const saveMetas = async (): Promise<Mo[]> => {
//   const mos = Object.values(MoMetas)
//   return moMetaMeta.dataSource.saveMos(mos)
// }

