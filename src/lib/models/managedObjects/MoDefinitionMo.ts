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
export const moDefMoDef = new MoDefinition('moDef')
moDefMoDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('name'))
moDefMoDef.addFieldDef(from(BaseFieldDefs.Id).chainSetName('id'))
moDefMoDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('name'))
moDefMoDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('dbName'))
moDefMoDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('displayName'))
moDefMoDef.addFieldDef(from(BaseFieldDefs.Array).chainSetName('keyFieldnames'))
moDefMoDef.addFieldDef(from(BaseFieldDefs.Array).chainSetName('gridFieldnames'))
moDefMoDef.addFieldDef(from(BaseFieldDefs.NullableBoolean).chainSetName('hasId'))
moDefMoDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('idType'))
moDefMoDef.addFieldDef(from(BaseFieldDefs.UrlPath).chainSetName('gdriveFilePath'))
moDefMoDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('gdriveFileId'))
const moClassFieldDef = from(BaseFieldDefs.Name).chainSetName('moClass')
const fieldDefsFieldDef = from(BaseFieldDefs.Map).chainSetName('fieldDefs')
// fieldDefsFieldDef.mapValueType = 'object'
moDefMoDef.addFieldDef(fieldDefsFieldDef)
moClassFieldDef.gridColDef.field = undefined
moClassFieldDef.gridColDef.valueGetter = params => params.data.moClass.name
moClassFieldDef.valueToString = v => {
  if (!v) {
    console.log(`==>MoDefinition.ts:172 v `, v)
  }
  v => v.name
}
moDefMoDef.addFieldDef(moClassFieldDef)
// export const moDefMeta: MoMetaInterface = new MoMeta(moDefDef)
Object.assign(moDefMoDef, {
  name: 'moDef',
  dbName: 'moDef',
  displayName: 'Mo Definition',
  keyFieldnames: ['moName'],
  gridFieldnames: ['name', 'gdriveFilePath'],
  moClass: MoDefinitionMo,
  hasId: true,
  idType: 'string',
  gdriveFilePath: 'system/resources/modefs',
  gdriveFileId: null,
  canCreate: false,
})

export const moDefMoMeta: MoMetaInterface = new MoMeta(moDefMoDef)

moDefMoMeta.documentToMo  = doc => {
  const moDefMo = new MoDefinitionMo(moDefMoDef)
  const obj = JSON.parse(doc.json)
  Object.assign(moDefMo, obj)
  return moDefMo
}

moDefMoMeta.dataSource = new HeapDataSource()
moDefMoMeta.dataSource.name = 'moDefMoMeta'
moDefMoMeta.dataSource.keyname = 'name'
