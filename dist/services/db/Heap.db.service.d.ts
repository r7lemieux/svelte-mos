import { DbService } from './db.service';
import type { Mo } from '../../models/managedObjects/Mo.js';
import type { MoDefinition } from '../../models/managedObjects/MoDefinition';
import type { MoDefinitionInterface } from '../../models/index.js';
export declare class HeapDbService implements DbService {
    records: {
        [tableName: string]: {
            [key: string]: Mo;
        };
    };
    getMo: (moDef: MoDefinitionInterface, key: any) => Promise<Mo | undefined>;
    saveMo: (mo: Mo) => Promise<Mo>;
    updateMo: (mo: Mo) => Promise<Mo>;
    addMo: (mo: any) => Promise<any>;
    getMos: (moDef: MoDefinition) => Promise<Mo[]>;
    saveMos: (givenMos: Mo[]) => Promise<Mo[]>;
    deleteMo: (mo: Mo) => Promise<void>;
}
