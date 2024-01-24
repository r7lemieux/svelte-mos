import { SvelteComponent } from "svelte";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { MoMeta } from '../../../models/generic/MoMeta';
import type { Mo } from '../../../models/generic/Mo';
declare const __propDef: {
    props: {
        mos?: Mo[] | undefined;
        moMeta: MoMeta;
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
