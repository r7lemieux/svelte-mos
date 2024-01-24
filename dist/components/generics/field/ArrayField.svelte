<script>import AiOutlineCaretDown from "svelte-icons-pack/ai/AiOutlineCaretDown";
import AiOutlineCaretRight from "svelte-icons-pack/ai/AiOutlineCaretRight";
import Icon from "svelte-icons-pack/Icon.svelte";
import ArrayValueField from "./ArrayValueField.svelte";
export let fieldDef;
export let value;
export let viewMode;
$:
  disabled = viewMode === "view";
const fd = fieldDef;
const fname = fieldDef.name;
export let onChange;
export let level;
let newItem = "";
const changed = (fieldId, item) => {
  const index = Number.parseInt(fieldId);
  if (index === -2) {
    value.push(item);
  } else {
    value[index] = item;
  }
  value = [...value];
  onChange(fieldDef.name, value);
  newItem = "";
};
const size = value?.length;
let showDetails = false;
const toogle = () => showDetails = !showDetails;
const deleteItem = (i) => {
  value = value.filter((item, index) => index != i);
  console.log(`==>Mo.svelte:65 mo[fname]`, value);
  onChange(fieldDef.name, value);
};
</script>
<div class="field" style="margin-left:{level*12}px;">
  <label for={fname}>{fd.getDisplayName()}</label>
  <span class=" tree-line {showDetails?'open':'closed'}"></span>
  <span class="value">
    <span class="count" on:click={toogle} on:keypress={toogle}>
      <span>{size}</span>
      <span class="detail-icon detail-arrow {showDetails?'open':'closed'}">
<!--      <Icon src={showDetails?AiOutlineCaretDown:AiOutlineCaretRight}/>-->
      </span>
    </span>
  </span>
</div>
{#if showDetails}
  {#each (value || []) as item, index}
    <ArrayValueField {fieldDef} value={item} {index} {viewMode} single={!size} level={level + 1} onChange={changed} {deleteItem}/>
  {/each}
  <ArrayValueField {fieldDef} value={newItem} index={-2} {viewMode} single={!size} level={level + 1} onChange="{changed}" {deleteItem}/>
{/if}
<style>@charset "UTF-8";
.field {
  display: flex;
  align-items: start;
  gap: 5px;
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