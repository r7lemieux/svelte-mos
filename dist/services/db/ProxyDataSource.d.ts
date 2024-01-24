import type { Mo } from '../../models/generic/Mo';
import type { DataSource } from './DataSource';
export declare class ProxyDataSource implements DataSource {
    next: DataSource;
    target: any;
    constructor(next: any, target: any);
    getMo: (id: any) => Promise<Mo | undefined>;
    saveMo: (mo: any) => Promise<Mo>;
    updateMo: (mo: any) => Promise<Mo>;
    addMo: (mo: any) => Promise<Mo>;
    getMos: () => Promise<Mo[]>;
    saveMos: (givenMos: Mo[]) => Promise<Mo[]>;
    deleteMo: (id: any) => Promise<void>;
}
