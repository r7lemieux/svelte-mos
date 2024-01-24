<script lang="ts">
  import type {MoViewMode} from  '$lib/constants/ui'
  import {page} from '$app/stores'
  import type {FieldDefinition} from  '$lib/services/common/validation/FieldDefinition'
  import SimpleField from  '$lib/components/generics/field/SimpleField.svelte'
  import ArrayField from  '$lib/components/generics/field/ArrayField.svelte'
  import MapField from  '$lib/components/generics/field/MapField.svelte'
  import { afterUpdate } from "svelte";
  import { sizeLabels } from  '$lib/services/common/util/dom.utils'
  import ObjectField from  '$lib/components/generics/field/ObjectField.svelte'
  export let fieldDef: FieldDefinition<never>
  export let value
  export let viewMode: MoViewMode = extractViewMode()
  export let level = 1
  export let branch = false
  export let onChange: (fieldId: string, value: any) => void
  $: disabled = viewMode === 'view'
  const fd = fieldDef
  function extractViewMode(): MoViewMode {
    const pathParts = $page.url.pathname.split('/')
    const pathTail = pathParts[pathParts.length - 1]
    if (pathTail === 'edit') return 'edit'
    if (pathTail === 'create') return 'create'
    return 'view'
  }
  afterUpdate(sizeLabels)

</script>

  {#if fd.type === 'array'}
    <ArrayField  {fieldDef} {value} {viewMode} {level} {onChange}/>
  {:else if fd.type === 'map'}
    <MapField    {fieldDef} {value} {viewMode} {level} {onChange}/>
  {:else if fd.type === 'object'}
    <ObjectField name={fd.name} {value} {viewMode} {level} {onChange}/>
  {:else}
    <SimpleField {fieldDef} {value} {viewMode} {level} {onChange}/>
  {/if}

<style lang="sass">
  @use 'field'
  //.tree-indicator
  //  border-left: 4px solid #888
  //  display: block
  //  content: ''
  //  height: 2.5rem
  //.count, .array-value, .array-item, .simple-value, .map-value
  //  display: inline-block
  //  height: 2.5rem
  //  width: 100%

</style>