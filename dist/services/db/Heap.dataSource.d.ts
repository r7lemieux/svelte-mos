import type { Mo } from '../../models/managedObjects/Mo';
import type { MoDefinition } from '../../models/managedObjects/MoDefinition.js';
import type { DataSource } from './DataSource';
export declare class HeapDataSource implements DataSource {
    moDef: MoDefinition;
    records: {
        [key: string]: Mo;
    };
    keyname: string;
    constructor(moDef: any);
    getMo: (key: any) => Promise<Mo | undefined>;
    saveMo: (mo: any) => Promise<any>;
    updateMo: (mo: any) => Promise<any>;
    addMo: (mo: any) => Promise<any>;
    getMos: () => Promise<Mo[]>;
    saveMos: (givenMos: Mo[]) => Promise<Mo[]>;
    deleteMo: (id: any) => Promise<void>;
}
