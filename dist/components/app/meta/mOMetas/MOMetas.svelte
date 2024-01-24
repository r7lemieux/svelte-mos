<script>import { MoListModel } from "../../../../models/generic/MoList.model.js";
import { moMetaMeta } from "../../../../models/generic/MoMeta";
import Mos from "../../../generics/mos/Mos.svelte";
export let mos;
const moMeta = moMetaMeta;
let modelReady;
const moListModel = new MoListModel(moMetaMeta);
</script>
<svelte:head>
  <title>Meta</title>
  <meta name="description" content="Meta"/>
</svelte:head>

<Mos {moMeta}{mos} />

