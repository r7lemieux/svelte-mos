import { SvelteComponent } from "svelte";
import type { MoDefinition } from '../../../../models/managedObjects/MoDefinition.js';
declare const __propDef: {
    props: {
        mo: MoDefinition;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type MoDefProps = typeof __propDef.props;
export type MoDefEvents = typeof __propDef.events;
export type MoDefSlots = typeof __propDef.slots;
export default class MoDef extends SvelteComponent<MoDefProps, MoDefEvents, MoDefSlots> {
}
export {};
