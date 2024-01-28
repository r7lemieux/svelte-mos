import { MoDefinition } from '../managedObjects/MoDefinition.js';
import { Mo } from '../managedObjects/Mo';
import { from } from './FieldDefinition';
import { BaseFieldDefs } from './CommonFieldDefinition';
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
        super(fieldDefinitionMoDef);
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
export const fieldDefinitionMoDef = new MoDefinition('FieldDefinition');
fieldDefinitionMoDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('name'));
fieldDefinitionMoDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('type'));
fieldDefinitionMoDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('description'));
fieldDefinitionMoDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('displayName'));
fieldDefinitionMoDef.addFieldDef(from(BaseFieldDefs.Text).chainSetName('example'));
fieldDefinitionMoDef.addFieldDef(from(BaseFieldDefs.Text).chainSetName('regex'));
fieldDefinitionMoDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('regexFlag'));
fieldDefinitionMoDef.addFieldDef(from(BaseFieldDefs.Integer).chainSetName('minLen'));
fieldDefinitionMoDef.addFieldDef(from(BaseFieldDefs.Integer).chainSetName('maxLen'));
fieldDefinitionMoDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('key'));
fieldDefinitionMoDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('inputType'));
fieldDefinitionMoDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('gridColDef'));
Object.assign(fieldDefinitionMoDef, {
    name: 'meta',
    dbName: 'MoDefinition',
    displayName: 'Meta',
    keyFieldnames: ['moName'],
    gridFieldnames: ['name', 'moClass', 'gdriveFilename'],
    moClass: MoDefinition,
    hasId: true,
    idType: 'string',
    dataSource: null,
    gdriveFilePath: 'system/resources',
    gdriveFileId: null,
    newMo: () => {
        const moDef = new MoDefinition('');
        moDef.moDef = fieldDefinitionMoDef;
        return moDef;
    }
});
