import type { Rezult } from "../../services/common/message/rezult";
import type { ColDef } from 'ag-grid-community/dist/lib/entities/colDef';
export interface FieldDefinitionInterface<Type> {
    name: string;
    type: string;
    key?: string;
    displayName?: string;
    regex?: RegExp;
    regexFlag?: string;
    minLen?: number;
    maxLen?: number;
    parse: (string: any) => Type | null;
    valueToString: (any: any) => string;
    documentToValue: (any: any) => any;
    valueToDocument: (any: any) => any;
    validateValue?: (Type: any) => Rezult;
    validateString?: (string: any) => Rezult;
    canBeNull: boolean;
    canBeUndefined: boolean;
    gridColDef?: ColDef;
    mapValueType?: string;
}
