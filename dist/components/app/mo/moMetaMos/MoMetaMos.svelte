<script>import { MoListModel } from "../../../../models/managedObjects/MoList.model.js";
import Mos from "../../../generics/mos/Mos.svelte";
import { moMetaMoMeta } from "../../../../models/managedObjects/MoMetaMo.js";
export let mos;
const moMeta = moMetaMoMeta;
console.log(`==>MoMetaMos.svelte:10 mos`, mos?.length);
let modelReady;
</script>
<svelte:head>
  <title>Mo Metas</title>
  <meta name="description" content="Mo Metas"/>
</svelte:head>

<h1>Metas</h1>
<div>components/app/mo/mo/MoMetaMos.svelte </div>
<h1>Metas</h1>
<div>mos[{mos?.length}]: {mos?.map(m => ' ' + m.name )}</div>
<Mos {moMeta} {mos} />