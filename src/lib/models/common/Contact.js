import { Mo } from  '$lib/models/generic/Mo';
import { MoMeta } from  '$lib/models/generic/MoMeta';
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
        super(contactMeta);
        Object.assign(this, props);
    }
}
const contactMeta = MoMeta.fromProps({
    hasId: false,
    name: 'contacts',
    keyFieldnames: ['phone', 'email'],
    gridFieldnames: ['firstName', 'lastName', 'phone'],
});
contactMeta.moClass = Contact;
contactMeta.initFieldDefs();
console.log(`==>Contact.ts:31 `, Array.from(contactMeta.fieldDefs.keys()));
export { contactMeta };
//# sourceMappingURL=Contact.js.map