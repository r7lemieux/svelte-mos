import type { Mo } from '../../models/managedObjects/Mo.js';
import type { MoInterface } from '../../models/managedObjects/MoInterface';
export interface DataSource {
    name?: string;
    getMo: (id: any) => Promise<Mo | undefined>;
    saveMo: (mo: Mo) => Promise<Mo>;
    updateMo: (mo: Mo) => Promise<Mo>;
    addMo: (mo: MoInterface) => Promise<Mo>;
    getMos: () => Promise<Mo[]>;
    saveMos: (givenMos: Mo[]) => Promise<Mo[]>;
    deleteMo: (id: string | number) => Promise<void>;
}
