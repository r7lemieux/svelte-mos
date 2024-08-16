<script>import { toDisplayString } from "../../../services/common/util/string.utils.js";
import { page } from "$app/stores";
import { extractViewMode } from "../../../services/common/util/dom.utils.js";
import SimpleMo from "./SimpleMo.svelte";
import { MoDef } from "../../index.js";
import MoMeta from "../../app/mo/moMetaMo/MoMetaMo.svelte";
export let mo;
let viewMode = extractViewMode($page);
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
<style></style>