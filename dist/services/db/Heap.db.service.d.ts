import { DbService } from './db.service';
import type { Mo } from '../../models/managedObjects/Mo';
import type { MoDefinition } from '../../models/managedObjects/MoDefinition.js';
export declare class HeapDbService implements DbService {
    records: {
        [tableName: string]: {
            [key: string]: Mo;
        };
    };
    getMo: (moDef: MoDefinition, key: any) => Promise<Mo | undefined>;
    saveMo: (mo: Mo) => Promise<Mo>;
    updateMo: (mo: Mo) => Promise<Mo>;
    addMo: (mo: any) => Promise<any>;
    getMos: (moDef: MoDefinition) => Promise<Mo[]>;
    saveMos: (givenMos: Mo[]) => Promise<Mo[]>;
    deleteMo: (mo: Mo) => Promise<void>;
}
