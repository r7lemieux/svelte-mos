import { MoMeta } from './MoMeta.js';
import { MoMetaMo } from './MoMetaMo.js';
export declare const UiMoMeta: {};
export declare const getUiMoMeta: (moMeta: any) => any;
export declare const registerMoMeta: (moMeta: MoMeta) => void;
export declare const getMoMetaMo: (name: any) => Promise<MoMetaMo>;
export declare const getMoMeta: (name: any) => Promise<MoMeta>;
