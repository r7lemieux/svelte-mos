<script lang='ts'>
  import type { SvelteComponentTyped } from "svelte";
  import 'ag-grid-community/styles/ag-grid.css'
  import 'ag-grid-community/styles/ag-theme-alpine.css'
  import {onMount} from 'svelte'
  import {MoListModel} from '$lib/models/managedObjects/MoList.model'
  import {MoDefinition, moDefDef} from '$lib/models/managedObjects/MoDefinition.js'
  import MosGrid from  '$lib/components/generics/mosGrid/MosGrid.svelte'
  import type {Mo} from '$lib/models/managedObjects/Mo'
  import {goto} from '$app/navigation'


  export let mos: Mo[] = []
  export let moDef: MoDefinition
  let displayName = moDef?.getDisplayName()
  let modelReady: (model: MoListModel) => boolean
  // export class Mos extends SvelteComponentTyped<{propertyName: string;}> {
  const moListModel = new MoListModel(moDefDef)
  moListModel.mos = mos

  const createMo = () => {
    goto(`/mo/${moDef.name}/create`)
  }
  onMount(() => {
    displayName = moDef?.getDisplayName()
    modelReady(moListModel)
  })
</script>

<svelte:head>
  <title>displayName</title>
  <meta name='description' content={displayName}/>
</svelte:head>
<div class="grid-top">
  {#if moDef.canCreate}
    <button on:click={createMo}>Create {displayName}</button>
  {/if}
</div>
<MosGrid bind:modelReady/>

<style lang="sass">
  .grid-top
    display: flex
    justify-content: flex-end
    margin-bottom: 0.2rem

    button
      height: 2.8rem
      padding: 0 1rem
</style>

