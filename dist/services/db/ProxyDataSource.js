import { DbService } from './db.service';
export class ProxyDataSource {
    next;
    target;
    constructor(next, target) {
        this.next = next;
        this.target = target;
    }
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
