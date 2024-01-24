<script>import { toDisplayString } from "../../../services/common/util/string.utils";
import { page } from "$app/stores";
import { extractViewMode } from "../../../services/common/util/dom.utils";
import MOMeta from "../../app/meta/moMeta/MOMeta.svelte";
import SimpleMo from "./SimpleMo.svelte";
export let mo;
let viewMode = extractViewMode($page);
let moMeta = mo.moMeta;
const title = toDisplayString(moMeta.name);
</script>
<svelte:head>
  <title>{title}</title>
</svelte:head>
{#if moMeta.name === 'meta' }
  <MOMeta {mo} />
  {:else}
  <SimpleMo {mo} />
  {/if}
<style></style>