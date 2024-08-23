import { FieldDefinitionMo } from '../fields/FieldDefinitionMo';
import { MoMeta } from './MoMeta.js';
import { MoMetaMo } from './MoMetaMo.js';
import { moMetaMoMeta } from './MoMetaMo.js';
import { ErrorName, Rezult } from '../../services/index.js';
import { MoDefinitionMo } from './MoDefinitionMo';
// del
// export const UiMoMeta = {}
// export const getUiMoMeta = moMeta => {
//   const uiMoMeta: MoMeta = new MoMeta(moMeta.name || moMeta.moDef.name)
//   Object.assign(uiMoMeta.moDef, moMeta.moDef)
//   Object.assign(uiMoMeta.dataSource, moMeta.dataSource)
//   uiMoMeta.moDef.fieldDefs = new Map<string, FieldDefinition<any>>()
//   for (const fieldDef of (Array.from(moMeta.moDef.fieldDefs.values())) as FieldDefinition<any>[]) {
//     const uiFieldDef = new FieldDefinitionMo(fieldDef as FieldDefinition<any>)
//     uiMoMeta.moDef.fieldDefs.set(fieldDef.name, uiFieldDef as unknown as FieldDefinition<any>)
//   }
//   return moMeta
// }
export const registerMoMeta = (moMeta) => {
    const moMetaMo = new MoMetaMo(moMeta);
    const moDefMo = new MoDefinitionMo(moMeta.moDef);
    // moMetaMo.id = moMetaMo.id || nextId++
    moMetaMo.name = moMetaMo.id = moMeta.name;
    moMetaMo.moDef = moDefMo;
    moMetaMoMeta.dataSource?.saveMo(moMetaMo);
};
export const getMoMetaMo = (name) => {
    return moMetaMoMeta.dataSource?.getMo(name)
        .then(mo => {
        return mo;
    });
};
export const getMoMeta = (name) => {
    return moMetaMoMeta.dataSource?.getMo(name)
        .then(mo => {
        return mo.moMeta;
    });
};
