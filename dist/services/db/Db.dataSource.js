import { DbService } from './db.service';
export class DbDataSource {
    moDef;
    db = new DbService();
    constructor(moDef, dbService) {
        this.moDef = moDef;
        this.db = dbService;
    }
    getMo = async (id) => this.db.getMo(this.moDef, id);
    saveMo = async (mo) => this.db.saveMo(mo);
    updateMo = async (mo) => this.db.updateMo(mo);
    addMo = async (mo) => this.db.addMo(mo);
    getMos = async () => this.db.getMos(this.moDef);
    saveMos = async (givenMos) => this.db.saveMos(givenMos);
    deleteMo = async (id) => this.db.deleteMo(id);
}
