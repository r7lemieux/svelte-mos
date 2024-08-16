import { DbService } from './db.service';
import type { Mo } from '../../models/managedObjects/Mo.js';
import type { MoDefinition } from '../../models/managedObjects/MoDefinition';
import type { DataSource } from './DataSource';
export declare class NoDataSource implements DataSource {
    moDef: MoDefinition;
    records: Map<string | number, Mo>;
    db: DbService;
    getMo: (id: any) => Promise<Mo | undefined>;
    saveMo: (mo: any) => Promise<Mo>;
    updateMo: (mo: any) => Promise<Mo>;
    addMo: (mo: any) => Promise<Mo>;
    getMos: () => Promise<Mo[]>;
    saveMos: (givenMos: Mo[]) => Promise<Mo[]>;
    deleteMo: (id: any) => Promise<void>;
}
