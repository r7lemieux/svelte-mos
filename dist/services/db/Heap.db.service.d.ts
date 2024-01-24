import { DbService } from './db.service';
import type { Mo } from '../../models/generic/Mo';
import type { MoMeta } from '../../models/generic/MoMeta';
export declare class HeapDbService implements DbService {
    records: {
        [tableName: string]: {
            [key: string]: Mo;
        };
    };
    getMo: (moMeta: MoMeta, key: any) => Promise<Mo | undefined>;
    saveMo: (mo: Mo) => Promise<Mo>;
    updateMo: (mo: Mo) => Promise<Mo>;
    addMo: (mo: any) => Promise<any>;
    getMos: (moMeta: MoMeta) => Promise<Mo[]>;
    saveMos: (givenMos: Mo[]) => Promise<Mo[]>;
    deleteMo: (mo: Mo) => Promise<void>;
}
