<script>import { page } from "$app/stores";
import SimpleField from "./SimpleField.svelte";
import ArrayField from "./ArrayField.svelte";
import MapField from "./MapField.svelte";
import { afterUpdate } from "svelte";
import { sizeLabels } from "../../../services/common/util/dom.utils";
import ObjectField from "./ObjectField.svelte";
export let fieldDef;
export let value;
export let viewMode = extractViewMode();
export let level = 1;
export let onChange;
$:
  disabled = viewMode === "view";
const fd = fieldDef;
function extractViewMode() {
  const pathParts = $page.url.pathname.split("/");
  const pathTail = pathParts[pathParts.length - 1];
  if (pathTail === "edit")
    return "edit";
  if (pathTail === "create")
    return "create";
  return "view";
}
afterUpdate(sizeLabels);
</script>

  {#if fd.type === 'array'}
    <ArrayField  {fieldDef} {value} {viewMode} {level} {onChange}/>
  {:else if fd.type === 'map'}
    <MapField    {fieldDef} {value} {viewMode} {level} {onChange}/>
  {:else if fd.type === 'object'}
    <ObjectField {fieldDef} {value} {viewMode} {level} {onChange}/>
  {:else}
    <SimpleField {fieldDef} {value} {viewMode} {level} {onChange}/>
  {/if}

<style></style>