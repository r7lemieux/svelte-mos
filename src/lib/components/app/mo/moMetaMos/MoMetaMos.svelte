<script lang="ts">
  import { MoListModel } from '$lib/models/managedObjects/MoList.model.js'
  import Mos from '$lib/components/generics/mos/Mos.svelte'
  import { moMetaMoMeta } from '$lib/models/managedObjects/MoMetaMo.js'

  export let mos
  const moMeta = moMetaMoMeta
  // const mos = data.mos
  console.log(`==>MoMetaMos.svelte:10 mos`, mos?.length);
  let modelReady: (model: MoListModel) => boolean
</script>
<svelte:head>
  <title>Mo Metas</title>
  <meta name="description" content="Mo Metas"/>
</svelte:head>

<div>components/app/mo/mo/MoMetaMos.svelte </div>
<div>mos[{mos?.length}]: {mos?.map(m => ' ' + m.name )}</div>
<Mos {moMeta} {mos}  />