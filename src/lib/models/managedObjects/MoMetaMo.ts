// import { Mo } from './Mo.js'
import type { MoMetaInterface } from './MoMetaInterface'
import type { DataSource } from '../../services/db/DataSource'
import type { MoDefinitionInterface } from './MoDefinitionInterface'
import { MoMeta } from './MoMeta.js'
import { moDefDef, MoDefinition } from './MoDefinition'
import { BaseFieldDefs, CommonFieldDefs } from '../fields/CommonFieldDefinition.js'
import { from } from '../fields/FieldDefinition.js'
import { HeapDataSource } from '../../services/db/Heap.dataSource.js'
import { Mo } from './Mo';
import type { MoInterface } from './MoInterface'

export class MoMetaMo extends Mo implements MoMetaInterface {
  name: string
  moDef: MoDefinitionInterface
  dataSource?: DataSource

  constructor(moMeta: MoMetaInterface) {
    super({} as MoMetaInterface)
    this.moMeta = moMetaMoMeta
    this.moDef = moMeta.moDef
    this.dataSource = moMeta.dataSource
    this.name = moMeta.name
  }
  toDisplayString = () => this.name || this.moDef.name
  newMo = (): MoInterface => {
    const moClass: MoInterface = this.moDef.moClass || Mo
    const mo: MoInterface = new (moClass as typeof Mo)(this)
    // const mo: Mo = new moClass({moDef: this} as MoMetaInterface)
    return mo
  }
  objToMo = (obj: any): MoInterface => this.newMo().setProps(obj)
  documentToMo = (doc: any): MoInterface => {
    const mo = this.newMo()
    for (const [fname, fDef] of Array.from(this.moDef.fieldDefs.entries())) {
      mo[fname] = fDef.documentToValue(doc[fname])
    }
    return mo
  }
  static fromMoDef = (moDef: MoDefinitionInterface) => new MoMeta(moDef)

  /*  ---------
   *  Accessors
   *  ---------
   */
  getDisplayName = () => this.moDef.getDisplayName()
}

export const moMetaMoDef = new MoDefinition('moMeta')
moMetaMoDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('name'))
const moDefFieldDef = from(CommonFieldDefs.mo).chainSetName('moDef')
moDefFieldDef.mapValueType = 'object'
moMetaMoDef.addFieldDef(moDefFieldDef)
const dataSourceFieldDef = from(BaseFieldDefs.Object).chainSetName('dataSource')
dataSourceFieldDef.mapValueType = 'object'
moMetaMoDef.addFieldDef(dataSourceFieldDef)
Object.assign(moMetaMoDef, {
  name: 'moMeta',
  dbName: 'moMeta',
  moDef: moDefDef,
})
export const moMetaMoMeta = new MoMeta(moMetaMoDef)
moMetaMoMeta.moDef.name = 'moMeta'
moMetaMoMeta.name = 'moMeta'
moMetaMoDef.documentToMo = doc => {
  const moMetaMo = new MoMetaMo({} as MoMetaInterface)
  const obj = JSON.parse(doc.json)
  Object.assign(moMetaMo, obj)
  return moMetaMo
}
const cacheDataSource = new HeapDataSource()
cacheDataSource.name = 'moMetas'
cacheDataSource.keyname = 'name'
moMetaMoMeta.dataSource = cacheDataSource