import * as stringSimilarity from 'string-similarity'
import * as levenshtein from 'fast-levenshtein'
import type {Rezult} from  "$lib/services/common/message/rezult";
import type {CellStyle, CellStyleFunc} from 'ag-grid-community'
import type {GridOptions} from 'ag-grid-community/dist/lib/entities/gridOptions'
import type {ColDef} from 'ag-grid-community/dist/lib/entities/colDef'

// Singleton
export interface FieldDefinitionInterface<Type> {
    name: string
    type: string
    key?: string
    displayName?: string
    // columnName?: string
    regex?: RegExp
    regexFlag?: string
    minLen?: number
    maxLen?: number
    parse: (string) => Type|null
    valueToString: (any) => string
    documentToValue: (any) => any
    valueToDocument: (any) => any
    validateValue?: (Type) =>  Rezult
    validateString?: (string) => Rezult
    canBeNull: boolean
    canBeUndefined: boolean
    // cellStyle?: CellStyle | CellStyleFunc
    // minWidth?: number
    // showInGrid?: boolean
    // cellRenderer?: ((params: any) => string) | string
    // cellRendererParams?: any
    gridColDef?: ColDef
    mapValueType?: string

}