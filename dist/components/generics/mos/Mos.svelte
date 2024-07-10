<script>import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { onMount } from "svelte";
import { MoListModel } from "../../../models/managedObjects/MoList.model";
import { MoDefinition, moDefDef } from "../../../models/managedObjects/MoDefinition.js";
import MosGrid from "../mosGrid/MosGrid.svelte";
import { goto } from "$app/navigation";
export let mos = [];
export let moDef;
let displayName = moDef?.getDisplayName();
let modelReady;
const moListModel = new MoListModel(moDefDef);
moListModel.mos = mos;
const createMo = () => {
  goto(`/mo/${moDef.name}/create`);
};
onMount(() => {
  displayName = moDef?.getDisplayName();
  modelReady(moListModel);
});
</script>

<svelte:head>
  <title>displayName</title>
  <meta name='description' content={displayName}/>
</svelte:head>
<div class="grid-top">
  {#if moDef.canCreate}
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

