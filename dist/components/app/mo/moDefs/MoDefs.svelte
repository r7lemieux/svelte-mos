<script>import { MoListModel } from "../../../../models/managedObjects/MoList.model.js";
import { moDefDef } from "../../../../models/managedObjects/MoDefinition.js";
import Mos from "../../../generics/mos/Mos.svelte";
export let mos;
const moDef = moDefDef;
let modelReady;
const moListModel = new MoListModel(moDefDef);
</script>
<svelte:head>
  <title>Mo Definitions</title>
  <meta name="description" content="Mo Definitons"/>
</svelte:head>

<Mos {moDef} {mos} />

