import { DbService } from './db.service';
import { Rezult } from '../common/message/rezult';
import { ErrorName } from '../common/message/errorName';
export class HeapDataSource {
    moDef;
    records = {};
    keyname = 'id';
    constructor(moDef) {
        this.moDef = moDef;
    }
    getMo = async (key) => {
        return this.records[key];
    };
    saveMo = async (mo) => {
        if (!mo)
            throw new Rezult(ErrorName.missing_param);
        this.records[mo[this.keyname]] = mo;
        return mo;
    };
    updateMo = async (mo) => {
        if (!mo)
            throw new Rezult(ErrorName.missing_param);
        this.records[mo[this.keyname]] = mo;
        return mo;
    };
    addMo = async (mo) => {
        if (!mo)
            throw new Rezult(ErrorName.missing_param);
        this.records[mo[this.keyname]] = mo;
        return mo;
    };
    getMos = async () => {
        return Object.values(this.records);
    };
    saveMos = async (givenMos) => {
        for (const mo of givenMos) {
            this.records[mo[this.keyname]] = mo;
        }
        return givenMos;
    };
    deleteMo = async (id) => {
        delete this.records[id];
    };
}
