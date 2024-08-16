import { defaultMoMeta } from './moMetaInstances.js';
export class Mo {
    moMeta;
    id;
    constructor(moMeta) {
        this.moMeta = moMeta || defaultMoMeta;
    }
    getDisplayName = () => this.id;
    setProps = (props) => {
        for (const key of Object.getOwnPropertyNames(props)) {
            // if (key != 'fieldDefs') {
            this[key] = props[key];
            // }
        }
        return this;
    };
    toObj = () => {
        const data = {};
        if (this.id)
            data.id = this.id;
        for (const fname of Array.from(this.moMeta.moDef.fieldDefs.keys())) {
            //const fieldDef = this.moMeta.moDef.fieldDefs.get(fname)
            const value = this[fname];
            if (value !== undefined && value !== null) {
                data[fname] = this[fname];
            }
        }
        return data;
    };
    toDocument = () => {
        const data = {};
        if (this.id)
            data.id = this.id;
        for (const fname of Array.from(this.moMeta.moDef.fieldDefs.keys())) {
            const fieldDef = this.moMeta.moDef.fieldDefs.get(fname);
            const value = this[fname];
            if (value !== undefined && value !== null) {
                data[fname] = fieldDef?.valueToDocument(this[fname]);
            }
        }
        return data;
    };
    hydrate(partial) {
        // noinspection TypeScriptValidateTypes
        Object.assign(this, partial);
    }
}
defaultMoMeta.moDef.moClass = Mo;
