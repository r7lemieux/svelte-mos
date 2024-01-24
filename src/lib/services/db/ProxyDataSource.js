import { DbService } from '$lib/services/db/db.service';
import { Rezult } from '$lib/services/common/message/rezult';
import { ErrorName } from '$lib/services/common/message/errorName';
export class ProxyDataSource {
    next;
    target;
    constructor(next, target) {
        this.next = next;
        this.target = target;
    }
    // db: DbService = new FirestoreDbService()
    getMo = async (id) => {
        return this.next.getMo(id);
    };
    saveMo = async (mo) => {
        return this.next.saveMo(mo);
    };
    updateMo = async (mo) => {
        return this.next.updateMo(mo);
    };
    addMo = async (mo) => {
        return this.next.addMo(mo);
    };
    getMos = async () => {
        return this.next.getMos();
    };
    saveMos = async (givenMos) => {
        return this.next.saveMos(givenMos);
    };
    deleteMo = async (id) => {
        return this.next.deleteMo(id);
    };
}
//# sourceMappingURL=ProxyDataSource.js.map