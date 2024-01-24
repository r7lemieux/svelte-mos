import { MoMeta } from '../../../models/generic/MoMeta';
import { Mo } from '../../../models/generic/Mo';
import { type FieldDefinition } from './FieldDefinition';
export declare class FieldDefinitionMo<Type> extends Mo {
    fieldDef: FieldDefinition<any>;
    constructor(fieldDefinition: FieldDefinition<any>);
    hydrate(): void;
    hydrate1(): void;
}
export declare const fieldDefinitionMoMeta: MoMeta;
