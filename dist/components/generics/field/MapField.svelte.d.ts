import { SvelteComponent } from "svelte";
import type { MoViewMode } from '../../../constants/ui';
import type { FieldDefinition } from '../../../models/fields/FieldDefinition';
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
export type MapFieldProps = typeof __propDef.props;
export type MapFieldEvents = typeof __propDef.events;
export type MapFieldSlots = typeof __propDef.slots;
export default class MapField extends SvelteComponent<MapFieldProps, MapFieldEvents, MapFieldSlots> {
}
export {};
