// import { Mo } from './Mo'
import { defaultDbService } from '../../config/config.js'
import { ErrorName } from '../../services/common/message/errorName.js'
import { Rezult } from '../../services/common/message/rezult.js'
import { CacheDataSource } from '../../services/db/Cache.dataSource.js'
import type { MoMetaInterface } from './MoMetaInterface'
import type { DataSource } from '../../services/db/DataSource.js'
import type { MoDefinitionInterface } from './MoDefinitionInterface'
import { MoDefinition } from './MoDefinition'
import { MoMeta } from './MoMeta.js';


const defaultMoDef = new MoDefinition('default')
// defaultMoDef.moClass = Mo
export const defaultMoMeta = new MoMeta(defaultMoDef)
// export const moMetaDef = new MoDefinition('moMeta')
// moMetaDef.addFieldDef(from(BaseFieldDefs.Id).chainSetName('id'))
// moMetaDef.addFieldDef(from(BaseFieldDefs.Name).chainSetName('name'))
// const moDefFieldDef = from(BaseFieldDefs.Map).chainSetName('moDef')
// moDefFieldDef.mapValueType = 'object'
// moMetaDef.addFieldDef(moDefFieldDef)
// const dataSourceFieldDef = from(BaseFieldDefs.Map).chainSetName('dataSource')
// dataSourceFieldDef.mapValueType = 'object'
// moMetaDef.addFieldDef(dataSourceFieldDef)
// Object.assign(moMetaDef, {
//   name: 'moMeta',
//   dbName: 'moMeta',
//   displayName: 'Mo Meta',
//   keyFieldnames: ['name'],
//   gridFieldnames: ['name'],
//   moClass: MoMeta,
//   hasId: true,
//   idType: 'string',
//   // dataSource: new CacheDataSource(moMetaDef),
//   gdriveFilePath: 'system/resources',
//   gdriveFileId: null,
//   canCreate: false,
// })
// const moMetaDefDef = new MoDefinition('moMeta')
// moMetaDef.moDef = moMetaDef
// moMetaDef.documentToMo  = doc => {
//   const moDef = new MoDefinition('moDef', MoMeta)
//   const obj = JSON.parse(doc.json)
//   Object.assign(moDef, obj)
//   return moDef
//   //return JSON.parse(doc)
// }
// const moMetaMeta = new MoMeta(moMetaDef)
// const cacheDataSource = new HeapDataSource(this)
// cacheDataSource.keyname = 'name'
// moMetaMeta.dataSource = cacheDataSource
// export const moDefMeta: MoMetaInterface = new MoMeta(moDefDef)
//
// console.log(`==>MoMeta.ts:127 moDef`, moDef);
export const newMoMetaFromMoDef = (moDef: MoDefinitionInterface) => new MoMeta(moDef)
