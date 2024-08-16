import { Mo } from './Mo';
import { from } from '../fields/FieldDefinition';
import { BaseFieldDefs } from '../fields/CommonFieldDefinition';
import { MoMeta } from './MoMeta';
import { MoDefinition } from './MoDefinition';
export class MoDefinitionMo extends Mo {
    moDef;
    constructor(moDef) {
        super(moDefMoMeta);
    }
}
export const moDefMoDef = new MoDefinition('moDefMo');
const fieldDefsFieldDef = from(BaseFieldDefs.Map).chainSetName('moDef');
fieldDefsFieldDef.mapValueType = 'object';
moDefMoDef.addFieldDef(fieldDefsFieldDef);
export const moDefMoMeta = new MoMeta(moDefMoDef);
Object.assign(moDefMoDef, {
    name: 'moDefMo',
    dbName: 'moDefMo',
    displayName: 'Mo Definition Mo',
    keyFieldnames: ['moDefMo'],
    gridFieldnames: ['moDefMo'],
    moClass: MoDefinitionMo,
    hasId: true,
    idType: 'number',
    gdriveFilePath: 'system/moDefs',
    gdriveFileId: null,
    canCreate: false,
});
moDefMoMeta.documentToMo = doc => {
    const moDefMo = new MoDefinitionMo(moDefMoDef);
    const obj = JSON.parse(doc.json);
    Object.assign(moDefMo, obj);
    return moDefMo;
};
