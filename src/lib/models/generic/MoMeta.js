import { Mo } from  '$lib/models/generic/Mo';
import { FieldDefinition, from } from  '$lib/services/common/validation/FieldDefinition';
import { BaseFieldDefs, FieldDefs, getFieldDef } from  '$lib/services/common/validation/CommonFieldDefinition';
import { getClosestFieldName } from  '$lib/services/common/validation/FieldMatcher';
import { toDisplayString } from  '$lib/services/common/util/string.utils';
import { getDefaultDbService } from  '$lib/config/config';
import { ErrorName } from  '$lib/services/common/message/errorName';
import { Rezult } from  '$lib/services/common/message/rezult';
import { CacheDataSource } from  '$lib/services/db/Cache.dataSource';
import { HeapDataSource } from  '$lib/services/db/Heap.dataSource';
export class MoMeta extends Mo {
    name;
    dbName;
    displayName;
    keyFieldnames = [];
    fieldDefs = new Map();
    gridFieldnames;
    moClass;
    hasId = false;
    idType = 'string';
    dataSource;
    gdriveFilePath;
    gdriveFileId;
    canCreate = true;
    constructor(name, moClass) {
        super({});
        if (name && !name.match(/[A-Za-z0-9]/))
            throw new Rezult(ErrorName.field_invalid, {
                method: 'MoMeta.extractFieldnamesFromMo',
                name: name
            });
        this.name = this.dbName = this.id = name;
        this.moClass = moClass;
        if (this.name !== 'meta')
            this.moMeta = moMetaMeta;
        const cacheDataSource = new CacheDataSource(this);
        cacheDataSource.db = getDefaultDbService();
        this.dataSource = cacheDataSource;
        this.init();
    }
    /* ------------
     * Construction
     * ------------
     */
    init() { }
    static fromProps = (props) => {
        // if (!props.name || ! props.moClass) throw new Rezult(ErrorName.missing_param, {class: 'static MetaMo', method: 'fromProps', props })
        const moMeta = new MoMeta(props.name, props.moClass);
        Object.assign(moMeta, props);
        if (!props.fieldDefs && props.moClass) {
            moMeta.initFieldDefs();
        }
        return moMeta;
    };
    static MoMetaFieldDefs = [
        FieldDefinition.from(FieldDefs.name),
        FieldDefinition.from(BaseFieldDefs.Array, { name: 'keyFieldNames' }),
        FieldDefinition.from(BaseFieldDefs.Object, { name: 'fieldDefs' }),
    ];
    /*  ---------
     *  Accessors
     *  ---------
     */
    getDisplayName = () => this.displayName || toDisplayString(this.name);
    getDbName = () => this.dbName || this.name;
    getFieldNames = () => Array.from(this.fieldDefs.keys());
    getMoClass = () => this.moClass || Mo;
    /* -----------------
     * Field Definitions
     * -----------------
     */
    initFieldDefs() {
        this.deriveFieldDefsFromMo()
            .forEach(fd => this.fieldDefs.set(fd.name, fd));
    }
    addFieldDef = fieldDef => {
        this.fieldDefs.set(fieldDef.name, fieldDef);
        return fieldDef;
    };
    addFieldDefsFromNames = (fieldnames) => {
        this.deriveFieldDefsFromFieldnames(fieldnames)
            .forEach(fd => this.fieldDefs.set(fd.name, fd));
    };
    deriveFieldDefsFromMo() {
        const fieldnames = this.extractFieldnamesFromMo();
        const fieldDefs = this.deriveFieldDefsFromFieldnames(fieldnames);
        return fieldDefs;
    }
    deriveFieldDefsFromFieldnames = (fieldnames = []) => {
        return fieldnames
            .map(getClosestFieldName)
            .map(getFieldDef)
            .map((fd, i) => from(fd, { name: fieldnames[i] }));
    };
    extractFieldnamesFromMo() {
        const mo = this.newMo();
        const fieldnames = Object.getOwnPropertyNames(mo).filter(n => typeof mo[n] !== 'function' && n !== 'moMeta');
        return fieldnames;
    }
    /*  --
     *  Mo
     *  --
     */
    newMo = () => {
        const moClass = this.moClass || Mo;
        const mo = new moClass(this);
        return mo;
    };
    objToMo = (obj) => this.newMo().setProps(obj);
    moToObj = (mo) => mo.toObj();
    documentToMo = (doc) => {
        const mo = this.newMo();
        for (const [fname, fDef] of Array.from(this.fieldDefs.entries())) {
            mo[fname] = fDef.documentToValue(doc[fname]);
        }
        return mo;
    };
    moToDocument = mo => mo.toDocument();
    toDocument = () => {
        const obj = this.toObj();
        return { json: JSON.stringify(obj) };
    };
}
// const moMetaMeta = new MoMeta('MoMeta')
export const moMetaMeta = new MoMeta('meta');
moMetaMeta.addFieldDef(from(BaseFieldDefs.Id).chainSetName('id'));
moMetaMeta.addFieldDef(from(BaseFieldDefs.Name).chainSetName('name'));
moMetaMeta.addFieldDef(from(BaseFieldDefs.Name).chainSetName('dbName'));
moMetaMeta.addFieldDef(from(BaseFieldDefs.Name).chainSetName('displayName'));
moMetaMeta.addFieldDef(from(BaseFieldDefs.Array).chainSetName('keyFieldnames'));
moMetaMeta.addFieldDef(from(BaseFieldDefs.Array).chainSetName('gridFieldnames'));
moMetaMeta.addFieldDef(from(BaseFieldDefs.NullableBoolean).chainSetName('hasId'));
moMetaMeta.addFieldDef(from(BaseFieldDefs.Name).chainSetName('idType'));
moMetaMeta.addFieldDef(from(BaseFieldDefs.UrlPath).chainSetName('gdriveFilePath'));
moMetaMeta.addFieldDef(from(BaseFieldDefs.Name).chainSetName('gdriveFileId'));
const fieldDefsFieldDef = from(BaseFieldDefs.Map).chainSetName('fieldDefs');
fieldDefsFieldDef.mapValueType = 'object';
moMetaMeta.addFieldDef(fieldDefsFieldDef);
const moClassFieldDef = from(BaseFieldDefs.Name).chainSetName('moClass');
moClassFieldDef.gridColDef.field = undefined;
moClassFieldDef.gridColDef.valueGetter = params => params.data.moClass.name;
moClassFieldDef.valueToString = v => v.name;
moMetaMeta.addFieldDef(moClassFieldDef);
Object.assign(moMetaMeta, {
    name: 'meta',
    dbName: 'meta',
    displayName: 'Meta',
    keyFieldnames: ['moName'],
    gridFieldnames: ['name', 'gdriveFilePath'],
    moClass: MoMeta,
    hasId: true,
    idType: 'string',
    // dataSource: new CacheDataSource(moMetaMeta),
    gdriveFilePath: 'system/resources',
    gdriveFileId: null,
    canCreate: false,
    newMo: () => {
        const moMeta = new MoMeta('');
        moMeta.moMeta = moMetaMeta;
        return moMeta;
    }
});
const moMetaMetaMeta = new MoMeta('meta');
moMetaMeta.moMeta = moMetaMetaMeta;
moMetaMeta.documentToMo = doc => {
    const meta = new MoMeta('meta', MoMeta);
    const obj = JSON.parse(doc.json);
    Object.assign(meta, obj);
    return meta;
    //return JSON.parse(doc)
};
const cacheDataSource = new HeapDataSource(this);
cacheDataSource.keyname = 'name';
moMetaMeta.dataSource = cacheDataSource;
//# sourceMappingURL=MoMeta.js.map