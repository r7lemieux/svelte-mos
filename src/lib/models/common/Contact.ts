import { Mo } from '$lib/models/managedObjects/Mo'
import { moDefDef, MoDefinition } from '$lib/models/managedObjects/MoDefinition.js';
import { registerMoDef } from '$lib/models/managedObjects/MoDefinitions.js';

export class Contact extends Mo {
  firstName?: string
  lastName?: string
  phone?: string
  phone2?: string
  businessPhone?: string
  email?: string
  email2?: string
  addressLine1?: string
  addressLine2?: string
  city?: string
  state?: string
  postalCode?: string
	constructor(props: Partial<Contact>) {
		super(contactMoDef)
		Object.assign(this, props)
	}
}
	const contactMoDef = MoDefinition.fromProps( {
		hasId: false,
		name: 'contacts',
		id: 'contacts',
		keyFieldnames: ['phone', 'email'],
		gridFieldnames: ['firstName', 'lastName', 'phone'],
	})
  contactMoDef.moDef = moDefDef
	contactMoDef.moClass = Contact
	contactMoDef.initFieldDefs()
  registerMoDef(contactMoDef)