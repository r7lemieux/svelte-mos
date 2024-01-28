import { Mo } from './Mo';
import { FieldDefinition, from } from '../fields/FieldDefinition';
import { BaseFieldDefs, CommonFieldDefs, getFieldDef } from '../fields/CommonFieldDefinition';
import { getClosestFieldName } from '../fields/FieldMatcher';
import { toDisplayString } from '../../services/common/util/string.utils';
import { defaultDbService } from '../../config/config';
import { ErrorName } from '../../services/common/message/errorName';
import { Rezult } from '../../services/common/message/rezult';
import { CacheDataSource } from '../../services/db/Cache.dataSource';
import { HeapDataSource } from '../../services/db/Heap.dataSource';
export class MoDefinition extends Mo {
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
                method: 'MoDefinition.extractFieldnamesFromMo',
                name: name
            });
        this.name = this.dbName = this.id = name;
        this.moClass = moClass;
        if (this.name !== 'moDef')
            this.moDef = moDefDef;
        const cacheDataSource = new CacheDataSource(this);
        cacheDataSource.db = defaultDbService;
        this.dataSource = cacheDataSource;
        this.init();
    }
    /* ------------
     * Construction
     * ------------
     */
    init() { }
    static fromProps = (props) => {
        // if (!props.name || ! props.moClass) throw new Rezult(ErrorName.missing_param, {class: 'static DefMo', method: 'fromProps', props })
        const moDef = new MoDefinition(props.name, props.moClass);
        Object.assign(moDef, props);
        if (!props.fieldDefs && props.moClass) {
            moDef.initFieldDefs();
        }
        return moDef;
    };
    static MoDefFieldDefs = [
        FieldDefinition.from(CommonFieldDefs.name),
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
        const fieldnames = Object.getOwnPropertyNames(mo).filter(n => typeof mo[n] !== 'function' && n !== 'moDef');
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
// const moDefDef = new MoDefinition('MoDefinition')
export const moDefDef = new MoDefinition('moDef');
moDefDef.addFieldDef(from(BaseFieldDefs.Id).chainSetName('id'));
moDefDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('name'));
moDefDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('dbName'));
moDefDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('displayName'));
moDefDef.addFieldDef(from(BaseFieldDefs.Array).chainSetName('keyFieldnames'));
moDefDef.addFieldDef(from(BaseFieldDefs.Array).chainSetName('gridFieldnames'));
moDefDef.addFieldDef(from(BaseFieldDefs.NullableBoolean).chainSetName('hasId'));
moDefDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('idType'));
moDefDef.addFieldDef(from(BaseFieldDefs.UrlPath).chainSetName('gdriveFilePath'));
moDefDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('gdriveFileId'));
const fieldDefsFieldDef = from(BaseFieldDefs.Map).chainSetName('fieldDefs');
fieldDefsFieldDef.mapValueType = 'object';
moDefDef.addFieldDef(fieldDefsFieldDef);
const moClassFieldDef = from(BaseFieldDefs.Name).chainSetName('moClass');
moClassFieldDef.gridColDef.field = undefined;
moClassFieldDef.gridColDef.valueGetter = params => params.data.moClass.name;
moClassFieldDef.valueToString = v => v.name;
moDefDef.addFieldDef(moClassFieldDef);
Object.assign(moDefDef, {
    name: 'moDef',
    dbName: 'moDef',
    displayName: 'Mo Definition',
    keyFieldnames: ['moName'],
    gridFieldnames: ['name', 'gdriveFilePath'],
    moClass: MoDefinition,
    hasId: true,
    idType: 'string',
    // dataSource: new CacheDataSource(moDefDef),
    gdriveFilePath: 'system/resources',
    gdriveFileId: null,
    canCreate: false,
    newMo: () => {
        const moDef = new MoDefinition('');
        moDef.moDef = moDefDef;
        return moDef;
    }
});
const moDefDefDef = new MoDefinition('moDef');
moDefDef.moDef = moDefDefDef;
moDefDef.documentToMo = doc => {
    const moDef = new MoDefinition('moDef', MoDefinition);
    const obj = JSON.parse(doc.json);
    Object.assign(moDef, obj);
    return moDef;
    //return JSON.parse(doc)
};
const cacheDataSource = new HeapDataSource(this);
cacheDataSource.keyname = 'name';
moDefDef.dataSource = cacheDataSource;
