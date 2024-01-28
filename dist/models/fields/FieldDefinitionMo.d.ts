import { MoDefinition } from '../managedObjects/MoDefinition.js';
import { Mo } from '../managedObjects/Mo';
import { type FieldDefinition } from './FieldDefinition';
export declare class FieldDefinitionMo<Type> extends Mo {
    fieldDef: FieldDefinition<any>;
    constructor(fieldDefinition: FieldDefinition<any>);
    hydrate(): void;
    hydrate1(): void;
}
export declare const fieldDefinitionMoDef: MoDefinition;
