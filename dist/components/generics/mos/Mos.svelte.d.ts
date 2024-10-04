import { SvelteComponent } from "svelte";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { Mo } from '../../../models/managedObjects/Mo.js';
import { type MoMetaInterface } from '../../../models/index.js';
declare const __propDef: {
    props: {
        mos?: Mo[];
        moMeta: MoMetaInterface;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type MosProps = typeof __propDef.props;
export type MosEvents = typeof __propDef.events;
export type MosSlots = typeof __propDef.slots;
export default class Mos extends SvelteComponent<MosProps, MosEvents, MosSlots> {
}
export {};
