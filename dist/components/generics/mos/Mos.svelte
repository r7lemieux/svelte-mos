<script>import { afterUpdate, onMount } from "svelte";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { MoListModel } from "../../../models/managedObjects/MoList.model.js";
import MosGrid from "../mosGrid/MosGrid.svelte";
import { goto } from "$app/navigation";
import { MoMeta, moMetaMoMeta } from "../../../models/index.js";
export let mos = [];
export let moMeta;
moMeta = moMeta || mos[0].moMeta;
if (!mos) {
  moMeta.dataSource?.getMos().then((allMos) => mos = allMos);
}
let displayName = moMeta?.moDef.getDisplayName();
let modelReady;
const moListModel = new MoListModel(moMeta);
moListModel.mos = mos;
const createMo = () => {
  goto(`/mo/${moMeta.name}/create`);
};
const f2 = (k, v) => k && v && (k = "dataSource") ? "" + v : v;
console.log(`==>Mos.svelte:31 `);
let aaa = "initial";
onMount(() => {
  console.log(`==>Mos.svelte:33 `, moListModel.mos);
  aaa = "onMount";
  displayName = moMeta.moDef?.getDisplayName();
  console.log(`==>Mos.svelte:35 displayName`, displayName);
  modelReady(moListModel);
});
afterUpdate(() => {
  aaa = "afterUpdate";
});
</script>

<svelte:head>
  <title>Mos</title>
  <meta name='description' content={displayName}/>
</svelte:head>

<div class="grid-top">
  {#if moMeta?.moDef.canCreate}
    <button on:click={createMo}>Create {displayName}</button>
  {/if}
</div>
<MosGrid bind:modelReady/>

<div>Mos.svelte moListModel: {JSON.stringify(moListModel, f2)}</div>
<div>aaa {aaa}</div>

<style>.grid-top {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 0.2rem;
}
.grid-top button {
  height: 2.8rem;
  padding: 0 1rem;
}</style>

