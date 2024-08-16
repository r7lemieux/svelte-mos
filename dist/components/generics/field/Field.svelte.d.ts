import { SvelteComponent } from "svelte";
import type { MoViewMode } from '../../../constants/ui';
import type { FieldDefinition } from '../../../models/fields/FieldDefinition.js';
declare const __propDef: {
    props: {
        fieldDef: FieldDefinition<never>;
        value: any;
        viewMode?: MoViewMode | undefined;
        level?: number | undefined;
        onChange: (fieldId: string, value: any) => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type FieldProps = typeof __propDef.props;
export type FieldEvents = typeof __propDef.events;
export type FieldSlots = typeof __propDef.slots;
export default class Field extends SvelteComponent<FieldProps, FieldEvents, FieldSlots> {
}
export {};
