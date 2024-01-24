import type { MoMetaInterface } from './MoMetaInterface';
export declare class Mo {
    moMeta: MoMetaInterface;
    id: number | string | undefined;
    constructor(moMeta: MoMetaInterface);
    setProps: (props: any) => Mo;
    toObj: () => any;
    toDocument: () => any;
    hydrate(partial: Partial<Mo>): void;
}
