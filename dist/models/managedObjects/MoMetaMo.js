import { MoMeta } from './MoMeta.js';
import { moDefDef, MoDefinition } from './MoDefinition';
import { BaseFieldDefs } from '../fields/CommonFieldDefinition.js';
import { from } from '../fields/FieldDefinition.js';
import { HeapDataSource } from '../../services/db/Heap.dataSource.js';
import { Mo } from './Mo';
export class MoMetaMo extends Mo {
    name;
    moDef;
    dataSource;
    constructor(moMeta) {
        super({});
        this.moMeta = moMeta;
    }
    newMo = () => {
        const moClass = this.moDef.moClass || Mo;
        const mo = new moClass(this);
        // const mo: Mo = new moClass({moDef: this} as MoMetaInterface)
        return mo;
    };
    objToMo = (obj) => this.newMo().setProps(obj);
    documentToMo = (doc) => {
        const mo = this.newMo();
        for (const [fname, fDef] of Array.from(this.moDef.fieldDefs.entries())) {
            mo[fname] = fDef.documentToValue(doc[fname]);
        }
        return mo;
    };
    static fromMoDef = (moDef) => new MoMeta(moDef);
    /*  ---------
     *  Accessors
     *  ---------
     */
    getDisplayName = () => this.moDef.getDisplayName();
}
export const moMetaMoDef = new MoDefinition('moMetaMo');
moMetaMoDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('name'));
const moDefFieldDef = from(BaseFieldDefs.Map).chainSetName('moDef');
moDefFieldDef.mapValueType = 'object';
moMetaMoDef.addFieldDef(moDefFieldDef);
const dataSourceFieldDef = from(BaseFieldDefs.Map).chainSetName('dataSource');
dataSourceFieldDef.mapValueType = 'object';
moMetaMoDef.addFieldDef(dataSourceFieldDef);
Object.assign(moMetaMoDef, {
    name: 'moMeta',
    dbName: 'moMeta',
    moDef: moDefDef,
});
export const moMetaMoMeta = new MoMeta(moMetaMoDef);
moMetaMoDef.documentToMo = doc => {
    const moMetaMo = new MoMetaMo({});
    const obj = JSON.parse(doc.json);
    Object.assign(moMetaMo, obj);
    return moMetaMo;
};
const cacheDataSource = new HeapDataSource();
cacheDataSource.keyname = 'name';
moMetaMoMeta.dataSource = cacheDataSource;
