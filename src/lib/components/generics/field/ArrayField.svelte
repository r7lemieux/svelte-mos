<script lang="ts">
  import type {MoViewMode} from  '$lib/constants/ui'
  import type {FieldDefinition} from '$lib/models/fields/FieldDefinition'
  import AiOutlineCaretDown from 'svelte-icons-pack/ai/AiOutlineCaretDown'
  import AiOutlineCaretRight from 'svelte-icons-pack/ai/AiOutlineCaretRight'
  import Icon from 'svelte-icons-pack/Icon.svelte'
  import ArrayValueField from  '$lib/components/generics/field/ArrayValueField.svelte'

  export let fieldDef: FieldDefinition<never>
  export let value
  export let viewMode: MoViewMode
  $: disabled = viewMode === 'view'
  const fd = fieldDef
  const fname = fieldDef.name
  export let onChange
  export let level
  let newItem = ''
  const changed = (fieldId, item) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const index = Number.parseInt(fieldId)
    if (index === -2) {
      value.push(item)
    } else {
      value[index] = item
    }
    value = [...value]
    onChange(fieldDef.name, value)
    newItem = ''
  }

  const size = value?.length

  let showDetails = false
  const toogle = () => showDetails = !showDetails
  const deleteItem = (i) => {
    value = value.filter((item, index) => index != i)
    onChange(fieldDef.name, value)
  }
</script>
<div class="field" style="margin-left:{level*12}px;">
  <label for={fname}>{fd.getDisplayName()}</label>
  <span class=" tree-line {showDetails?'open':'closed'}"></span>
  <span class="value">
    <span class="count" on:click={toogle} on:keypress={toogle} role="button" tabindex="0">
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
<style lang="sass">
  @use 'field'
</style>