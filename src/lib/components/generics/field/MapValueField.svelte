<script lang="ts">
  import type {MoViewMode} from  '$lib/constants/ui'
  import type {FieldDefinition} from '$lib/models/fields/FieldDefinition.js'
  import Icon from 'svelte-icons-pack/Icon.svelte'
  import AiOutlineCaretDown from 'svelte-icons-pack/ai/AiOutlineCaretDown'
  import AiOutlineCaretRight from 'svelte-icons-pack/ai/AiOutlineCaretRight'
  import MO from  '$lib/components/generics/mo/MO.svelte'
  import ObjectField from  '$lib/components/generics/field/ObjectField.svelte'
  import { onMount } from 'svelte'

  export let fieldDef: FieldDefinition<never>
  export let value
  export let valueType
  export let viewMode: MoViewMode
  $: disabled = viewMode === 'view'
  const fd = fieldDef
  const fname = fieldDef.name
  export let onChange
  export let key
  export let deleteItem
  export let level
  let showDetails = false
  let toogle = () => showDetails = !showDetails

  const del = () => deleteItem(key)
  let changed = (event) => {
    const val = event.srcElement.value
    onChange(key, val)
  }
  let added = (event) => {
    const val = event.srcElement.value
    onChange(key, val)
    event.srcElement.value = ''
  }
  let height
  onMount(() => {
    const ele = document.querySelector('.field')
    console.log(`==>SimpleField.svelte:21 ele `, ele)
    height = ele.offsetHeight
    console.log(`==>SimpleField.svelte:21  height `, height)
  })
</script>
<div class="field MapValueField" style="margin-left:{level*12}px;">
  <label for={fname}>{key} {height}</label>
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
<style lang="sass">
  @use 'field'
  .count
    width: field.$detail-margin + 15px

</style>