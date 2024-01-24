import { SvelteComponent } from "svelte";
import type { MoMeta } from '../../../../models/generic/MoMeta';
declare const __propDef: {
    props: {
        mo: MoMeta;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type MoMetaProps = typeof __propDef.props;
export type MoMetaEvents = typeof __propDef.events;
export type MoMetaSlots = typeof __propDef.slots;
export default class MoMeta extends SvelteComponent<MoMetaProps, MoMetaEvents, MoMetaSlots> {
}
export {};
