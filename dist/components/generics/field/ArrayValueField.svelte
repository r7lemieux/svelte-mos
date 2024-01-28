<script>export let fieldDef;
export let value;
export let viewMode;
export let single = false;
$:
  disabled = viewMode === "view";
const fd = fieldDef;
const fname = fieldDef.name;
export let onChange;
export let index;
export let deleteItem;
export let level;
const del = () => deleteItem(index);
let changed = (event) => {
  const val = event.srcElement.value;
  onChange(index, val);
};
let added = (event) => {
  const val = event.srcElement.value;
  onChange(index, val);
  event.srcElement.value = "";
};
</script>
<div class="field" style="margin-left:{level*12}px;">
  <label for={fname}></label>
  <span class=" tree-line"></span>
  <span class="value">
     {#if index >= 0}
<!--        <span class="array-value">-->
        <input class="array-item" type={fd.inputType} name={fname}
               id={index} value={value} on:change={changed} {disabled}/>
        <span class="delete-x" on:click={del} on:keypress={del}
              style="display:{viewMode==='view'?'none':'inline'}">X</span>
<!--        </span>-->
     {:else if viewMode !== 'view' }
    {value} <input class="array-item {!single?'single':''}" type={fd.inputType} name={fname} id="-2"
            value={value} on:change={added} {disabled}/>
    {/if}
    </span>
</div>
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
}

.field {
  display: flex;
}</style>