<script lang="ts">
  import type {Mo as MoClass} from '$lib/models/managedObjects/Mo'
  import {toDisplayString} from  '$lib/services/common/util/string.utils'
  import type {MoViewMode} from  '$lib/constants/ui'
  import {page} from '$app/stores'
  import {extractViewMode} from  '$lib/services/common/util/dom.utils'
  import MoDefinition from '$lib/components/app/mo/moDef/MoDef.svelte'
  import SimpleMo from  '$lib/components/generics/mo/SimpleMo.svelte'
  import { MoDef } from '$lib/components/index.js';

  export let mo: MoClass
  let viewMode: MoViewMode = extractViewMode($page)
  let moDef = mo.moDef
  const title = toDisplayString(moDef.name)

</script>
<svelte:head>
  <title>{title}</title>
</svelte:head>
{#if moDef.name === 'moDef' }
  <MoDef {mo} />
  {:else}
  <SimpleMo {mo} />
  {/if}
<style lang="sass">

</style>