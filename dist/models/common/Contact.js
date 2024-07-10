import { Mo } from '../managedObjects/Mo';
import { moDefDef, MoDefinition } from '../managedObjects/MoDefinition.js';
import { registerMoDef } from '../managedObjects/MoDefinitions.js';
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
        super(contactMoDef);
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
contactMoDef.moDef = moDefDef;
contactMoDef.moClass = Contact;
contactMoDef.initFieldDefs();
registerMoDef(contactMoDef);
