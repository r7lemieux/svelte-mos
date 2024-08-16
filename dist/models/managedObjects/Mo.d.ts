import type { MoMetaInterface } from './MoMetaInterface';
import type { MoInterface } from '../index.js';
export declare class Mo implements MoInterface {
    moMeta: MoMetaInterface;
    id?: number | string;
    constructor(moMeta?: MoMetaInterface);
    getDisplayName: () => string | number | undefined;
    setProps: (props: any) => Mo;
    toObj: () => any;
    toDocument: () => any;
    hydrate(partial: Partial<Mo>): void;
}
