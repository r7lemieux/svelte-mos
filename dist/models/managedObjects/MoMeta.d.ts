import type { MoMetaInterface } from './MoMetaInterface.js';
import type { DataSource } from '../../services/db/DataSource.js';
import type { MoDefinitionInterface } from './MoDefinitionInterface.js';
import type { MoInterface } from './MoInterface.js';
import { MoDefinition } from './MoDefinition.js';
export declare class MoMeta implements MoMetaInterface {
    name: string;
    moDef: MoDefinitionInterface;
    dataSource: DataSource;
    constructor(moDef: MoDefinition);
    static fromMoDef: (moDef: MoDefinition) => MoMeta;
    init(): void;
    setName: (given_name?: string) => void;
    getDisplayName: () => string;
    newMo: () => MoInterface;
    objToMo: (obj: any) => MoInterface;
    moToObj: (mo: any) => any;
    moToDocument: (mo: any) => any;
    toDocument: () => void;
    documentToMo: (doc: any) => MoInterface;
}
