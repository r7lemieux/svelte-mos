import type { MoInterface } from './MoInterface';
import type { FieldDefinitionInterface } from '../fields/FieldDefinition.interface';
import type { MoMetaInterface } from './MoMetaInterface';

export interface MoDefinitionInterface {
	name: string
	dbName: string //todo remove
	displayName?: string
	keyFieldnames: string[][]
	fieldDefs: Map<string, FieldDefinitionInterface<any>>
	gridFieldnames?: string[]
	moClass: any
	hasId: boolean
	idType: 'number' | 'string'
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
	deriveFieldDefsFromMo: () => FieldDefinitionInterface<any>[]
	deriveFieldDefsFromFieldnames: (fieldnames: string[]) => FieldDefinitionInterface<any>[]
	extractFieldnamesFromMo: () => string[]

	/*  --
	 *  Mo
	 *  --
	 */
	newMo: (moMeta?: MoMetaInterface) => MoInterface
	objToMo: (obj: object, moMeta: MoMetaInterface) => MoInterface
	moToObj: (mo: MoInterface) => object
	moToDocument: (mo: MoInterface) => any
	documentToMo: (doc: any) => MoInterface
	// toDocument: () => any
}
