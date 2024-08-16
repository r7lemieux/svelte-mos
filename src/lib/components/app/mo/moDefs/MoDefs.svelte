<script lang="ts">
  import {MoListModel} from '$lib/models/managedObjects/MoList.model.js'
  import { moDefDef } from '$lib/models/managedObjects/MoDefinition'
  import Mos from  '$lib/components/generics/mos/Mos.svelte'
  import type {Mo} from '$lib/models/managedObjects/Mo.js'
  import { moDefMoMeta } from '$lib/models/index.js'
  export let mos
  const moDef = moDefDef
  // const mos = data.mos
  let modelReady: (model: MoListModel) => boolean
  const moListModel = new MoListModel(moDefMoMeta)
  // onMount(() => {
  //   modelReady(moListModel)
  // })
</script>
<svelte:head>
  <title>Mo Definitions</title>
  <meta name="description" content="Mo Definitons"/>
</svelte:head>

<Mos {moDef} {mos} />

