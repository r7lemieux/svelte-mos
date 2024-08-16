import { Mo } from './Mo';
import type { MoDefinitionInterface } from './MoDefinitionInterface';
import type { MoMetaInterface } from './MoMetaInterface';
import { MoDefinition } from './MoDefinition';
export declare class MoDefinitionMo extends Mo implements MoDefinitionInterface {
    moDef: MoDefinitionInterface;
    constructor(moDef: MoDefinitionInterface);
}
export declare const moDefMoDef: MoDefinition;
export declare const moDefMoMeta: MoMetaInterface;
