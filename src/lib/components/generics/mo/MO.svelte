<script lang="ts">
  import type {Mo as MoClass} from  '$lib/models/generic/Mo'
  import {toDisplayString} from  '$lib/services/common/util/string.utils'
  import type {MoViewMode} from  '$lib/constants/ui'
  import {page} from '$app/stores'
  import {extractViewMode} from  '$lib/services/common/util/dom.utils'
  import MOMeta from  '$lib/components/app/meta/moMeta/MOMeta.svelte'
  import SimpleMo from  '$lib/components/generics/mo/SimpleMo.svelte'

  export let mo: MoClass
  let viewMode: MoViewMode = extractViewMode($page)
  let moMeta = mo.moMeta
  const title = toDisplayString(moMeta.name)

</script>
<svelte:head>
  <title>{title}</title>
</svelte:head>
{#if moMeta.name === 'meta' }
  <MOMeta {mo} />
  {:else}
  <SimpleMo {mo} />
  {/if}
<style lang="sass">

</style>