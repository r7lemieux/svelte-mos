import { MoDefinition } from './MoDefinition';
import { MoDefinitionMo } from './MoDefinitionMo';
import { moDefMoMeta } from './MoDefinitionMo';
// export const registerMoDef = (moDef: MoDefinition) => {
//   const moDefMo = new MoDefinitionMo(moDef)
//   moDefMo.name = moDef.id = moDef.name
//   moDefMoMeta.dataSource?.saveMo(moDefMo)
// }
export const getMoDefMo = (moname) => {
    return moDefMeta.dataSource?.getMo(moname)
        .then(mo => {
        return mo;
    });
};
