import { Mo } from '../managedObjects/Mo';
export declare class Contact extends Mo {
    firstName?: string;
    lastName?: string;
    phone?: string;
    phone2?: string;
    businessPhone?: string;
    email?: string;
    email2?: string;
    addressLine1?: string;
    addressLine2?: string;
    city?: string;
    state?: string;
    postalCode?: string;
    constructor(props: Partial<Contact>);
}
