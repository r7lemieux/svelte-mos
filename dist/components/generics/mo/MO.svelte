<script>import { toDisplayString } from "../../../services/common/util/string.utils";
import { page } from "$app/stores";
import { extractViewMode } from "../../../services/common/util/dom.utils";
import MoDefinition from "../../app/mo/moDef/MoDef.svelte";
import SimpleMo from "./SimpleMo.svelte";
import { MoDef } from "../../index.js";
export let mo;
let viewMode = extractViewMode($page);
let moDef = mo.moDef;
const title = toDisplayString(moDef.name);
</script>
<svelte:head>
  <title>{title}</title>
</svelte:head>
{#if moDef.name === 'moDef' }
  <MoDef {mo} />
  {:else}
  <SimpleMo {mo} />
  {/if}
<style></style>