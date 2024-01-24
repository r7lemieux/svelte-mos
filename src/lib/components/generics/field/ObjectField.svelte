<script lang="ts">
  import type {MoViewMode} from  '$lib/constants/ui'
  import {afterUpdate} from 'svelte'
  import {sizeLabels} from  '$lib/services/common/util/dom.utils'

  // export let name
  export let value: any
  export let level
  export let viewMode: MoViewMode

  $: disabled = viewMode === 'view'
  const size = Object.keys(value).length
  const ui = {}
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
  const deleteItem = (key) => {
    delete value[key]
  }

  afterUpdate(sizeLabels)

</script>
<!--<div class="field">-->
<!--  <label for={name}>{name}</label>-->
<!--  <span class="tree-line {showDetails?'open':'closed'}" on:click={toogle} on:keypress={toogle}>-->
<!--  </span>-->
<!--  <span class="value">-->
<!--      <span class="count" on:click={toogle} on:keypress={toogle}>-->
<!--        <span>{size}</span>-->
<!--          <span class="detail-icon detail-arrow {showDetails?'open':'closed'}">-->
<!--        </span>-->
<!--      </span>-->
<!--  </span>-->
<!--</div>-->
<!--{#if showDetails}-->
  {#each Object.keys(value).sort() as key}
    <div class="field">
      <label for="{key}">{key}</label>
      <span class="tree-line"></span>
      <span class="value">{value[key]?.toString()}</span>
    </div>
  {/each}
<!--{/if}-->
<style lang="sass">
  @use 'field'
</style>