import type { Mo } from '../../models/generic/Mo';
import type { MoMeta } from '../../models/generic/MoMeta';
import type { DbServiceInterface } from './db.service.interface.js';
export declare class DbService implements DbServiceInterface {
    getMo: (moMeta: MoMeta, id: any) => Promise<Mo | undefined>;
    addMo: (mo: Mo) => Promise<Mo>;
    saveMo: (mo: Mo) => Promise<Mo>;
    updateMo: (mo: Mo) => Promise<Mo>;
    deleteMo: (mo: Mo) => Promise<void>;
    getMos: (moMeta: MoMeta) => Promise<Mo[]>;
    saveMos: (mos: Mo[]) => Promise<Mo[]>;
}
