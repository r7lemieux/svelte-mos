import { MoDefinition, moDefDef } from './MoDefinition.js';
import { FieldDefinitionMo } from '../fields/FieldDefinitionMo';
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
export const registerMoDef = (moDef) => {
    moDefDef.dataSource.saveMo(moDef);
};
export const getMoDef = (moname) => {
    return moDefDef.dataSource.getMo(moname)
        .then(mo => {
        return mo;
    });
};
