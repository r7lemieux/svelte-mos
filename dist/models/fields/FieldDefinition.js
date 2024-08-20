import { ErrorName } from '../../services/common/message/errorName';
import { OK, Rezult } from '../../services/common/message/rezult';
import { objectReplacer, objectToString, toDisplayString } from '../../services/common/util/string.utils';
import { copyOwnProperties } from '../../services/common/util/ts.utils';
// Singleton
export class FieldDefinition {
    name = '';
    type = 'string';
    description;
    displayName;
    example;
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
    gridToString(gridFields) {
        if (!gridFields)
            return null;
        const data = gridFields.data;
        // if (f === undefined && this.canBeUndefined) return null
        console.log(`==>FieldDefinition.ts:112 data`, data);
        if (data === undefined)
            return null;
        const v = data[this.name];
        return this.valueToString(v);
    }
    valueToString(v) {
        console.log(`==>FieldDefinition.ts:114 v`, v);
        if (v === undefined && this.canBeUndefined)
            return v;
        if (v === null && this.canBeNull)
            return 'null';
        console.log(`==>FieldDefinition.ts:116 this.type`, this.type);
        switch (this.type) {
            case 'map':
                console.log(`==>FieldDefinition.ts:121 valueToString map`, v);
                return Array.from(Object.entries(v)).toString();
            case 'boolean':
                return v ? 'Y' : 'N';
            case 'date':
            case 'object':
            case 'array':
                console.log(`==>FieldDefinition.ts:128 valueToString`, objectToString(v));
                return objectToString(v);
            case 'string':
            case 'int':
            case 'float':
            default:
                console.log(`==>FieldDefinition.ts:134 valueToString string`, v);
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
        colDef.valueFormatter = this.gridToString.bind(this);
        return colDef;
    }
}
// export const fieldDefinitionMoField = new MoDefinition('FieldDefinition')
export const from = FieldDefinition.from;
