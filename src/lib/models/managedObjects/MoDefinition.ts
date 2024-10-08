import { type Mo } from './Mo'
// import { MoInterface } from './MoInterface'
import { FieldDefinition, from } from '../fields/FieldDefinition'
import { BaseFieldDefs, getFieldDef } from '../fields/CommonFieldDefinition'
import { getClosestFieldName } from '../fields/FieldMatcher'
import { toDisplayString } from '../../services/common/util/string.utils'
import { ErrorName } from '../../services/common/message/errorName'
import { Rezult } from '../../services/common/message/rezult'
import type { MoDefinitionInterface } from './MoDefinitionInterface'
import type { MoMetaInterface } from  './MoMetaInterface'
import type { MoInterface } from '$lib/models/index.js'
// import { defaultMoMeta } from '$lib/models/managedObjects/moMetaInstances.js'
// import type { MoMetaInterface } from './MoMetaInterface'
// import { defaultMoMeta } from './MoMeta'

export class MoDefinition implements MoDefinitionInterface {
  id: string
  name: string
  dbName: string
  displayName?: string
  keyFieldnames: string[][] = []
  fieldDefs = new Map<string, FieldDefinition<any>>()
  gridFieldnames?: string[]
  moClass: typeof Mo
  hasId = false
  idType: 'number' | 'string' = 'string'
  gdriveFilePath?: string
  gdriveFileId?: string | null
  canCreate = true

  constructor(name: string, moClass?) {
    // super({} as MoMetaInterface)
    if (name && !name.match(/[A-Za-z0-9]/)) throw new Rezult(ErrorName.field_invalid, {
      method: 'MoDefinition.extractFieldnamesFromMo',
      name: name
    })
    this.name = this.dbName = this.id = name
    this.moClass = moClass
    // if (this.name !== 'moDef') this.moMeta = moDefMeta
    this.init()
  }

  /* ------------
   * Construction
   * ------------
   */
  init() { }

  static fromProps = (props: any): MoDefinition => {
    // if (!props.name || ! props.moClass) throw new Rezult(ErrorName.missing_param, {class: 'static DefMo', method: 'fromProps', props })
    const moDef = new MoDefinition(props.name, props.moClass)
    Object.assign(moDef, props)
    if (!props.fieldDefs && props.moClass) {
      moDef.initFieldDefs()
    }
    return moDef
  }
  // del
  // static MoDefFieldDefs = [
  //   FieldDefinition.from(CommonFieldDefs.name),
  //   FieldDefinition.from(BaseFieldDefs.Array, {name: 'keyFieldNames'}),
  //   FieldDefinition.from(BaseFieldDefs.Object, {name: 'fieldDefs'}),
  // ]

  /*  ---------
   *  Accessors
   *  ---------
   */
  getDisplayName = () => this.displayName || toDisplayString(this.name)
  getDbName = () => this.dbName || this.name
  getFieldNames = () => Array.from(this.fieldDefs.keys())
  // getMoClass = () => this.moClass || typeof Mo
  getMoClass = () => this.moClass
  /* -----------------
   * Field Definitions
   * -----------------
   */
  initFieldDefs() {
    this.deriveFieldDefsFromMo()
      .forEach(fd => this.fieldDefs.set(fd.name, fd))
  }

  addFieldDef = fieldDef => {
    this.fieldDefs.set(fieldDef.name, fieldDef)
    return fieldDef
  }
  addFieldDefsFromNames = (fieldnames: string[]) => {
    this.deriveFieldDefsFromFieldnames(fieldnames)
      .forEach(fd => this.fieldDefs.set(fd.name, fd))
  }

  deriveFieldDefsFromMo() {
    const fieldnames = this.extractFieldnamesFromMo()
    const fieldDefs = this.deriveFieldDefsFromFieldnames(fieldnames)
    return fieldDefs
  }

  deriveFieldDefsFromFieldnames = (fieldnames: string[] = []) => {
    return fieldnames
      .map(getClosestFieldName)
      .map(getFieldDef)
      .map((fd, i) => from(fd, {name: fieldnames[i]}))
  }

  extractFieldnamesFromMo() {
    // const moClass: typeof Mo = this.moClass || Mo
    const moClass =  this.moClass || Object
	  const mo: MoInterface = this.newMo()
	  const fieldnames = Object.getOwnPropertyNames(mo).filter(n => typeof mo[n] !== 'function' && n !== 'moDef')
	  return fieldnames
  }

  /*  -------------
   *  Mo Management
   *  -------------
   */
  // I would prefer Mo and typeof Mo to MoInterface i
  // but it causes:  ReferenceError: Cannot access 'Mo' before initialization
  // newMo = (): Mo => {
  //   const moClass: typeof Mo = this.moClass || Mo
  //   const mo: Mo = new moClass()
  //   return mo
  // }
  // objToMo = (obj: object, moMeta: MoMetaInterface): Mo => this.newMo().setProps(obj)
  // documentToMo = (doc: any): Mo => {
  //   const mo = this.newMo()
  //   for (const [fname, fDef] of Array.from(this.fieldDefs.entries())) {
  //     mo[fname] = fDef.documentToValue(doc[fname])
  //   }
  //   return mo
  // }
  newMo = (): MoInterface => {
    const moClass = this.moClass || Object
    const mo = new moClass() as MoInterface
    return mo
  }
  objToMo = (obj: object, moMeta: MoMetaInterface): MoInterface => this.newMo().setProps(obj)
  documentToMo = (doc: any): MoInterface => {
    const mo = this.newMo()
    for (const [fname, fDef] of Array.from(this.fieldDefs.entries())) {
      mo[fname] = fDef.documentToValue(doc[fname])
    }
    return mo
  }
  moToObj = (mo: any): any => mo.toObj()
  moToDocument = mo => mo.toDocument()
}

const defaultMoDef = new MoDefinition('default')
defaultMoDef.moClass = Object //typeof Mo

// const moDefDef = new MoDefinition('MoDefinition')
const moDefDef = new MoDefinition('moDef')
moDefDef.addFieldDef(from(BaseFieldDefs.Id).chainSetName('id'))
moDefDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('name'))
moDefDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('dbName'))
moDefDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('displayName'))
moDefDef.addFieldDef(from(BaseFieldDefs.Array).chainSetName('keyFieldnames'))
moDefDef.addFieldDef(from(BaseFieldDefs.Array).chainSetName('gridFieldnames'))
moDefDef.addFieldDef(from(BaseFieldDefs.NullableBoolean).chainSetName('hasId'))
moDefDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('idType'))
moDefDef.addFieldDef(from(BaseFieldDefs.UrlPath).chainSetName('gdriveFilePath'))
moDefDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('gdriveFileId'))
const fieldDefsFieldDef = from(BaseFieldDefs.Map).chainSetName('fieldDefs')
fieldDefsFieldDef.mapValueType = 'object'
moDefDef.addFieldDef(fieldDefsFieldDef)
const moClassFieldDef = from(BaseFieldDefs.Name).chainSetName('moClass')
moClassFieldDef.gridColDef.field = undefined
moClassFieldDef.gridColDef.valueGetter = params => params.data.moClass.name
moClassFieldDef.valueToString = v => {
  if (!v) {
  console.log(`==>MoDefinition.ts:172 v `, v)
}
  v => v.name
}
moDefDef.addFieldDef(moClassFieldDef)
// export const moDefMeta: MoMetaInterface = new MoMeta(moDefDef)
Object.assign(moDefDef, {
  name: 'moDef',
  dbName: 'moDef',
  displayName: 'Mo Definition',
  keyFieldnames: ['moName'],
  gridFieldnames: ['name', 'gdriveFilePath'],
  moClass: typeof MoDefinition,
  hasId: true,
  idType: 'string',
  // dataSource: new CacheDataSource(moDefDef),
  gdriveFilePath: 'system/resources',
  gdriveFileId: null,
  canCreate: false,
})
const moDefDefDef = new MoDefinition('moDefDef')
// const moDefDefMeta =  new MoMeta(moDefDefDef)
// moDefDef.moMeta = moDefDefMeta
// moDefMeta.documentToMo  = doc => {
//   const moDef = new MoDefinition('moDef', MoDefinition)
//   const obj = JSON.parse(doc.json)
//   Object.assign(moDef, obj)
//   return moDef
//   //return JSON.parse(doc)
// }
export {defaultMoDef, moDefDef}

