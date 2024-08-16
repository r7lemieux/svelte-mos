import type { MoMetaInterface } from './MoMetaInterface';
import type { DataSource } from '../../services/db/DataSource';
import type { MoDefinitionInterface } from './MoDefinitionInterface';
import { MoMeta } from './MoMeta.js';
import { MoDefinition } from './MoDefinition';
import { Mo } from './Mo';
import type { MoInterface } from './MoInterface';
export declare class MoMetaMo extends Mo implements MoMetaInterface {
    name: string;
    moDef: MoDefinitionInterface;
    dataSource: DataSource;
    constructor(moMeta: MoMetaInterface);
    newMo: () => MoInterface;
    objToMo: (obj: any) => MoInterface;
    documentToMo: (doc: any) => MoInterface;
    static fromMoDef: (moDef: MoDefinitionInterface) => MoMeta;
    getDisplayName: () => string;
}
export declare const moMetaMoDef: MoDefinition;
export declare const moMetaMoMeta: MoMeta;
