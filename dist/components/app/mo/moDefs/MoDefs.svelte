<script>import { MoListModel } from "../../../../models/managedObjects/MoList.model.js";
import { moDefDef } from "../../../../models/managedObjects/MoDefinition";
import Mos from "../../../generics/mos/Mos.svelte";
import { moDefMoMeta } from "../../../../models/index.js";
export let mos;
let modelReady;
const moListModel = new MoListModel(moDefMoMeta);
const moMeta = moDefMoMeta;
console.log(`==>MoDefs.svelte:11 mos`, mos);
</script>
<svelte:head>
  <title>Mo Definitions</title>
  <meta name="description" content="Mo Definitons"/>
</svelte:head>

<Mos {moMeta} {mos} />

