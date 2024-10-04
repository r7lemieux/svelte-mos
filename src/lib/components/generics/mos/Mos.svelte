<script lang='ts'>
  import { afterUpdate, onMount  } from 'svelte';
  import 'ag-grid-community/styles/ag-grid.css'
  import 'ag-grid-community/styles/ag-theme-alpine.css'
  import {MoListModel} from '$lib/models/managedObjects/MoList.model.js'
  import MosGrid from  '$lib/components/generics/mosGrid/MosGrid.svelte'
  import type {Mo} from '$lib/models/managedObjects/Mo.js'
  import {goto} from '$app/navigation'
  import { MoMeta, type MoMetaInterface, moMetaMoMeta } from '$lib/models/index.js'


  export let mos: Mo[] = []
  export let moMeta: MoMetaInterface
  moMeta = moMeta || mos[0]?.moMeta
  if (moMeta && !mos) {
    moMeta.dataSource?.getMos()
      .then(allMos => {
				mos = allMos
			})
  }
  let displayName = moMeta?.moDef.getDisplayName()
  let modelReady: (model: MoListModel) => boolean
  // export class Mos extends SvelteComponentTyped<{propertyName: string;}> {
  const moListModel = new MoListModel(moMeta)
  moListModel.mos = mos

  const createMo = () => {
    goto(`/mo/${moMeta.name}/create`)
  }

  const f2 = (k, v) => (k && v) && (k = 'dataSource' || typeof v !== "number") ? "" + v : v
  let aaa = 'initial'
  let names = ''
  onMount(() => {
    aaa = 'onMount'
    displayName = moMeta.moDef?.getDisplayName()
    names = mos.map( m => `moMeta: ${m.name} moDef ${m.moDef?.name} dataSource ${m.dataSource?.name}`)
     modelReady(moListModel)
  })
  afterUpdate(() => {
    aaa = 'afterUpdate'
  })

</script>

<svelte:head>
  <title>Mos</title>
  <meta name='description' content={displayName}/>
</svelte:head>

<div class="grid-top">
  {#if moMeta?.moDef.canCreate}
    <button on:click={createMo}>Create {displayName}</button>
  {/if}
</div>

<div>Mos.svelte</div>
<div>{names}</div>
<!--<div>moListModel: {JSON.stringify(moListModel, null, 2)}</div>-->
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

