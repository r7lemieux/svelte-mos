import { SvelteComponent } from "svelte";
import type { MoViewMode } from '../../../constants/ui';
import type { FieldDefinition } from '../../../models/fields/FieldDefinition';
declare const __propDef: {
    props: {
        fieldDef: FieldDefinition<never>;
        value: any;
        valueType: any;
        viewMode: MoViewMode;
        onChange: any;
        key: any;
        deleteItem: any;
        level: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type MapValueFieldProps = typeof __propDef.props;
export type MapValueFieldEvents = typeof __propDef.events;
export type MapValueFieldSlots = typeof __propDef.slots;
export default class MapValueField extends SvelteComponent<MapValueFieldProps, MapValueFieldEvents, MapValueFieldSlots> {
}
export {};
