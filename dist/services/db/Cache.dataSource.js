import { DbService } from './db.service';
import { Rezult } from '../common/message/rezult';
import { ErrorName } from '../common/message/errorName';
export class CacheDataSource {
    moMeta;
    records = new Map();
    db = new DbService();
    constructor(moMeta) {
        this.moMeta = moMeta;
    }
    getMo = async (id) => {
        if (this.records.has(id)) {
            return this.records.get(id);
        }
        else {
            const mo = await this.db.getMo(this.moMeta, id);
            if (mo) {
                this.records.set(id, mo);
            }
            return mo;
        }
    };
    saveMo = async (mo) => {
        if (!mo)
            throw new Rezult(ErrorName.missing_param);
        return this.db.saveMo(mo)
            .then(mo => {
            if (mo) {
                this.records.set(mo.id, mo);
            }
            return mo;
        });
    };
    updateMo = async (mo) => {
        if (!mo)
            throw new Rezult(ErrorName.missing_param);
        return this.db.updateMo(mo)
            .then(mo => {
            if (mo) {
                this.records.set(mo.id, mo);
            }
            return mo;
        });
    };
    addMo = async (mo) => {
        if (!mo)
            throw new Rezult(ErrorName.missing_param);
        return this.db.addMo(mo)
            .then(mo => {
            if (mo) {
                this.records.set(mo.id, mo);
            }
            return mo;
        });
    };
    getMos = async () => {
        const mos = await this.db.getMos(this.moMeta);
        if (mos) {
            for (const mo of mos) {
                this.records.set(mo.id, mo);
            }
        }
        return mos;
    };
    saveMos = async (givenMos) => {
        const savedMos = await this.db.saveMos(givenMos);
        for (const mo of savedMos) {
            this.records.set(mo.id, mo);
        }
        return savedMos;
    };
    deleteMo = async (id) => {
        await this.db.deleteMo(id);
        this.records.delete(id);
    };
}
