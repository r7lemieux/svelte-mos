<script lang="ts">
  import {MoListModel} from '$lib/models/managedObjects/MoList.model.js'
  import { moDefDef } from '$lib/models/managedObjects/MoDefinition'
  import Mos from  '$lib/components/generics/mos/Mos.svelte'
  import type {Mo} from '$lib/models/managedObjects/Mo.js'
  import { moDefMoMeta } from '$lib/models/index.js'
  export let mos
  let modelReady: (model: MoListModel) => boolean
  const moListModel = new MoListModel(moDefMoMeta)
  const moMeta = moDefMoMeta
  console.log(`==>MoDefs.svelte:11 mos`, mos)
</script>
<svelte:head>
  <title>Mo Definitions</title>
  <meta name="description" content="Mo Definitons"/>
</svelte:head>

<Mos {moMeta} {mos} />

