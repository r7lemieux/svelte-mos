import { Mo } from  '$lib/models/generic/Mo'
import { MoMeta } from  '$lib/models/generic/MoMeta'

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
    super(contactMeta)
    Object.assign(this, props)}
}

const contactMeta = MoMeta.fromProps( {
  hasId: false,
  name: 'contacts',
  keyFieldnames: ['phone', 'email'],
  gridFieldnames: ['firstName', 'lastName', 'phone'],
})
contactMeta.moClass = Contact
contactMeta.initFieldDefs()
console.log(`==>Contact.ts:31 `, Array.from(contactMeta.fieldDefs.keys()))

export {contactMeta}
