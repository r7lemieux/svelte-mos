export class Mo {
    moMeta;
    id;
    constructor(moMeta) {
        this.moMeta = moMeta;
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
        for (const fname of Array.from(this.moMeta.fieldDefs.keys())) {
            const fieldDef = this.moMeta.fieldDefs.get(fname);
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
        for (const fname of Array.from(this.moMeta.fieldDefs.keys())) {
            const fieldDef = this.moMeta.fieldDefs.get(fname);
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
