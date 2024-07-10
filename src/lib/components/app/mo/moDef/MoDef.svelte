<script lang="ts">
  import type {Mo} from '$lib/models/managedObjects/Mo'
  import {toDisplayString} from '$lib/services/common/util/string.utils'
  import type {MoViewMode} from  '$lib/constants/ui'
  import {goto} from '$app/navigation'
  import {page} from '$app/stores'
  import {CommonFieldDefs as fd} from '$lib/models/fields/CommonFieldDefinition'
  import Field from  '$lib/components/generics/field/Field.svelte'
  import {Rezult} from  '$lib/services/common/message/rezult'
  import {ErrorName} from  '$lib/services/common/message/errorName'
  import {extractViewMode} from '$lib/services/common/util/dom.utils'
  import type {MoDefinition} from '$lib/models/managedObjects/MoDefinition.js'


  export let mo: MoDefinition
  let viewMode: MoViewMode = extractViewMode($page)
  $: disabled = viewMode === 'view'
  let moDef = mo //.moDef
  const title = toDisplayString(moDef.name)
  const fieldDefs = Array.from(mo.moDef.fieldDefs.values())
  const ui = {}

  const onChange = (fieldId: string, val: any) => {
    const fieldPathNames = fieldId.split('.')
    let targetObj: any = mo
    if (fieldPathNames.length === 0) throw new Rezult(ErrorName.missing_param, {
      method: 'Mo.svelte.onChange()',
      fieldId
    })
    let fname: any = fieldPathNames.pop()
    for (const pathName of fieldPathNames) {
      // for (let i=0; i<fieldPathNames.length -1 ; i++) {
      //   const pathName = fieldPathNames[i]
      const pathval = (Array.isArray(pathName)) ? Number.parseInt(pathName) : pathName
      targetObj = targetObj[pathval]
    }
    targetObj[fname] = val
  }

  const edit = () => {
    viewMode = 'edit'
    goto(`/mo/${moDef.name}/${mo.id}/edit`)
    // history.replaceState(history.state, '', `/mo/${moDef.name}/${mo.id}/edit`);
  }
  const save = () => {
    moDef.dataSource.saveMo(mo).then(mo => {
      goto(`/mo/${moDef.name}/${mo.id}`)
      // viewMode = 'view'
    })
  }
  const create = event => {
    moDef.dataSource.addMo(mo).then(mo => {
      goto(`/mo/${moDef.name}/${mo.id}`)
      // viewMode = 'view'
    })
  }
  const deleteItem = (fname, i) => {
    mo[fname] = mo[fname].filter((item,index) => index != i)
  }
</script>
<svelte:head>
  <title>{title}</title>
</svelte:head>
<div class="mo">
  <div class="fields">
    {#each fieldDefs as fieldDef}
      {@const fname=fieldDef.name}
      {@const value=mo[fieldDef.name]}
      <Field {fieldDef} {value} {viewMode} {onChange} level={0} />
    {/each}
  </div>
  <div class="button-bar">
    {#if viewMode === 'view' }
      <button on:click={edit}>Edit</button>
    {:else if viewMode === 'edit'}
      <button on:click={save}>Save</button>
    {:else if viewMode === 'create'}
      <button on:click={create}>Create</button>
    {/if}
  </div>
</div>
<style lang="sass">
  .mo
    max-width: 40rem
    padding: 0 1rem 0 0
    .fields
      display: flex
      flex-direction: column

  .button-bar
    display: flex
    margin: 1rem 0
    justify-content: flex-end

    button
      height: 2rem


</style>