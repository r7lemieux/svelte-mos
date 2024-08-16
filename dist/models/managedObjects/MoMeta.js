import { Mo } from './Mo.js';
import { defaultDbService } from '../../config/config.js';
import { ErrorName } from '../../services/common/message/errorName.js';
import { Rezult } from '../../services/common/message/rezult.js';
import { CacheDataSource } from '../../services/db/Cache.dataSource.js';
import { MoDefinition } from './MoDefinition.js';
export class MoMeta {
    name;
    moDef;
    dataSource;
    constructor(moDef) {
        this.moDef = moDef;
        const cacheDataSource = new CacheDataSource(this.moDef);
        cacheDataSource.db = defaultDbService;
        this.dataSource = cacheDataSource;
        this.setName(); // todo uncomment
        this.init();
    }
    static fromMoDef = (moDef) => new MoMeta(moDef);
    /* ------------
     * Construction
     * ------------
     */
    init() {
    }
    setName = (given_name) => {
        let name = '';
        if (given_name) {
            if (!given_name.match(/[A-Za-z-1-9]/))
                throw new Rezult(ErrorName.field_invalid, {
                    method: 'MoMeta.extractFieldnamesFromMo',
                    name: given_name,
                });
            name = given_name;
        }
        else if (this.dataSource && this.dataSource.name) {
            name = this.moDef.name + '.' + this.dataSource.name;
        }
        else {
            name = this.moDef.name;
        }
        //Todo ensure name is unique
        this.name = name;
    };
    /*  ---------
     *  Accessors
     *  ---------
     */
    getDisplayName = () => this.name;
    /*  --
     *  Mo
     *  These methods delegate to MoDef by default
     *  in order to share MoDef behavior
     *  They add the dataSource management
     *  They can be overridden
     *  --
     */
    newMo = () => {
        const mo = new this.moDef.newMo();
        mo.moMeta = this;
        this.dataSource.addMo(mo);
        return mo;
    };
    objToMo = (obj) => this.moDef.objToMo(obj, this);
    moToObj = (mo) => this.moDef.moToObj(mo);
    moToDocument = mo => this.moDef.moToDocument(mo);
    toDocument = () => {
        //Todo
    };
    documentToMo = (doc) => {
        const mo = this.newMo();
        for (const [fname, fDef] of Array.from(this.moDef.fieldDefs.entries())) {
            mo[fname] = fDef.documentToValue(doc[fname]);
        }
        return mo;
    };
}
