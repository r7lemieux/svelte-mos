import { ErrorName } from './errorName';
export type RezultStatus = 'message' | 'error';
export declare class Rezult extends Error {
    status: RezultStatus;
    data: any;
    context: string | undefined;
    static mode: 'test' | 'app';
    constructor(errorName?: ErrorName, data?: any, context?: string);
    setName: (errorName: ErrorName) => void;
    toString: () => string;
    stringifyOneLevel: (obj: any) => string;
    print: (str: string) => void;
}
export declare const OK: Rezult;
