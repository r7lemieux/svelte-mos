// Prototype
import { DbService } from  '$lib/services/db/db.service';
export class DbDataSource {
    moMeta;
    db = new DbService();
    constructor(moMeta, dbService) {
        this.moMeta = moMeta;
        this.db = dbService;
    }
    // db: DbService = new FirestoreDbService()
    getMo = async (id) => this.db.getMo(this.moMeta, id);
    saveMo = async (mo) => this.db.saveMo(mo);
    updateMo = async (mo) => this.db.updateMo(mo);
    addMo = async (mo) => this.db.addMo(mo);
    getMos = async () => this.db.getMos(this.moMeta);
    saveMos = async (givenMos) => this.db.saveMos(givenMos);
    deleteMo = async (id) => this.db.deleteMo(id);
}
//# sourceMappingURL=Db.dataSource.js.map