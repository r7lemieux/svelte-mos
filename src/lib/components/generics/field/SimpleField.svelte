<script lang="ts">
  import type {MoViewMode} from  '$lib/constants/ui'
  import type {FieldDefinition} from '$lib/models/fields/FieldDefinition.js'
  import './field.sass'
  import { afterUpdate, onMount } from 'svelte'
  export let fieldDef: FieldDefinition<never>
  export let value
  export let level
  export let viewMode: MoViewMode
  $: disabled = viewMode === 'view'
  const fd = fieldDef
  const fname = fieldDef.name
  export let onChange

  let changed = event => {
    const fieldId = event.srcElement.id
    const value = event.srcElement.value
    onChange(fieldId, value)
  }
  let height
  onMount(() => {
    const ele = document.querySelector('.field')
    height = ele.offsetHeight
  })
</script>
<div class="field SimpleField" style="margin-left:{level*12}px;">
  <label for={fname}>{fd.getDisplayName()} </label>
  <span class=" tree-line"></span>
  <span class="value simple-value">
    <input type={fd.inputType} name={fd.name} id="{fd.name}" value={fd.valueToString(value) || ''} on:change={changed}
           {disabled}/>
    </span>
</div>
<style lang="sass">
  @use 'field'
</style>