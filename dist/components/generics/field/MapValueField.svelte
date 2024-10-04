<script>import { AiOutlineCaretDown } from "svelte-icons-pack/ai";
import { AiOutlineCaretRight } from "svelte-icons-pack/ai";
import MO from "../mo/MO.svelte";
import ObjectField from "./ObjectField.svelte";
import { onMount } from "svelte";
export let fieldDef;
export let value;
export let valueType;
export let viewMode;
$: disabled = viewMode === "view";
const fd = fieldDef;
const fname = fieldDef.name;
export let onChange;
export let key;
export let deleteItem;
export let level;
let showDetails = false;
let toogle = () => showDetails = !showDetails;
const del = () => deleteItem(key);
let changed = (event) => {
  const val = event.srcElement.value;
  onChange(key, val);
};
let added = (event) => {
  const val = event.srcElement.value;
  onChange(key, val);
  event.srcElement.value = "";
};
let height;
onMount(() => {
  const ele = document.querySelector(".field");
  console.log(`==>SimpleField.svelte:21 ele `, ele);
  height = ele.offsetHeight;
  console.log(`==>SimpleField.svelte:21  height `, height);
});
</script>
<div class="field MapValueField" style="margin-left:{level*12}px;">
  <label for={fname}>{key}</label>
  <span class="tree-line" style="height: calc({height}px"></span>

  <span class="value">
    {#if valueType === 'mo'}
      <span class="count" on:click={toogle} on:keypress={toogle} role="button" tabindex="0">
        <span class="detail-icon detail-arrow {showDetails?'open':'closed'}"> </span>
      </span>
    {:else if valueType === 'object'}
      <span class="count" on:click={toogle} on:keypress={toogle} role="button" tabindex="0">
        <span class="detail-icon detail-arrow {showDetails?'open':'closed'}"> </span>
      </span>
    {:else}
        <input class="array-item" type={fd.inputType} name={fname}
               id={key} value={value} on:change={changed} {disabled}/>
        <span class="delete-x" on:click={del} on:keypress={del} role="button" tabindex="0"
              style="display:{viewMode==='view'?'none':'inline'}">X</span>
    {/if}
  </span>
</div>
{#if valueType === 'mo' && showDetails}
  <MO mo={value} />
{:else if valueType === 'object' && showDetails}
  <ObjectField {value} {level} {viewMode} {onChange} />
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
.field .tree-line.open {
  border-bottom: 2px solid #88A;
  width: 10px;
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
  margin: 0 8px 7px 0;
  justify-content: flex-end;
  width: 120px;
  color: #244;
  align-self: center;
  text-wrap: balance;
}
.field .value {
  flex: 200px 4 2;
  margin-left: 3px;
}
.field input {
  height: 2rem;
  border: none;
  border-bottom: 1px solid #E1E2FF;
  padding: 0 0.3rem;
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
  margin: 0 0.5rem 0 0.4rem;
  width: 35px;
  font-family: "Courier 10 Pitch", serif;
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
  transform: rotate(90deg);
}
@supports (-webkit-transform: rotate(90deg)) {
  .field .count .detail-arrow.open::after {
    -webkit-transform: rotate(90deg);
  }
}
.field .count .empty-value {
  height: 2rem;
  margin: 0 0 6px 0;
  display: block;
}
.field .detail-icon {
  position: relative;
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
}

.count {
  width: 50px;
}</style>