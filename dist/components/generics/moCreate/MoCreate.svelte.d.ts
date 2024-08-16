import { SvelteComponent } from "svelte";
import { MoMeta } from '../../../models/index.js';
declare const __propDef: {
    props: {
        moMeta: MoMeta;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type MoCreateProps = typeof __propDef.props;
export type MoCreateEvents = typeof __propDef.events;
export type MoCreateSlots = typeof __propDef.slots;
export default class MoCreate extends SvelteComponent<MoCreateProps, MoCreateEvents, MoCreateSlots> {
}
export {};
