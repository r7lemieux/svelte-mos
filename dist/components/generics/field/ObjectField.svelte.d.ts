import { SvelteComponent } from "svelte";
import type { MoViewMode } from '../../../constants/ui';
declare const __propDef: {
    props: {
        value: any;
        level: any;
        viewMode: MoViewMode;
        onChange: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ObjectFieldProps = typeof __propDef.props;
export type ObjectFieldEvents = typeof __propDef.events;
export type ObjectFieldSlots = typeof __propDef.slots;
export default class ObjectField extends SvelteComponent<ObjectFieldProps, ObjectFieldEvents, ObjectFieldSlots> {
}
export {};
