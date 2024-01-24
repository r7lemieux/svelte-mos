import { DbService } from './db.service';
import type { Mo } from '../../models/generic/Mo';
import type { MoMeta } from '../../models/generic/MoMeta';
import type { DataSource } from './DataSource';
export declare class DbDataSource implements DataSource {
    moMeta: MoMeta;
    db: DbService;
    constructor(moMeta: any, dbService: any);
    getMo: (id: any) => Promise<Mo | undefined>;
    saveMo: (mo: any) => Promise<Mo>;
    updateMo: (mo: any) => Promise<Mo>;
    addMo: (mo: any) => Promise<Mo>;
    getMos: () => Promise<Mo[]>;
    saveMos: (givenMos: Mo[]) => Promise<Mo[]>;
    deleteMo: (id: any) => Promise<void>;
}
