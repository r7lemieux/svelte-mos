import { FieldDefinitionMo } from '../fields/FieldDefinitionMo';
import { MoMeta } from './MoMeta.js';
import { MoMetaMo } from './MoMetaMo.js';
import { moMetaMoMeta } from './MoMetaMo.js';
import { ErrorName, Rezult } from '../../services/index.js';
export const UiMoMeta = {};
export const getUiMoMeta = moMeta => {
    const uiMoMeta = new MoMeta(moMeta.name || moMeta.moDef.name);
    Object.assign(uiMoMeta.moDef, moMeta.moDef);
    Object.assign(uiMoMeta.dataSource, moMeta.dataSource);
    uiMoMeta.moDef.fieldDefs = new Map();
    for (const fieldDef of (Array.from(moMeta.moDef.fieldDefs.values()))) {
        const uiFieldDef = new FieldDefinitionMo(fieldDef);
        uiMoMeta.moDef.fieldDefs.set(fieldDef.name, uiFieldDef);
    }
    return moMeta;
};
// let nextId = 0
export const registerMoMeta = (moMeta) => {
    const moMetaMo = new MoMetaMo(moMeta);
    // moMetaMo.id = moMetaMo.id || nextId++
    moMetaMo.name = moMetaMo.id = moMeta.name;
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
        const moMeta = mo.moMeta;
        if (!moMeta)
            throw new Rezult(ErrorName.missing_field);
        return moMeta;
    });
};
