import type { Mo } from '../../models/managedObjects/Mo.js';
import type { DataSource } from './DataSource';
export declare class HeapDataSource implements DataSource {
    records: {
        [key: string]: Mo;
    };
    keyname: string;
    getMo: (key: any) => Promise<Mo | undefined>;
    saveMo: (mo: any) => Promise<any>;
    updateMo: (mo: any) => Promise<any>;
    addMo: (mo: any) => Promise<any>;
    getMos: () => Promise<Mo[]>;
    saveMos: (givenMos: Mo[]) => Promise<Mo[]>;
    deleteMo: (id: any) => Promise<void>;
}
