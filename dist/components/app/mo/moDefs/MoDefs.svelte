<script>import { MoListModel } from "../../../../models/managedObjects/MoList.model.js";
import { moDefDef } from "../../../../models/managedObjects/MoDefinition";
import Mos from "../../../generics/mos/Mos.svelte";
import { moDefMoMeta } from "../../../../models/index.js";
export let mos;
const moDef = moDefDef;
let modelReady;
const moListModel = new MoListModel(moDefMoMeta);
</script>
<svelte:head>
  <title>Mo Definitions</title>
  <meta name="description" content="Mo Definitons"/>
</svelte:head>

<Mos {moDef} {mos} />

