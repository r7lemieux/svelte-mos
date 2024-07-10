import { MoMeta, moMetaMeta } from '$lib/models/generic/MoDefinition';
import { contactMeta } from '$lib/models/common/Contact';
import { FieldDefinitionMo } from '$lib/services/common/validation/FieldDefinitionMo';
export const MoDefinitions = {
    moDef: moMetaMeta,
    contact: contactMeta
};
export const UiMoMetas = {};
for (const moMetaName of Object.keys(MoDefinitions)) {
    const moMeta = MoDefinitions[moMetaName];
    const uiMoMeta = new MoMeta(moMeta.name);
    Object.assign(uiMoMeta, moMeta);
    uiMoMeta.fieldDefs = new Map();
    for (const fieldDef of (Array.from(moMeta.fieldDefs.values()))) {
        const uiFieldDef = new FieldDefinitionMo(fieldDef);
        uiMoMeta.fieldDefs.set(fieldDef.name, uiFieldDef);
    }
    UiMoMetas[moMetaName] = uiMoMeta;
}
export const saveMetas = () => moMetaMeta.dataSource.saveMos(Object.values(MoDefinitions));
saveMetas();
// export const saveMetas = async (): Promise<Mo[]> => {
//   const mos = Object.values(MoMetas)
//   return moMetaMeta.dataSource.saveMos(mos)
// }
//# sourceMappingURL=MoMetas.js.map