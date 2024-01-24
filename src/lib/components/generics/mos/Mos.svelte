<script lang='ts'>
  import type { SvelteComponentTyped } from "svelte";
  import 'ag-grid-community/styles/ag-grid.css'
  import 'ag-grid-community/styles/ag-theme-alpine.css'
  import {onMount} from 'svelte'
  import {MoListModel} from  '$lib/models/generic/MoList.model'
  import {MoMeta, moMetaMeta} from  '$lib/models/generic/MoMeta'
  import MosGrid from  '$lib/components/generics/mosGrid/MosGrid.svelte'
  import type {Mo} from  '$lib/models/generic/Mo'
  import {goto} from '$app/navigation'


  export let mos: Mo[] = []
  export let moMeta: MoMeta
  let displayName = moMeta?.getDisplayName()
  let modelReady: (model: MoListModel) => boolean
  // export class Mos extends SvelteComponentTyped<{propertyName: string;}> {
  const moListModel = new MoListModel(moMetaMeta)
  moListModel.mos = mos

  const createMo = () => {
    goto(`/mo/${moMeta.name}/create`)
  }
  onMount(() => {
    displayName = moMeta?.getDisplayName()
    console.log(`==>Mos.svelte:20 `, displayName)
    modelReady(moListModel)
  })
</script>

<svelte:head>
  <title>displayName</title>
  <meta name='description' content={displayName}/>
</svelte:head>
<div class="grid-top">
  {#if moMeta.canCreate}
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

