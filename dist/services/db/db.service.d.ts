import type { Mo } from '../../models/managedObjects/Mo';
import type { MoDefinition } from '../../models/managedObjects/MoDefinition.js';
import type { DbServiceInterface } from './db.service.interface.js';
export declare class DbService implements DbServiceInterface {
    getMo: (moDef: MoDefinition, id: any) => Promise<Mo | undefined>;
    addMo: (mo: Mo) => Promise<Mo>;
    saveMo: (mo: Mo) => Promise<Mo>;
    updateMo: (mo: Mo) => Promise<Mo>;
    deleteMo: (mo: Mo) => Promise<void>;
    getMos: (moDef: MoDefinition) => Promise<Mo[]>;
    saveMos: (mos: Mo[]) => Promise<Mo[]>;
}
