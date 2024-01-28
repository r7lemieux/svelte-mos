import { DbService } from './db.service';
import type { Mo } from '../../models/managedObjects/Mo';
import type { MoDefinition } from '../../models/managedObjects/MoDefinition.js';
import type { DataSource } from './DataSource';
export declare class DbDataSource implements DataSource {
    moDef: MoDefinition;
    db: DbService;
    constructor(moDef: any, dbService: any);
    getMo: (id: any) => Promise<Mo | undefined>;
    saveMo: (mo: any) => Promise<Mo>;
    updateMo: (mo: any) => Promise<Mo>;
    addMo: (mo: any) => Promise<Mo>;
    getMos: () => Promise<Mo[]>;
    saveMos: (givenMos: Mo[]) => Promise<Mo[]>;
    deleteMo: (id: any) => Promise<void>;
}
