import type { Mo } from '../../models/generic/Mo';
export interface DataSource {
    getMo: (id: any) => Promise<Mo | undefined>;
    saveMo: (mo: Mo) => Promise<Mo>;
    updateMo: (mo: Mo) => Promise<Mo>;
    addMo: (mo: Mo) => Promise<Mo>;
    getMos: () => Promise<Mo[]>;
    saveMos: (givenMos: Mo[]) => Promise<Mo[]>;
    deleteMo: (id: string | number) => Promise<void>;
}
