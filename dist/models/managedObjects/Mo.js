export class Mo {
    moDef;
    id;
    constructor(moDef) {
        this.moDef = moDef;
    }
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
        for (const fname of Array.from(this.moDef.fieldDefs.keys())) {
            const fieldDef = this.moDef.fieldDefs.get(fname);
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
        for (const fname of Array.from(this.moDef.fieldDefs.keys())) {
            const fieldDef = this.moDef.fieldDefs.get(fname);
            const value = this[fname];
            if (value !== undefined && value !== null) {
                data[fname] = fieldDef?.valueToDocument(this[fname]);
            }
        }
        return data;
    };
    hydrate(partial) {
        Object.assign(this, partial);
    }
}
