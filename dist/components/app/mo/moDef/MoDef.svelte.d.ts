import { SvelteComponent } from "svelte";
import type { MoDefinitionMo } from '../../../../models/managedObjects/MoDefinitionMo.js';
declare const __propDef: {
    props: {
        mo: MoDefinitionMo;
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
