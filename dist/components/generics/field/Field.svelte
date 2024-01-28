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
export let branch = false;
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
    <ObjectField name={fd.name} {value} {viewMode} {level} {onChange}/>
  {:else}
    <SimpleField {fieldDef} {value} {viewMode} {level} {onChange}/>
  {/if}

<style>@charset "UTF-8";
.field {
  display: flex;
  align-items: start;
}
.field .tree-line {
  border-left: 2px solid #88A;
  display: block;
  height: 2.5rem;
  width: 5px;
}
.field .tree-line.tree-line.open {
  border-bottom: 2px solid #88A;
  width: 9px;
  position: relative;
  left: 1px;
}
.field .tree-branch {
  border-bottom: 2px solid #88A;
  width: 12px;
  position: relative;
  left: 2px;
}
.field label {
  flex: 120px 1 0;
  display: flex;
  margin: 0 5px 7px 0;
  justify-content: flex-end;
  width: 120px;
  color: #244;
  align-self: center;
  text-wrap: avoid;
}
.field .value {
  flex: 200px 4 2;
}
.field input {
  height: 2rem;
  border: none;
  border-bottom: 1px solid #E1E2FF;
  padding: 0 0.5rem;
  width: 100%;
}
.field input[disabled] {
  background: transparent;
}
.field .delete-x {
  color: #822;
  font-weight: bold;
  margin: 0 -30px;
  position: relative;
  right: -15px;
}
.field .count {
  display: inline-flex;
  justify-content: flex-end;
  align-items: center;
  height: 2rem;
  align-self: center;
  width: 35px;
  font-family: "Courier 10 Pitch";
  font-size: smaller;
  color: #883;
}
.field .count .detail-arrow::after {
  display: inline-block;
  content: "▷";
  font-weight: bold;
  font-size: x-large;
  color: #88A;
  align-self: center;
  margin: 0 0 4px 5px;
}
.field .count .detail-arrow.open::after {
  margin-bottom: 0;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}
.field .count .empty-value {
  height: 2rem;
  margin: 0 0 6px 0;
  display: block;
}
.field .detail-icon {
  position: relative;
  top: 2px;
}
.field input.array-item {
  height: 2rem;
  width: 100%;
}
.field .array-value {
  border: 1px solid #DDE;
  margin: 0 0 0 0;
  padding: 0;
  width: 100%;
}
.field .array-value.single {
  margin: 1px 0 0 0;
}
.field .array-value input {
  border: none;
}
.field .map-detail-icon {
  position: relative;
  top: 4px;
  right: -8px;
  margin: 0 -30px;
}</style>