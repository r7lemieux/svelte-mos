import { SvelteComponent } from "svelte";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { MoListModel } from '../../../models/generic/MoList.model';
declare const __propDef: {
    props: {
        height?: string | undefined;
        gridId?: string | undefined;
        model?: MoListModel | null | undefined;
        modelReady?: ((listModel: MoListModel) => boolean) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type MosGridProps = typeof __propDef.props;
export type MosGridEvents = typeof __propDef.events;
export type MosGridSlots = typeof __propDef.slots;
export default class MosGrid extends SvelteComponent<MosGridProps, MosGridEvents, MosGridSlots> {
    get modelReady(): (listModel: MoListModel) => boolean;
}
export {};
