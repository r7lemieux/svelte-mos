import { FieldDefinitionMo } from '../fields/FieldDefinitionMo';
import { MoMeta } from './MoMeta.js';
import { MoMetaMo } from './MoMetaMo.js';
import { moMetaMoMeta } from './MoMetaMo.js';
import { ErrorName, Rezult } from '../../services/index.js';
import { MoDefinitionMo } from './MoDefinitionMo';
// export const registerMoMeta = (moMeta: MoMeta) => {
//   const moMetaMo = new MoMetaMo(moMeta)
//   const moDefMo = new MoDefinitionMo(moMeta.moDef)
//   // moMetaMo.id = moMetaMo.id || nextId++
//   moMetaMo.id = moMetaMo.id || moMeta.name
//   moMetaMo.name = moMetaMo.name || moMetaMo.id
//   moMetaMo.moDef = moDefMo
//   moMetaMoMeta.dataSource?.saveMo(moMetaMo)
// }
export const getMoMetaMo = (name) => {
    return moMetaMoMeta.dataSource?.getMo(name)
        .then(mo => {
        return mo;
    });
};
export const getMoMeta = (name) => {
    return moMetaMoMeta.dataSource?.getMo(name)
        .then(mo => {
        return mo;
    });
};
