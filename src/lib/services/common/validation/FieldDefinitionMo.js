import { MoMeta } from '$lib/models/generic/MoMeta';
import { Mo } from '$lib/models/generic/Mo';
import { from } from '$lib/services/common/validation/FieldDefinition';
import { BaseFieldDefs } from '$lib/services/common/validation/CommonFieldDefinition';
export class FieldDefinitionMo extends Mo {
    // type = 'string'
    // name = ''
    // description?: string
    // example?: string
    // displayName: string | undefined
    // regex?: RegExp
    // regexFlag?: string
    // minLen = 0
    // maxLen = 256
    // key?: string // database or column name
    // gridColDef: ColDef = {}
    // inputType: InputTypes = 'text'
    fieldDef;
    constructor(fieldDefinition) {
        super(fieldDefinitionMoMeta);
        this.fieldDef = fieldDefinition;
        this.hydrate();
    }
    hydrate() {
        const fieldnames = Object.getOwnPropertyNames(this.fieldDef)
            .filter(fn => typeof this.fieldDef[fn] !== 'function');
        for (const fieldname of fieldnames) {
            this[fieldname] = this.fieldDef[fieldname];
        }
    }
    hydrate1() {
        const fieldnames = Object.getOwnPropertyNames(this)
            .filter(fn => fn !== 'fieldDef');
        for (const fieldname of fieldnames) {
            this[fieldname] = this.fieldDef[fieldname];
        }
    }
}
export const fieldDefinitionMoMeta = new MoMeta('FieldDefinition');
fieldDefinitionMoMeta.addFieldDef(from(BaseFieldDefs.Name).chainSetName('name'));
fieldDefinitionMoMeta.addFieldDef(from(BaseFieldDefs.Name).chainSetName('type'));
fieldDefinitionMoMeta.addFieldDef(from(BaseFieldDefs.Name).chainSetName('description'));
fieldDefinitionMoMeta.addFieldDef(from(BaseFieldDefs.Name).chainSetName('displayName'));
fieldDefinitionMoMeta.addFieldDef(from(BaseFieldDefs.Text).chainSetName('example'));
fieldDefinitionMoMeta.addFieldDef(from(BaseFieldDefs.Text).chainSetName('regex'));
fieldDefinitionMoMeta.addFieldDef(from(BaseFieldDefs.Name).chainSetName('regexFlag'));
fieldDefinitionMoMeta.addFieldDef(from(BaseFieldDefs.Integer).chainSetName('minLen'));
fieldDefinitionMoMeta.addFieldDef(from(BaseFieldDefs.Integer).chainSetName('maxLen'));
fieldDefinitionMoMeta.addFieldDef(from(BaseFieldDefs.Name).chainSetName('key'));
fieldDefinitionMoMeta.addFieldDef(from(BaseFieldDefs.Name).chainSetName('inputType'));
fieldDefinitionMoMeta.addFieldDef(from(BaseFieldDefs.Name).chainSetName('gridColDef'));
Object.assign(fieldDefinitionMoMeta, {
    name: 'meta',
    dbName: 'MoMeta',
    displayName: 'Meta',
    keyFieldnames: ['moName'],
    gridFieldnames: ['name', 'moClass', 'gdriveFilename'],
    moClass: MoMeta,
    hasId: true,
    idType: 'string',
    dataSource: null,
    gdriveFilePath: 'system/resources',
    gdriveFileId: null,
    newMo: () => {
        const moMeta = new MoMeta('');
        moMeta.moMeta = fieldDefinitionMoMeta;
        return moMeta;
    }
});
//# sourceMappingURL=FieldDefinitionMo.js.map