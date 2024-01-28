import type { MoDefinitionInterface } from './MoDefinitionInterface.js';
export interface MoInterface {
    moDef: MoDefinitionInterface;
    id: number | string | undefined;
    setProps: (props: any) => MoInterface;
    toObj: () => any;
    hydrate(partial: Partial<MoInterface>): void;
}
