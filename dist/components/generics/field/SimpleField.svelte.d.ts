import { SvelteComponent } from "svelte";
import type { MoViewMode } from '../../../constants/ui';
import type { FieldDefinition } from '../../../models/fields/FieldDefinition.js';
import './field.sass';
declare const __propDef: {
    props: {
        fieldDef: FieldDefinition<never>;
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
export type SimpleFieldProps = typeof __propDef.props;
export type SimpleFieldEvents = typeof __propDef.events;
export type SimpleFieldSlots = typeof __propDef.slots;
export default class SimpleField extends SvelteComponent<SimpleFieldProps, SimpleFieldEvents, SimpleFieldSlots> {
}
export {};
