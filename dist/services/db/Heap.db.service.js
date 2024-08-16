import { DbService } from './db.service';
import { Rezult } from '../common/message/rezult';
import { ErrorName } from '../common/message/errorName';
export class HeapDbService {
    records = {};
    getMo = async (moDef, key) => {
        return this.records[moDef.dbName][key];
    };
    saveMo = async (mo) => {
        if (!mo)
            throw new Rezult(ErrorName.missing_param);
        this.records[mo.moMeta.moDef.dbName][mo.id] = mo;
        return mo;
    };
    updateMo = async (mo) => {
        if (!mo)
            throw new Rezult(ErrorName.missing_param);
        this.records[mo.moMeta.moDef.dbName][mo.id] = mo;
        return mo;
    };
    addMo = async (mo) => {
        if (!mo)
            throw new Rezult(ErrorName.missing_param);
        this.records[mo.moDef.dbName][mo.id] = mo;
        return mo;
    };
    getMos = async (moDef) => {
        const moMap = this.records[moDef.dbName];
        if (!moMap)
            return [];
        return Object.values(this.records[moDef.dbName]);
    };
    saveMos = async (givenMos) => {
        for (const mo of givenMos) {
            this.records[mo.moMeta.moDef.dbName][mo.id] = mo;
        }
        return givenMos;
    };
    deleteMo = async (mo) => {
        delete this.records[mo.moMeta.moDef.dbName][mo.id];
    };
}
