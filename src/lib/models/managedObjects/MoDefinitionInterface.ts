import type {Mo} from '$lib/models/managedObjects/Mo'
import type {FieldDefinition} from '$lib/models/fields/FieldDefinition'
import type {DataSource} from  '$lib/services/db/DataSource'

export interface MoDefinitionInterface {
  name: string
  dbName: string
  displayName?: string
  keyFieldnames: string[][]
  fieldDefs: Map<string, FieldDefinition<any>>
  gridFieldnames?: string[]
  moClass: any
  hasId: boolean
  idType: 'number' | 'string'
  dataSource: DataSource
  gdriveFilePath?: string
  gdriveFileId?: string | null
  canCreate: boolean

  /*  ---------
   *  Accessors
   *  ---------
   */
  getDisplayName: () => string
  getDbName: () => string
  getFieldNames: () => string[]
  getMoClass: () => any

  /* -----------------
   * Field Definitions
   * -----------------
   */
  initFieldDefs: () => void
  addFieldDefsFromNames: (fieldnames: string[]) => void
  deriveFieldDefsFromMo: () => FieldDefinition<any>[]
  deriveFieldDefsFromFieldnames: (fieldnames: string[]) => FieldDefinition<any>[]
  extractFieldnamesFromMo: () => string[]

  /*  --
   *  Mo
   *  --
   */
  newMo: () => Mo
  objToMo: (obj: object) => Mo
  moToObj: (mo: Mo) => object
}
