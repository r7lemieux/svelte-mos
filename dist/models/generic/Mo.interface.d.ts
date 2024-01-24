import type { MoMetaInterface } from './MoMetaInterface';
export interface MoInterface {
    moMeta: MoMetaInterface;
    id: number | string | undefined;
    setProps: (props: any) => MoInterface;
    toObj: () => any;
    hydrate(partial: Partial<MoInterface>): void;
}
