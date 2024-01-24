import type { FieldDefinitionInterface } from './FieldDefinition.interface';
import { Rezult } from '../message/rezult';
import type { ColDef } from 'ag-grid-community';
import type { InputTypes } from '../util/dom.utils';
export declare class FieldDefinition<Type> implements FieldDefinitionInterface<Type> {
    name: string;
    type: string;
    description?: string;
    displayName: string | undefined;
    example?: string;
    regex?: RegExp;
    regexFlag?: string;
    minLen: number;
    maxLen: number;
    key?: string;
    inputType: InputTypes;
    gridColDef: ColDef;
    canBeNull: boolean;
    canBeUndefined: boolean;
    mapValueType?: string;
    constructor(props?: Partial<FieldDefinition<any>>);
    init(props: any): void;
    validate(): void;
    static from: (fieldDef0: FieldDefinition<any>, props?: Partial<FieldDefinitionInterface<any>>) => FieldDefinition<any>;
    clone(): FieldDefinition<unknown>;
    chainSetName(name: any): this;
    parse(v: any): any | null;
    valueToString(v: any): any;
    documentToValue(v: any): any;
    valueToDocument(v: any): any;
    getDisplayName(): string;
    getColumnName(): string;
    getDescription(): string;
    validateValue(val0: any): Rezult;
    validateString(str: any): Rezult;
    buildColDef(): ColDef<any, any>;
}
export declare const from: (fieldDef0: FieldDefinition<any>, props?: Partial<FieldDefinitionInterface<any>>) => FieldDefinition<any>;
