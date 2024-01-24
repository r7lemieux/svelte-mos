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
export type MoMetasProps = typeof __propDef.props;
export type MoMetasEvents = typeof __propDef.events;
export type MoMetasSlots = typeof __propDef.slots;
export default class MoMetas extends SvelteComponent<MoMetasProps, MoMetasEvents, MoMetasSlots> {
}
export {};
