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
export type MoMetaMosProps = typeof __propDef.props;
export type MoMetaMosEvents = typeof __propDef.events;
export type MoMetaMosSlots = typeof __propDef.slots;
export default class MoMetaMos extends SvelteComponent<MoMetaMosProps, MoMetaMosEvents, MoMetaMosSlots> {
}
export {};
