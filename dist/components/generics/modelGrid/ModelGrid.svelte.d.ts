import { SvelteComponent } from "svelte";
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import type { MoListModel } from '../../../models/managedObjects/MoList.model.js';
declare const __propDef: {
    props: {
        height?: string | undefined;
        gridId?: string | undefined;
        modelReady?: ((listModel: MoListModel) => boolean) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ModelGridProps = typeof __propDef.props;
export type ModelGridEvents = typeof __propDef.events;
export type ModelGridSlots = typeof __propDef.slots;
export default class ModelGrid extends SvelteComponent<ModelGridProps, ModelGridEvents, ModelGridSlots> {
    get modelReady(): (listModel: MoListModel) => boolean;
}
export {};
