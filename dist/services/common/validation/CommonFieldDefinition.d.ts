import { FieldDefinition } from './FieldDefinition';
export declare const BaseFieldDefs: {
    [name: string]: FieldDefinition<any>;
};
export declare const FieldDefs: {
    name: FieldDefinition<any>;
    firstName: FieldDefinition<any>;
    middleName: FieldDefinition<any>;
    lastName: FieldDefinition<any>;
    email: FieldDefinition<any>;
    phoneNumber2: FieldDefinition<any>;
    workPhoneNumber: FieldDefinition<any>;
    addressLine1: FieldDefinition<any>;
    addressLine2: FieldDefinition<any>;
    addressLine3: FieldDefinition<any>;
    city: FieldDefinition<any>;
    state: FieldDefinition<any>;
    country: FieldDefinition<any>;
    company: FieldDefinition<any>;
    jobTitle: FieldDefinition<any>;
    time: FieldDefinition<any>;
    link: FieldDefinition<any>;
    id: FieldDefinition<any>;
    url: FieldDefinition<any>;
    icon: FieldDefinition<any>;
    mimeType: FieldDefinition<any>;
    '': FieldDefinition<any>;
};
export declare const getFieldDef: (name: string) => FieldDefinition<any>;
