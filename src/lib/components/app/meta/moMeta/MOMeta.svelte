<script lang="ts">
  import type {Mo} from  '$lib/models/generic/Mo'
  import {toDisplayString} from '$lib/services/common/util/string.utils'
  import type {MoViewMode} from  '$lib/constants/ui'
  import {goto} from '$app/navigation'
  import {page} from '$app/stores'
  import {FieldDefs as fd} from  '$lib/services/common/validation/CommonFieldDefinition'
  import Field from  '$lib/components/generics/field/Field.svelte'
  import {Rezult} from  '$lib/services/common/message/rezult'
  import {ErrorName} from  '$lib/services/common/message/errorName'
  import {extractViewMode} from '$lib/services/common/util/dom.utils'
  import {UiMoMetas} from  '$lib/models/generic/MoMetas'
  import type {MoMeta} from  '$lib/models/generic/MoMeta'


  export let mo: MoMeta
  let viewMode: MoViewMode = extractViewMode($page)
  $: disabled = viewMode === 'view'
  let moMeta = mo.moMeta
  const title = toDisplayString(moMeta.name)
  const fieldDefs = Array.from(moMeta.fieldDefs.values())
  const ui = {}

  const uimo = UiMoMetas[mo.name]
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
    goto(`/mo/${moMeta.name}/${mo.id}/edit`)
    // history.replaceState(history.state, '', `/mo/${moMeta.name}/${mo.id}/edit`);
  }
  const save = () => {
    moMeta.dataSource.saveMo(mo).then(mo => {
      goto(`/mo/${moMeta.name}/${mo.id}`)
      // viewMode = 'view'
    })
  }
  const create = event => {
    console.log(`==>MoCreate.svelte:14 create event`, event)
    moMeta.dataSource.addMo(mo).then(mo => {
      goto(`/mo/${moMeta.name}/${mo.id}`)
      // viewMode = 'view'
    })
  }
  const deleteItem = (fname, i) => {
    mo[fname] = mo[fname].filter((item,index) => index != i)
    console.log(`==>Mo.svelte:65 mo[fname]`, mo[fname])
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