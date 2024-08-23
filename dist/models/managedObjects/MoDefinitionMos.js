import { MoDefinition } from './MoDefinition';
import { MoDefinitionMo } from './MoDefinitionMo';
import { moDefMoMeta } from './MoDefinitionMo';
export const registerMoDef = (moDef) => {
    const moDefMo = new MoDefinitionMo(moDef);
    moDefMo.name = moDef.id = moDef.name;
    moDefMoMeta.dataSource?.saveMo(moDefMo);
    console.log(`==>MoDefinitionMos.ts:10 moDefMoMeta`, moDefMoMeta);
};
export const getMoDefMo = (moname) => {
    return moDefMeta.dataSource?.getMo(moname)
        .then(mo => {
        return mo;
    });
};
