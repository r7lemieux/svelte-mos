import { ErrorName } from '$lib/services/common/message/errorName';
import { OK, Rezult } from '$lib/services/common/message/rezult';
import { toDisplayString } from '$lib/services/common/util/string.utils';
import { copyOwnProperties } from '$lib/services/common/util/ts.utils';
// Singleton
export class FieldDefinition {
    // // moMeta = fieldDefinitionMoMeta
    // id: string | number = 0
    name = '';
    type = 'string';
    description;
    displayName;
    example;
    // columnName: string | undefined
    regex;
    regexFlag;
    minLen = 0;
    maxLen = 256;
    key; // database or column name
    inputType = 'text';
    gridColDef = {};
    canBeNull = true;
    canBeUndefined = true;
    mapValueType; // for maps
    constructor(props = {}) {
        this.init(props);
    }
    init(props) {
        for (const key of Object.keys(props)) {
            this[key] = props[key];
        }
    }
    validate() {
        if (!this.name)
            throw new Rezult(ErrorName.missing_field, { type: 'FieldDefinition', fieldname: 'name' });
    }
    static from = (fieldDef0, props = {}) => {
        const newFieldDef = new FieldDefinition();
        copyOwnProperties(fieldDef0, newFieldDef);
        copyOwnProperties(props, newFieldDef);
        return newFieldDef;
    };
    // delete
    // static from1 = (fieldDef0: FieldDefinition<any>, props: Partial<FieldDefinitionInterface<any>> = {}): FieldDefinition<any> => {
    //   if (!fieldDef0) throw new Rezult(ErrorName.missing_param, {function: 'FieldDefinition.from', param: 'fieldDef0'})
    //   const fieldDef0Props = {}
    //   Object.getOwnPropertyNames(fieldDef0).forEach(n => fieldDef0Props[n] = fieldDef0[n])
    //   const fieldDef = new FieldDefinition(fieldDef0Props)
    //   // fieldDef.bindFunctions(fieldDef0Props)
    //   // fieldDef.bindFunctions(props)
    //   Object.assign(fieldDef, props)
    //   bindFunctions(fieldDef, fieldDef0Props)
    //   bindFunctions(fieldDef, props)
    //   return fieldDef
    // }
    clone() {
        const newFieldDef = new FieldDefinition();
        copyOwnProperties(this, newFieldDef);
        return newFieldDef;
    }
    /// delete
    // clone1 = () => {
    //   const propnames = Object.getOwnPropertyNames(this).filter(pn => typeof (this[pn]) != 'function')
    //   // const propnames = Object.keys(this).filter(pn => typeof(this[pn]) != 'function')
    //   const props = propnames.reduce((ps, f) => {
    //     ps[f] = this[f]
    //     return ps
    //   }, {})
    //   const copy = new FieldDefinition(props)
    //   // bindFunctions(copy, props)
    //   const funcnames = Object.getOwnPropertyNames(this).filter(pn => typeof (this[pn]) == 'function')
    //   for (const funcname of funcnames) {
    //     copy[funcname] = this[funcname]
    //     copy[funcname].bind(copy)
    //   }
    //   copy.parse = this.parse
    //   return copy
    // }
    chainSetName(name) {
        this.name = name;
        return this;
    }
    parse(v) {
        if (v === undefined && this.canBeUndefined)
            return v;
        if (v === null && this.canBeNull)
            return null;
        switch (this.type) {
            case 'string':
                return v;
            case 'boolean':
                return v && ((['y', 'yes', 't', 'true', 'ok'].indexOf(v.toLowerCase()) !== -1) || v.match(/[\d][\d\ .]*/));
            case 'int':
                return Number.parseInt(v);
            case 'float':
                return Number.parseInt(v);
            case 'date':
                return new Date(v);
            case 'object':
                return JSON.parse(v);
            case 'array': {
                if (v && v[0] !== '[')
                    v = `[${v}]`;
                return JSON.parse(v);
            }
            case 'map': {
                const obj = JSON.parse(v);
                return new Map(Object.entries(obj));
            }
            default:
                return v;
        }
    }
    valueToString(v) {
        if (v === undefined && this.canBeUndefined)
            return v;
        if (v === null && this.canBeNull)
            return 'null';
        switch (this.type) {
            case 'map':
                return Array.from(v.entries()).toString();
            case 'boolean':
                return v ? 'Y' : 'N';
            case 'date':
            case 'object':
            case 'array':
                return JSON.stringify(v);
            case 'string':
            case 'int':
            case 'float':
            default:
                return v.toString();
        }
    }
    documentToValue(v) {
        if (v === undefined || v === 'undefined' && this.canBeUndefined)
            return v;
        if (v === null || v === 'null' && this.canBeNull)
            return null;
        switch (this.type) {
            case 'map':
                return new Map(Object.entries(v));
            case 'boolean':
            case 'string':
            case 'int':
            case 'float':
            case 'date':
            case 'object':
            case 'array':
            default:
                return v;
        }
    }
    valueToDocument(v) {
        if (v === undefined || v === 'undefined' && this.canBeUndefined)
            return v;
        if (v === null || v === 'null' && this.canBeNull)
            return null;
        switch (this.type) {
            case 'map':
                return Object.fromEntries(v.entries());
            case 'object':
            case 'boolean':
            case 'string':
            case 'int':
            case 'float':
            case 'date':
            case 'array':
            default:
                return v;
        }
    }
    getDisplayName() {
        return this.displayName || toDisplayString(this.name);
    }
    getColumnName() {
        return this.gridColDef?.headerName || this.displayName || toDisplayString(this.name);
    }
    getDescription() {
        const ex = this.example ? `. For example: ${this.example}` : '';
        return this.description || `A valid ${this.name} ${ex} `;
    }
    validateValue(val0) { return OK; }
    validateString(str) {
        if (this.minLen && str.length < this.minLen) {
            return new Rezult(ErrorName.field_invalid_tooShort, { str: str, minLen: this.minLen });
        }
        else if (this.maxLen && str.length > this.maxLen) {
            return new Rezult(ErrorName.field_invalid_tooLong, { str: str, maxLen: this.maxLen });
        }
        else if (this.regex && !this.regex.test(str)) {
            return new Rezult(ErrorName.field_invalid, { str: str, regex: this.regex });
        }
        return OK;
    }
    buildColDef() {
        const colDef = this.gridColDef || {};
        colDef.field = colDef.field || this.name;
        colDef.cellClass = colDef.cellClass || this.name;
        colDef.headerName = colDef?.headerName || this.displayName || toDisplayString(this.name);
        return colDef;
    }
}
// export const fieldDefinitionMoMeta = new MoMeta('FieldDefinition')
export const from = FieldDefinition.from;
//# sourceMappingURL=FieldDefinition.js.map