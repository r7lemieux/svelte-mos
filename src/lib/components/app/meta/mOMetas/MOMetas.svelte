<script lang="ts">
  import {MoListModel} from  '$lib/models/generic/MoList.model.js'
  import {moMetaMeta} from  '$lib/models/generic/MoMeta'
  import Mos from  '$lib/components/generics/mos/Mos.svelte'
  import type {Mo} from  '$lib/models/generic/Mo'
  export let mos
  const moMeta = moMetaMeta
  // const mos = data.mos
  let modelReady: (model: MoListModel) => boolean
  const moListModel = new MoListModel(moMetaMeta)
  // onMount(() => {
  //   modelReady(moListModel)
  // })
</script>
<svelte:head>
  <title>Meta</title>
  <meta name="description" content="Meta"/>
</svelte:head>

<Mos {moMeta}{mos} />

