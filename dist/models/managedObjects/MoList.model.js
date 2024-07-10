// Prototype
import { CommonFieldDefs, getFieldDef } from '../fields/CommonFieldDefinition';
import { FieldDefinition } from '../fields/FieldDefinition';
import { Rezult } from '../../services/common/message/rezult';
import { getClosestFieldName } from '../fields/FieldMatcher';
import { MoDefinition } from './MoDefinition.js';
import { ErrorName } from '../../services/common/message/errorName';
export class MoListModel {
    moDef;
    mos = [];
    fieldDefs;
    constructor(moDef) {
        this.moDef = moDef;
    }
    errors = [];
    init() {
        // this.mos.forEach(mo => mo.view = 'MMM2')
        // this.addViewButton()
    }
    getName = () => this.moDef.name;
    getFieldDefs = () => {
        if (!this.fieldDefs) {
            this.fieldDefs = this.moDef.fieldDefs;
        }
        return this.fieldDefs;
    };
    /* ----------------------
    * Construct From Objects
    * -----------------------
    */
    buildFromObjs = objs => {
        this.moDef.fieldDefs = this.buildFieldDefs(objs);
        this.mos = objs.map(this.moDef.objToMo);
    };
    buildFieldnameToKeys = (objs) => {
        if (!objs || !objs.length)
            return {};
        const keyToFieldname = {};
        const fieldnameToKeys = {};
        for (const obj of objs) {
            for (const key of Object.keys(obj)) {
                const mappedFieldName = keyToFieldname[key];
                if (!mappedFieldName) {
                    const fieldName1 = getClosestFieldName(key);
                    //later find mapping base on single words. The last one is most important. i.e. "home phone" is phone type
                    if (!fieldnameToKeys[fieldName1])
                        fieldnameToKeys[fieldName1] = [];
                    fieldnameToKeys[fieldName1].push(key);
                    keyToFieldname[key] = fieldName1;
                }
            }
        }
        return fieldnameToKeys;
    };
    buildFieldDefs = (objs) => {
        const fieldDefs = new Map();
        if (!objs || !objs.length)
            return fieldDefs;
        const fieldnameToKeys = this.buildFieldnameToKeys(objs);
        for (const [fieldname, keys] of Object.entries(fieldnameToKeys)) {
            for (const key of keys) {
                //later keyToFieldname[key] = normalize(key) // get a nice key name, try to use a common fieldDef
                // keyToFieldname[key] = key
                const fieldDef = FieldDefinition.from(CommonFieldDefs[fieldname], { key, name: key });
                fieldDefs.set(fieldname, fieldDef);
                //Build a field def for those keys.
            }
        }
        return fieldDefs;
    };
    extractFieldNamesFromHeaderLine = titleStr => titleStr.split(',').map(getClosestFieldName);
    /* -----
     *  CSV
     * -----
     */
    static fromCsv = (name, str) => {
        const moDef = new MoDefinition(name);
        const model = new MoListModel(moDef);
        model.buildFromCsv(str);
        return model;
    };
    buildFromCsv(sheetStr) {
        const lines = sheetStr.split('\r\n');
        const titleStr = lines[0];
        this.buildFieldDefsFromTitleLine(titleStr);
        const fieldNames = titleStr.split(',');
        this.moDef.hasId = fieldNames.indexOf('id') !== -1;
        const fieldDefArray = Array.from(this.getFieldDefs().values());
        for (let l = 1; l < lines.length; l++) {
            const line = lines[l];
            const row = {};
            const fields0 = line.split(',');
            for (let i = 0; i < fields0.length; i++) {
                const field0 = fields0[i];
                const fieldDef = fieldDefArray[i];
                if (fieldDef) {
                    try {
                        const field1 = fieldDef.parse(field0);
                        row[fieldDef.name] = field1;
                    }
                    catch (ex) {
                        if (ex && ex instanceof Rezult) {
                            ex.context = `parsing line:${l}, field:${i}`;
                            this.errors.push(ex);
                        }
                        else {
                            console.trace(`==>SpreadSheetBuilder.service.ts:39 ex`, ex);
                        }
                    }
                }
            }
            this.mos.push(this.moDef.objToMo(row));
        }
    }
    buildFieldDefsFromTitleLine(titleStr) {
        const fieldNames = titleStr.split(',');
        const fieldDefNames = this.extractFieldNamesFromHeaderLine(titleStr);
        for (let f = 0; f < fieldNames.length; f++) {
            const fieldDef = FieldDefinition.from(CommonFieldDefs[fieldDefNames[f]] || CommonFieldDefs['default']);
            fieldDef.name = fieldNames[f];
            this.getFieldDefs().set(fieldNames[f], fieldDef);
        }
    }
    matchFieldDefsFromTitleLine(fieldNames, addFields) {
        const fieldDefs = fieldNames.map(fieldName => {
            let fieldDef = this.getFieldDefs().get(fieldName);
            if (!fieldDef && addFields) {
                const defFieldName = getClosestFieldName(fieldName);
                fieldDef = FieldDefinition.from(CommonFieldDefs[defFieldName || CommonFieldDefs['default']]);
                fieldDef.name = fieldName;
                this.getFieldDefs().set(fieldName, fieldDef);
            }
            return fieldDef;
        });
        return fieldDefs;
    }
    fillFromCsv(sheetStr, options) {
        const lines = sheetStr.split('\r\n');
        const titleStr = lines[0];
        const fieldNames = titleStr.split(',');
        const fieldDefs = this.matchFieldDefsFromTitleLine(fieldNames, !!options?.addNewFields);
        if (this.moDef.hasId && fieldNames.indexOf('id') === -1) {
            throw new Rezult(ErrorName.gdrive_missing_id);
        }
        for (let l = 1; l < lines.length; l++) {
            const line = lines[l];
            const row = {};
            const fields0 = line.split(',');
            for (let i = 0; i < fields0.length; i++) {
                const field0 = fields0[i];
                const fieldDef = fieldDefs[i];
                if (fieldDef) {
                    try {
                        const field1 = fieldDef.parse(field0);
                        row[fieldDef.name] = field1;
                    }
                    catch (ex) {
                        if (ex && ex instanceof Rezult) {
                            ex.context = `parsing line:${l}, field:${i}`;
                            this.errors.push(ex);
                        }
                        else {
                            console.trace(`==>SpreadSheetBuilder.service.ts:39 ex`, ex);
                        }
                    }
                }
            }
            this.mos.push(this.moDef.objToMo(row));
        }
    }
    /* -------
     * Actions
     * -------
     */
    goToView = pmo => {
        let mo;
        if (pmo.id) {
            mo = this.moDef.dataSource.getMo(pmo.id);
        }
        else {
            mo = pmo;
        }
    };
}
