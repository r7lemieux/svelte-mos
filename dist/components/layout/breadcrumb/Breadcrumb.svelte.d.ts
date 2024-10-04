import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        nodes?: {
            id: any;
            name: string;
        }[];
        nodeSelected: (id: number) => Promise<boolean>;
        addChild?: (id: number, name: string, replace?: boolean) => void;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {};
};
export type BreadcrumbProps = typeof __propDef.props;
export type BreadcrumbEvents = typeof __propDef.events;
export type BreadcrumbSlots = typeof __propDef.slots;
export default class Breadcrumb extends SvelteComponent<BreadcrumbProps, BreadcrumbEvents, BreadcrumbSlots> {
    get addChild(): (id: number, name: string, replace?: boolean) => void;
}
export {};
