import type { MoDefinitionInterface } from './MoDefinitionInterface.js';
export declare class Mo {
    moDef: MoDefinitionInterface;
    id: number | string | undefined;
    constructor(moDef: MoDefinitionInterface);
    setProps: (props: any) => Mo;
    toObj: () => any;
    toDocument: () => any;
    hydrate(partial: Partial<Mo>): void;
}
