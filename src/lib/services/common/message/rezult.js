import { ErrorName } from './errorName';
export class Rezult extends Error {
    status = 'error';
    data;
    context;
    static mode = 'test';
    constructor(errorName = ErrorName.ok, data, context) {
        super();
        this.setName(errorName);
        this.data = data;
        this.context = context;
        if (errorName != ErrorName.ok)
            console.trace(`==>rezult.ts:19 `, this.toString());
    }
    setName = (errorName) => {
        this.name = ErrorName[errorName];
    };
    toString = () => {
        let data = this.data;
        try {
            data = JSON.stringify(this.data);
        }
        catch (err) {
            try {
                data = this.stringifyOneLevel(this.data);
            }
            catch (err) {
                try {
                    data = this.data.toString();
                }
                catch (err) {
                    data = this.data;
                }
            }
        }
        return `> ${this.status} ${this.context} ${this.name} ${this.message} ${data}`;
    };
    stringifyOneLevel = obj => JSON.stringify(obj, function (k, v) { return k && v && typeof v !== "number" ? (Array.isArray(v) ? "[object Array]" : "" + v) : v; });
    print = (str) => {
        this.context = str;
        if (!process.env.testing) {
            console.log(this.toString());
        }
    };
}
export const OK = new Rezult(ErrorName.ok);
//# sourceMappingURL=rezult.js.map