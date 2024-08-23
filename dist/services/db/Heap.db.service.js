import { DbService } from './db.service';
import { Rezult } from '../common/message/rezult';
import { ErrorName } from '../common/message/errorName';
export class HeapDbService {
    records = {};
    getMo = async (moMeta, key) => {
        return this.records[moMeta.dbName][key];
    };
    saveMo = async (mo) => {
        if (!mo)
            throw new Rezult(ErrorName.missing_param);
        this.records[mo.moMeta.dbName][mo.id] = mo;
        return mo;
    };
    updateMo = async (mo) => {
        if (!mo)
            throw new Rezult(ErrorName.missing_param);
        this.records[mo.moMeta.dbName][mo.id] = mo;
        return mo;
    };
    addMo = async (mo) => {
        if (!mo)
            throw new Rezult(ErrorName.missing_param);
        this.records[mo.moMeta.dbName][mo.id] = mo;
        return mo;
    };
    getMos = async (moMeta) => {
        return Object.values(this.records[moMeta.dbName]);
    };
    saveMos = async (givenMos) => {
        for (const mo of givenMos) {
            this.records[mo.moMeta.dbName][mo.id] = mo;
        }
        return givenMos;
    };
    deleteMo = async (mo) => {
        delete this.records[mo.moMeta.dbName][mo.id];
    };
}
export const heapDbService = new HeapDbService();
// export const getHeapDbService = ():HeapDbService => {
//   if (!heapDbService) heapDbService = new HeapDbService()
//   return heapDbService
// }
