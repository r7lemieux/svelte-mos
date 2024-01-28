import { SvelteComponent } from "svelte";
import type { Mo } from '../../../models/managedObjects/Mo';
declare const __propDef: {
    props: {
        mo: Mo;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type SimpleMoProps = typeof __propDef.props;
export type SimpleMoEvents = typeof __propDef.events;
export type SimpleMoSlots = typeof __propDef.slots;
export default class SimpleMo extends SvelteComponent<SimpleMoProps, SimpleMoEvents, SimpleMoSlots> {
}
export {};
