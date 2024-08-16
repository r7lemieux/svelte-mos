import type { MoInterface } from './MoInterface';
import type { DataSource } from '../../services/db/DataSource.js';
import type { MoDefinitionInterface } from '../index.js';
export interface MoMetaInterface {
    name: string;
    moDef: MoDefinitionInterface;
    dataSource?: DataSource;
    newMo?: () => MoInterface;
    objToMo: (any: any) => MoInterface;
    documentToMo?: (any: any) => MoInterface;
}
