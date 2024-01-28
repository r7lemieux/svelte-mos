import { FieldDefinition } from '../fields/FieldDefinition';
import { Rezult } from '../../services/common/message/rezult';
import type { Mo } from './Mo';
import { MoDefinition } from './MoDefinition.js';
export declare class MoListModel {
    moDef: MoDefinition;
    mos: Mo[];
    fieldDefs?: Map<string, FieldDefinition<any>>;
    constructor(moDef: MoDefinition);
    errors: Rezult[];
    init(): void;
    getName: () => string;
    getFieldDefs: () => Map<string, FieldDefinition<any>>;
    buildFromObjs: (objs: any) => void;
    buildFieldnameToKeys: (objs: any) => {
        [key: string]: string[];
    };
    buildFieldDefs: (objs: any) => Map<string, FieldDefinition<any>>;
    extractFieldNamesFromHeaderLine: (titleStr: any) => any;
    static fromCsv: (name: string, str: string) => MoListModel;
    buildFromCsv(sheetStr: any): void;
    buildFieldDefsFromTitleLine(titleStr: any): void;
    matchFieldDefsFromTitleLine(fieldNames: string[], addFields: boolean): (FieldDefinition<any> | undefined)[];
    fillFromCsv(sheetStr: any, options?: FillFromCsvOptions): void;
    goToView: (pmo: any) => void;
}
export type FillFromCsvOptions = {
    addNewFields: boolean;
};
