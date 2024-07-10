<script>import MapValueField from "./MapValueField.svelte";
import { afterUpdate } from "svelte";
import { sizeLabels } from "../../../services/common/util/dom.utils";
export let fieldDef;
export let value;
export let level;
export let viewMode;
$:
  disabled = viewMode === "view";
const fd = fieldDef;
const fname = fieldDef.name;
const size = Array.from(value.keys()).length;
const ui = {};
const valueType = fieldDef.mapValueType;
export let onChange;
let changed = (event) => {
  const fieldId = event.srcElement.id;
  const value2 = event.srcElement.value;
  onChange(fieldId, value2);
};
let showDetails = false;
const toogle = () => {
  showDetails = !showDetails;
  sizeLabels();
};
const deleteItem = (i) => {
  value = value.filter((item, index) => index != i);
};
afterUpdate(sizeLabels);
</script>
<div class="field">
  <label for={fname}>{fd.getDisplayName()}</label>
  <span class=" tree-line {showDetails?'open':'closed'}" on:click={toogle} on:keypress={toogle} role="button" tabindex="0">
<!--    <span class="top tree-line1"/>-->
<!--    <span class="arrow {showDetails?'open':'closed'}"/>-->
<!--    <span class="bot {showDetails?'open tree-line':'closed'}"/>-->
  </span>
  <span class="value">
      <span class="count" on:click={toogle} on:keypress={toogle} role="button" tabindex="0">
        <span>{size}</span>
          <span class="detail-icon detail-arrow {showDetails?'open':'closed'}">
        </span>
      </span>
  </span>
</div>
{#if showDetails}
  {#each Array.from(value.keys()) as key, i}
    <MapValueField {fieldDef} value={value.get(key)} {valueType} {key} {viewMode} level={level + 1} onChange={changed} {deleteItem}/>
  {/each}
{/if}
<!--        <span class="map-value">-->
<!--          <input class="array-item" name={fd.name + '.' + key} value={key} disabled/>-->
<!--        <span class="map-detail-icon">-->
<!--          <Icon src={ui[fname+showDetails]?AiOutlineCaretDown:AiOutlineCaretRight}/>-->
<!--        </span>-->
<!--        </span>-->
<style >@charset "UTF-8";
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