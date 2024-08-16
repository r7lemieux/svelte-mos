import { MoDefinition, moDefDef } from './MoDefinition';
import { FieldDefinitionMo } from '../fields/FieldDefinitionMo.js';
export const UiMoDefs = {};
export const getUiMoDef = moDef => {
    const uiMoDef = new MoDefinition(moDef.name);
    Object.assign(uiMoDef, moDef);
    uiMoDef.fieldDefs = new Map();
    for (const fieldDef of (Array.from(moDef.fieldDefs.values()))) {
        const uiFieldDef = new FieldDefinitionMo(fieldDef);
        uiMoDef.fieldDefs.set(fieldDef.name, uiFieldDef);
    }
    return moDef;
};
// export const registerMoDef = (moDef: MoDefinition) => {
//   moDefMeta.dataSource?.saveMo(moDef)
// }
// export const getMoDef = (moname:string): Promise<MoDefinition> => {
//   return moDefMeta.dataSource?.getMo(moname)
//     .then( mo => {
//       return mo as MoDefinition
//     })
// }
