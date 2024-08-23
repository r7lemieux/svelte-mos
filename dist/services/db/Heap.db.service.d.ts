import { DbService } from './db.service';
import type { Mo } from '../../models/generic/Mo';
export declare class HeapDbService implements DbService {
    records: {
        [tableName: string]: {
            [key: string]: Mo;
        };
    };
    getMo: (moMeta: MoMeta, key: any) => Promise<Mo | undefined>;
    saveMo: (mo: Mo) => Promise<any>;
    updateMo: (mo: Mo) => Promise<any>;
    addMo: (mo: any) => Promise<any>;
    getMos: (moMeta: MoMeta) => Promise<Mo[]>;
    saveMos: (givenMos: Mo[]) => Promise<Mo[]>;
    deleteMo: (mo: Mo) => Promise<void>;
}
export declare const heapDbService: HeapDbService;
