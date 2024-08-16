import { Mo } from './Mo.js'
import { defaultDbService } from '../../config/config.js'
import { ErrorName } from '../../services/common/message/errorName.js'
import { Rezult } from '../../services/common/message/rezult.js'
import { CacheDataSource } from '../../services/db/Cache.dataSource.js'
import type { MoMetaInterface } from './MoMetaInterface.js'
import type { DataSource } from '../../services/db/DataSource.js'
import type { MoDefinitionInterface } from './MoDefinitionInterface.js'
import type { MoInterface } from './MoInterface.js'
import { MoDefinition } from './MoDefinition.js'

export class MoMeta implements MoMetaInterface {
  name: string
  moDef: MoDefinitionInterface
  dataSource: DataSource

  constructor(moDef: MoDefinition) {
    this.moDef = moDef
    const cacheDataSource = new CacheDataSource(this.moDef)
    cacheDataSource.db = defaultDbService
    this.dataSource = cacheDataSource
    this.setName() // todo uncomment
    this.init()
  }

  static fromMoDef = (moDef: MoDefinition) => new MoMeta(moDef)

  /* ------------
   * Construction
   * ------------
   */
  init() {
  }

  setName = (given_name?: string) => {
    let name = ''
    if (given_name) {
      if (!given_name.match(/[A-Za-z-1-9]/)) throw new Rezult(ErrorName.field_invalid, {
        method: 'MoMeta.extractFieldnamesFromMo',
        name: given_name,
      })
      name = given_name
    } else if (this.dataSource && this.dataSource.name) {
      name = this.moDef.name + '.' + this.dataSource.name
    } else {
      name = this.moDef.name
    }
    //Todo ensure name is unique
    this.name = name
  }

  /*  ---------
   *  Accessors
   *  ---------
   */
  getDisplayName = () => this.name

  /*  --
   *  Mo
   *  These methods delegate to MoDef by default
   *  in order to share MoDef behavior
   *  They add the dataSource management
   *  They can be overridden
   *  --
   */
  newMo = () => {
    const mo: MoInterface = new this.moDef.newMo()
    mo.moMeta = this
    this.dataSource.addMo(mo)
    return mo
  }
  objToMo = (obj: any): MoInterface => this.moDef.objToMo(obj, this)

  moToObj = (mo: any): any => this.moDef.moToObj(mo)
  moToDocument = mo => this.moDef.moToDocument(mo)
  toDocument = () => {
    //Todo
  }
  documentToMo = (doc: any): MoInterface => {
    const mo = this.newMo()
    for (const [fname, fDef] of Array.from(this.moDef.fieldDefs.entries())) {
      mo[fname] = fDef.documentToValue(doc[fname])
    }
    return mo
  }
}
