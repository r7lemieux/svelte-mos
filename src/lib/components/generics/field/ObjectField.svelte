<script lang="ts">
  import type {MoViewMode} from  '$lib/constants/ui'
  import { afterUpdate, onMount } from 'svelte'
  import { setHeightToParent, sizeLabels } from '$lib/services/common/util/dom.utils'
  import type { FieldDefinition } from '$lib/models/index.js'
  import Field from './Field.svelte'

  // export let name
  export let fieldDef: FieldDefinition<never>
  export let value: any
  export let level
  export let viewMode: MoViewMode
  const fd = fieldDef

  $: disabled = viewMode === 'view'
  const size = value? Object.keys(value).length : 0
  const ui = {}
  export let onChange
  let changed = event => {
    const fieldId = event.srcElement.id
    const value = event.srcElement.value
    onChange(fieldId, value)
  }
  let showDetails = false

  const displayName = value?
		((value.getDisplayName)? value.getDisplayName():null || value.name || value.constructor.name):
		null
  const toogle = () => {
    showDetails = !showDetails
    sizeLabels()
  }
  const deleteItem = (key) => {
    delete value[key]
  }

  afterUpdate(() => {
    sizeLabels()
    setHeightToParent('.tree-line')
  })

  const getParentHeight = (ele: Element) => ele.parentElement.offsetHeight
  const getParentHeight1 = (e) => {
    console.log(`==>ObjectField.svelte:45 e`, e)
    return 15
  }
  const seTreeLineHeight = (ele: Element) => ele.parentElement.offsetHeight

  const keys = value?
		(Object.keys(value).filter(k => typeof value[k] !== 'function')):
		[]
</script>

<div class="field ObjectField">
<!--  <label for={name}>{name}</label>-->
  <label for={fd.name}>{fd.displayName}</label>
  <span class="tree-line {showDetails?'open':'closed'}" on:click={toogle} on:keypress={toogle}>
  </span>
  <span class="value">
      <span class="count" on:click={toogle} on:keypress={toogle}>
        <span>{size}</span>
          <span class="detail-icon detail-arrow {showDetails?'open':'closed'}"></span>
      </span>
      <span class="name">{displayName}</span>
  </span>
</div>
{#if showDetails}
  {#each keys.sort() as key}
    <!--<div>fieldDef {fieldDef.name}:  {value}</div>
-->
    <!--
    <Field {fieldDef} {value} {viewMode} {onChange} level={level + 1 } />
    -->
      <div class="field ObjectField-Details" style="margin-left:{(level+1)*12}px;">

      <label for="{key}">{key}</label>
      <span class="tree-line"></span>
      <span class="value">{value[key]?.toString()}</span>
    </div>
  {/each}
{/if}

<style lang="sass">
  @use 'field'
  .ObjectField
    label
      align-self: center
    .value
      .name
        position: relative
        bottom: -0.1rem
  .ObjectField-Details
    label
      align-self: start
</style>