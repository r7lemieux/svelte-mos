import {MoMeta} from '../../models/managedObjects/MoMeta'
import { MoMetaMo, moMetaMoMeta } from '../../models/managedObjects/MoMetaMo'
import {MoDefinitionMo} from '../../models/managedObjects/MoDefinitionMo'
import type { MoMetaInterface} from '../../models/managedObjects/MoMetaInterface'
import type {MoDefinitionInterface} from '../../models/managedObjects/MoDefinitionInterface'
import {MoDefinition} from '../../models/managedObjects/MoDefinition'
import { moDefMoMeta } from '../../models/managedObjects/MoDefinitionMo'
import {Rezult} from '../common/message/rezult'
import {ErrorName} from '../common/message/errorName'


export const moMetas: {[name:string]: MoMetaInterface} = {}
export const moDefs: {[name:string]: MoDefinition} = {}

export const registerMoMeta = (moMeta: MoMetaInterface) => {
	const name = moMeta.name
	if (!name) throw new Rezult(ErrorName.missingParam)
	const moDefMo = registerMoDef(moMeta.moDef)

	moMetas[name] = moMeta

	const moMetaMo = new MoMetaMo(moMetaMoMeta)
	// moMetaMo.id = moMetaMo.id || nextId++
	moMetaMo.id = moMetaMo.id || moMeta.name
	// moMetaMo.name = moMetaMo.name || moMetaMo.id
	moMetaMo.moDef = moDefMo

	moMetas[name] = moMeta
	moMetaMoMeta.dataSource?.saveMo(moMetaMo)
}

export const registerMoDef = (moDef: MoDefinitionInterface): MoDefMo => {
	const name = moDef.name
	if (!name) throw new Rezult(ErrorName.missingParam)
	moDefs[name] = moDef
	const moDefMo = new MoDefinitionMo(moDef)
	moDefMoMeta.dataSource?.saveMo(moDefMo)
	return moDefMo
}

export const getMoMetaMo = (name): MoMeta => {
	const moMeta = moMetas[name]
	if (!moMeta) throw new Rezult(ErrorName.missingValue)
	return new MoMetaMo(moMeta)
}

export const getMoDefMo = (name): MoDef => {
	const modef = moDefs[name]
	if (!moDef) throw new Rezult(ErrorName.missingValue)
	return new MoDefinitionMo(moDef)
}
