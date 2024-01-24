<script>import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { onMount } from "svelte";
import { MoListModel } from "../../../models/generic/MoList.model";
import { MoMeta, moMetaMeta } from "../../../models/generic/MoMeta";
import MosGrid from "../mosGrid/MosGrid.svelte";
import { goto } from "$app/navigation";
export let mos = [];
export let moMeta;
let displayName = moMeta?.getDisplayName();
let modelReady;
const moListModel = new MoListModel(moMetaMeta);
moListModel.mos = mos;
const createMo = () => {
  goto(`/mo/${moMeta.name}/create`);
};
onMount(() => {
  displayName = moMeta?.getDisplayName();
  console.log(`==>Mos.svelte:20 `, displayName);
  modelReady(moListModel);
});
</script>

<svelte:head>
  <title>displayName</title>
  <meta name='description' content={displayName}/>
</svelte:head>
<div class="grid-top">
  {#if moMeta.canCreate}
    <button on:click={createMo}>Create {displayName}</button>
  {/if}
</div>
<MosGrid bind:modelReady/>

<style>.grid-top {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.2rem;
}
.grid-top button {
  height: 2.8rem;
  padding: 0 1rem;
}</style>

