<script>import { toDisplayString } from "../../../../services/common/util/string.utils.js";
import { goto } from "$app/navigation";
import { page } from "$app/stores";
import Field from "../../../generics/field/Field.svelte";
import { Rezult } from "../../../../services/common/message/rezult";
import { ErrorName } from "../../../../services/common/message/errorName";
import { extractViewMode } from "../../../../services/common/util/dom.utils.js";
import { MoMetaMo } from "../../../../models/managedObjects/MoMetaMo.js";
export let mo;
let viewMode = extractViewMode($page);
$:
  disabled = viewMode === "view";
let moMeta = mo;
const title = toDisplayString(moMeta.name);
const fieldDefs = Array.from(mo.moMeta.moDef.fieldDefs.values());
const ui = {};
const onChange = (fieldId, val) => {
  const fieldPathNames = fieldId.split(".");
  let targetObj = mo;
  if (fieldPathNames.length === 0)
    throw new Rezult(ErrorName.missing_param, {
      method: "Mo.svelte.onChange()",
      fieldId
    });
  let fname = fieldPathNames.pop();
  for (const pathName of fieldPathNames) {
    const pathval = Array.isArray(pathName) ? Number.parseInt(pathName) : pathName;
    targetObj = targetObj[pathval];
  }
  targetObj[fname] = val;
};
const edit = () => {
  viewMode = "edit";
  goto(`/mo/${moMeta.name}/${mo.id}/edit`);
};
const save = () => {
  moMeta.dataSource?.saveMo(mo).then((mo2) => {
    goto(`/mo/${moMeta.name}/${mo2.id}`);
  });
};
const create = (event) => {
  moMeta.dataSource?.addMo(mo).then((mo2) => {
    goto(`/mo/${moMeta.name}/${mo2.id}`);
  });
};
const deleteItem = (fname, i) => {
  mo[fname] = mo[fname].filter((item, index) => index != i);
};
</script>
<svelte:head>
  <title>{title}</title>
</svelte:head>
<div class="mo">
  <div class="fields">
    {#each fieldDefs as fieldDef}
      {@const fname=fieldDef.name}
      {@const value=mo[fieldDef.name]}
      <Field {fieldDef} {value} {viewMode} {onChange} level={0} />
    {/each}
  </div>
  <div class="button-bar">
    {#if viewMode === 'view' }
      <button on:click={edit}>Edit</button>
    {:else if viewMode === 'edit'}
      <button on:click={save}>Save</button>
    {:else if viewMode === 'create'}
      <button on:click={create}>Create</button>
    {/if}
  </div>
</div>
<style>.mo {
  max-width: 40rem;
  padding: 0 1rem 0 0;
}
.mo .fields {
  display: flex;
  flex-direction: column;
}

.button-bar {
  display: flex;
  margin: 1rem 0;
  justify-content: flex-end;
}
.button-bar button {
  height: 2rem;
}</style>