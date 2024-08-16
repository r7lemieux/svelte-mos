import { SvelteComponent } from "svelte";
import type { MoViewMode } from '../../../constants/ui.js';
import type { FieldDefinition } from '../../../models/fields/FieldDefinition.js';
declare const __propDef: {
    props: {
        fieldDef: FieldDefinition<never>;
        value: any;
        viewMode: MoViewMode;
        single?: boolean | undefined;
        onChange: any;
        index: any;
        deleteItem: any;
        level: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type ArrayValueFieldProps = typeof __propDef.props;
export type ArrayValueFieldEvents = typeof __propDef.events;
export type ArrayValueFieldSlots = typeof __propDef.slots;
export default class ArrayValueField extends SvelteComponent<ArrayValueFieldProps, ArrayValueFieldEvents, ArrayValueFieldSlots> {
}
export {};
