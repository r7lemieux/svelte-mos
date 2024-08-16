<script lang="ts">
  import type { Mo as MoClass } from '$lib/models/managedObjects/Mo.js'
  import { toDisplayString } from '$lib/services/common/util/string.utils.js'
  import type { MoViewMode } from '$lib/constants/ui.js'
  import { page } from '$app/stores';
  import { extractViewMode } from '$lib/services/common/util/dom.utils.js'
  import SimpleMo from '$lib/components/generics/mo/SimpleMo.svelte'
  import { MoDef } from '$lib/components/index.js'
	import MoMeta from '$lib/components/app/mo/moMetaMo/MoMetaMo.svelte'

  export let mo: MoClass;
	let viewMode: MoViewMode = extractViewMode($page);
	let moDef = mo.moMeta.moDef;
	const title = toDisplayString(moDef.name);

</script>
<svelte:head>
	<title>{title}</title>
</svelte:head>
{#if moDef.name === 'moDef' }
	<MoDef {mo} />
{:else if moDef.name === 'moMeta' }
	<MoMeta {mo} />
{:else}
	<SimpleMo {mo} />
{/if}
<style lang="sass">

</style>