import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        mos: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type MoDefsProps = typeof __propDef.props;
export type MoDefsEvents = typeof __propDef.events;
export type MoDefsSlots = typeof __propDef.slots;
export default class MoDefs extends SvelteComponent<MoDefsProps, MoDefsEvents, MoDefsSlots> {
}
export {};
