<script lang="ts">
  import type {MoViewMode} from  '$lib/constants/ui'
  import type {FieldDefinition} from '$lib/models/fields/FieldDefinition'
  import MapValueField from  '$lib/components/generics/field/MapValueField.svelte'
  import {afterUpdate} from 'svelte'
  import {sizeLabels} from  '$lib/services/common/util/dom.utils'

  export let fieldDef: FieldDefinition<never>
  export let value
  export let level
  export let viewMode: MoViewMode

  $: disabled = viewMode === 'view'
  const fd = fieldDef
  const fname = fieldDef.name
  const size = (Array.from(value.keys())).length
  const ui = {}
  const valueType = fieldDef.mapValueType
  export let onChange
  let changed = event => {
    const fieldId = event.srcElement.id
    const value = event.srcElement.value
    onChange(fieldId, value)
  }
  let showDetails = false
  const toogle = () => {
    showDetails = !showDetails
    sizeLabels()
  }
  const deleteItem = (i) => {
    value = value.filter((item, index) => index != i)
  }

  afterUpdate(sizeLabels)

</script>
<div class="field">
  <label for={fname}>{fd.getDisplayName()}</label>
  <span class=" tree-line {showDetails?'open':'closed'}" on:click={toogle} on:keypress={toogle}>
<!--    <span class="top tree-line1"/>-->
<!--    <span class="arrow {showDetails?'open':'closed'}"/>-->
<!--    <span class="bot {showDetails?'open tree-line':'closed'}"/>-->
  </span>
  <span class="value">
      <span class="count" on:click={toogle} on:keypress={toogle}>
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
<style lang="sass">
  @use 'field'
//.tree-line.open
  //border-bottom: 2px solid field.$tree-line-color
  //width: 9px
  //position: relative
  //left: 1px
//.tree-indicator
//  &.tree-line.open
//    height: 13px
//
//  .top.open
//    border-bottom: 2px solid field.$tree-line-color
//    position: relative
//    top: -9.7px
//    left: 1px
//
//  .arrow
//    color: field.$tree-line-color
//    display: block
//
//    &.closed::after
//      content: '\25B7'
//      font-size: x-large
//      font-weight: bold
//      display: block
//      left: -2px
//      position: relative
//
//    &.open::after
//      display: inline-block
//      content: '\25B7'
//      font-weight: bold
//      font-size: x-large
//      color: #88A
//      bottom: -7px
//      left: 1px
//      position: relative
//      display: inline-block
//      -webkit-transform: rotate(90deg)
//      transform: rotate(90deg)
//
//  .bot.open
//    display: block
//    position: relative
//    height: 10px
//    left: 7.4px
</style>