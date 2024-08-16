<script lang="ts">
  import type { MoViewMode } from '$lib/constants/ui.js'
  import type { FieldDefinition } from '$lib/models/fields/FieldDefinition.js'

  export let fieldDef: FieldDefinition<never>
  export let value
  export let viewMode: MoViewMode
  export let single = false
  $: disabled = viewMode === 'view'
  const fd = fieldDef
  const fname = fieldDef.name
  export let onChange
  export let index
  export let deleteItem
  export let level
  const del = () => deleteItem(index)
  let changed = (event) => {
    const val = event.srcElement.value
    onChange(index, val)
  }
  let added = (event) => {
    const val = event.srcElement.value
    onChange(index, val)
    event.srcElement.value = ''
  }
</script>
<div class="field" style="margin-left:{level*12}px;">
  <label for={fname}></label>
  <span class="tree-line" />
  <!--{showDetails?'open':'closed'}"></span>-->
  <span class="value">
     {#if index >= 0}
<!--        <span class="array-value">-->
        <input class="array-item" type={fd.inputType} name={fname}
               id={index} value={value} on:change={changed} {disabled}/>
        <span class="delete-x" on:click={del} on:keypress={del} role="button" tabindex="0"
              style="display:{viewMode==='view'?'none':'inline'}">X</span>
<!--        </span>-->
     {:else if viewMode !== 'view' }
    {value} <input class="array-item {!single?'single':''}" type={fd.inputType} name={fname} id="-2"
            value={value} on:change={added} {disabled}/>
    {/if}
    </span>
</div>
<style lang="sass">
  @use 'field'
  .field
    display: flex
</style>