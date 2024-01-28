import { SvelteComponent } from "svelte";
import type { Mo as MoClass } from '../../../models/managedObjects/Mo';
declare const __propDef: {
    props: {
        mo: MoClass;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type MoProps = typeof __propDef.props;
export type MoEvents = typeof __propDef.events;
export type MoSlots = typeof __propDef.slots;
export default class Mo extends SvelteComponent<MoProps, MoEvents, MoSlots> {
}
export {};
