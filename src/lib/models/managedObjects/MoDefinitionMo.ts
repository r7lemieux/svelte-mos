import { Mo } from './Mo'
import { from } from '../fields/FieldDefinition'
import { BaseFieldDefs } from '../fields/CommonFieldDefinition'
import type { MoDefinitionInterface } from './MoDefinitionInterface'
import type { MoMetaInterface } from './MoMetaInterface'
import { MoMeta } from './MoMeta'
import { moDefDef, MoDefinition } from './MoDefinition'
import { HeapDataSource } from '../../services/db/Heap.dataSource'

export class MoDefinitionMo extends Mo implements MoDefinitionInterface {
  moDef: MoDefinitionInterface
  constructor(moDef: MoDefinitionInterface) {
    super(moDefMoMeta)
    this.moDef = moDef
    this.id = this.name = moDef.name
    this.getDiplayName = this.moDef.getDisplayName
    Object.assign(this, this.moDef)
  }
  // getDisplayName = () => this.moDef.getDisplayName()
}
export const moDefMoDef = new MoDefinition('moDefMo')
moDefMoDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('name'))
const fieldDefsFieldDef = from(BaseFieldDefs.Object).chainSetName('moDef')
fieldDefsFieldDef.mapValueType = 'object'
moDefMoDef.addFieldDef(fieldDefsFieldDef)
export const moDefMoMeta: MoMetaInterface = new MoMeta(moDefMoDef)

Object.assign(moDefMoDef, {
  name: 'moDefMo',
  dbName: 'moDefMo',
  displayName: 'Mo Definition Mo',
  moClass: MoDefinitionMo,
  canCreate: false,
  moDef: moDefDef
})

moDefMoMeta.documentToMo  = doc => {
  const moDefMo = new MoDefinitionMo(moDefMoDef)
  const obj = JSON.parse(doc.json)
  Object.assign(moDefMo, obj)
  return moDefMo
}

moDefMoMeta.dataSource = new HeapDataSource()
moDefMoMeta.dataSource.name = 'moDefMoMeta'
moDefMoMeta.dataSource.keyname = 'name'
