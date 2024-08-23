import type { Mo } from '../../models/generic/Mo';
import type { MoMeta } from '../../models/generic/MoMeta';
import type { DataSource } from './DataSource';
export declare class HeapDataSource implements DataSource {
    moMeta: MoMeta;
    records: {
        [key: string]: Mo;
    };
    keyname: string;
    constructor(moMeta: any);
    getMo: (key: any) => Promise<Mo | undefined>;
    saveMo: (mo: any) => Promise<any>;
    updateMo: (mo: any) => Promise<any>;
    addMo: (mo: any) => Promise<any>;
    getMos: () => Promise<Mo[]>;
    saveMos: (givenMos: Mo[]) => Promise<Mo[]>;
    deleteMo: (id: any) => Promise<void>;
}
