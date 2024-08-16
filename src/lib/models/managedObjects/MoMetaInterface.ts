import type { MoInterface } from '$lib/models/managedObjects/MoInterface'
import type { DataSource } from '$lib/services/db/DataSource.js'
import type { MoDefinitionInterface } from '$lib/models/index.js'

export interface MoMetaInterface {
	name: string
	moDef: MoDefinitionInterface
	dataSource?: DataSource
	newMo?: () => MoInterface
	objToMo: (any) => MoInterface
	documentToMo?: (any) => MoInterface

	/*  ---------
	 *  Accessors
	 *  ---------
	 */
}
