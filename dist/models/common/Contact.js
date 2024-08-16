import { Mo } from '../managedObjects/Mo.js';
import { MoDefinition } from '../managedObjects/MoDefinition';
// import { newMoMetaFromMoDef } from '../managedObjects/moMetaInstances.js'
import { MoMeta } from '../index.js';
export class Contact extends Mo {
    firstName;
    lastName;
    phone;
    phone2;
    businessPhone;
    email;
    email2;
    addressLine1;
    addressLine2;
    city;
    state;
    postalCode;
    constructor(props) {
        super(contactMoMeta);
        Object.assign(this, props);
    }
}
const contactMoDef = MoDefinition.fromProps({
    hasId: false,
    name: 'contacts',
    id: 'contacts',
    keyFieldnames: ['phone', 'email'],
    gridFieldnames: ['firstName', 'lastName', 'phone'],
});
contactMoDef.initFieldDefs();
let contactMoMeta;
export const getContactMoMeta = () => {
    if (!contactMoMeta)
        contactMoMeta = new MoMeta(contactMoDef);
    return contactMoMeta;
};
contactMoDef.moClass = Contact;
