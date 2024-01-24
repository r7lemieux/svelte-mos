<script>import { toDisplayString } from "../../../services/common/util/string.utils";
export let moMeta;
console.log(`==>MoCreate.svelte:6 moMeta`, moMeta.name);
const title = toDisplayString(moMeta.name);
const fieldDefs = Array.from(moMeta.fieldDefs.values());
const mo = moMeta.newMo();
const onChange = (event) => {
  console.log(`==>Mo.svelte:19 on change event`, event);
  const fieldname = event.srcElement.id;
  const value = event.srcElement.value;
  mo[fieldname] = value;
};
const create = (event) => {
  console.log(`==>MoCreate.svelte:14 create event`, event);
  moMeta.dataSource.addMo(mo);
};
</script>
<svelte:head>
  <title>{title}</title>
</svelte:head>
<div class="create">
  {#each fieldDefs as fd}
    <div class="field">
      <label for={fd.name}>{fd.getDisplayName()}</label>
      <input type={fd.inputType} id="{fd.name}" value={mo[fd.name]|| ''} on:change={onChange}/>
    </div>
  {/each}
  <div class="button-bar">
    <button on:click={create}>Create</button>
  </div>
</div>
<style>.create {
  max-width: 40rem;
}
.create .field {
  display: grid;
  grid-template-columns: minmax(5rem, 10rem) 1fr;
  grid-template-rows: 2.5rem;
  gap: 0.5rem;
}
.create .field label {
  place-self: center end;
}
.create .field input {
  place-self: center stretch;
  height: 2rem;
  border: 1px solid #DDE;
  padding: 0 0.5rem;
}

.button-bar {
  display: flex;
  margin: 1rem 0;
  justify-content: flex-end;
}
.button-bar button {
  height: 2rem;
}</style>