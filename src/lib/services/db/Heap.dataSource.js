import { DbService } from '$lib/services/db/db.service';
import { Rezult } from '$lib/services/common/message/rezult';
import { ErrorName } from '$lib/services/common/message/errorName';
export class HeapDataSource {
    moMeta;
    records = {};
    keyname = 'id';
    constructor(moMeta) {
        this.moMeta = moMeta;
    }
    // db: DbService = new FirestoreDbService()
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
//# sourceMappingURL=Heap.dataSource.js.map