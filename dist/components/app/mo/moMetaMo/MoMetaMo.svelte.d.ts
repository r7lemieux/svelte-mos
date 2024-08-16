import { SvelteComponent } from "svelte";
import { MoMetaMo } from '../../../../models/managedObjects/MoMetaMo.js';
declare const __propDef: {
    props: {
        mo: MoMetaMo;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type MoMetaMoProps = typeof __propDef.props;
export type MoMetaMoEvents = typeof __propDef.events;
export type MoMetaMoSlots = typeof __propDef.slots;
export default class MoMetaMo extends SvelteComponent<MoMetaMoProps, MoMetaMoEvents, MoMetaMoSlots> {
}
export {};
