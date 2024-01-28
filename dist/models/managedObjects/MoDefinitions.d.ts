import { MoDefinition } from './MoDefinition.js';
export declare const UiMoDefs: {};
export declare const getUiMoDef: (moDef: any) => any;
export declare const registerMoDef: (moDef: MoDefinition) => void;
export declare const getMoDef: (moname: string) => Promise<MoDefinition>;
