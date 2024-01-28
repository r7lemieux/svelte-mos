import { SvelteComponent } from "svelte";
import type { MoViewMode } from '../../../constants/ui';
import type { FieldDefinition } from '../../../models/fields/FieldDefinition';
declare const __propDef: {
    props: {
        fieldDef: FieldDefinition<never>;
        value: any;
        viewMode: MoViewMode;
        onChange: any;
        level: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ArrayFieldProps = typeof __propDef.props;
export type ArrayFieldEvents = typeof __propDef.events;
export type ArrayFieldSlots = typeof __propDef.slots;
export default class ArrayField extends SvelteComponent<ArrayFieldProps, ArrayFieldEvents, ArrayFieldSlots> {
}
export {};
