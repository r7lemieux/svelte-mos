<script lang='ts'>
  import {Column, Grid} from 'ag-grid-community'
  import 'ag-grid-community/styles/ag-grid.css'
  import 'ag-grid-community/styles/ag-theme-alpine.css'
  import {onMount} from 'svelte'
  import type {FirstDataRenderedEvent, GridSizeChangedEvent} from 'ag-grid-community/dist/lib/events'
  import type {GridOptions} from 'ag-grid-community/dist/lib/entities/gridOptions'
  import type {FieldDefinition} from '$lib/models/fields/FieldDefinition'
  import type {MoListModel} from '$lib/models/managedObjects/MoList.model'
  import {BtnCellRenderer} from  '$lib/components/common/BtnCellRenderer'
  import {buildIconColDef, IconCellRenderer} from  '$lib/components/common/IconCellRenderer'
  import CgArrowRight from 'svelte-icons-pack/cg/CgArrowRight'
  import {goto} from '$app/navigation'
  import AiOutlineArrowRight from "svelte-icons-pack/ai/AiOutlineArrowRight"

  export let height = '100px'
  export let gridId = 'grid'
  let grid
  export let model: MoListModel | null = null
  let displayName = ''
  let gridOptions: GridOptions
  let emptyGrid = false

  /* ----------
   * Build Grid
   * ----------
   */
  onMount(() => {
    if (model) buildGrid()
  })
  const buildGrid = () => {
    const eGridDiv = window.document.getElementById(gridId)
    gridOptions = buildGridOptions()
    if (eGridDiv && gridOptions) {
      try {
        grid = new Grid(eGridDiv, gridOptions)
        return true
      } catch (err) {
        (`==>ModelGrid.svelte:33 err`, err)
      }
    }
  }

  export const modelReady = (listModel: MoListModel): boolean => { //, replaceId: string | null = null): void => {
    if (!listModel) return false
    displayName = listModel.moDef.getDisplayName()
    emptyGrid = !listModel?.mos?.length
    // if (model && !replaceId) {
    if (model && model.getName() === listModel.getName()) {
      gridOptions?.api?.setRowData(listModel.mos)
      return true
    } else {
      resetGrid()
    }
    model = listModel
    buildGrid()
    return true
  }

  /* ------------
   * Grid Options
   * ------------
   */
  const goToView = (mo) => {
    goto(`/mo/${mo.moDef.name}/${mo.id}`)
  }

  const buildGridOptions = (): GridOptions<any> => {
    if (!model) return {}
    let gridFieldDefs = Array.from(model.getFieldDefs().values())
    if (model.moDef.gridFieldnames) {
      gridFieldDefs = gridFieldDefs.filter(d => model?.moDef!.gridFieldnames?.indexOf(d.name) !== -1)
    }
    const columnDefs = gridFieldDefs
      .map((def: FieldDefinition<any>) => {
        const colDef = def.buildColDef()
        return colDef
      })
    const viewClumnDefs = buildIconColDef(CgArrowRight, goToView)
    columnDefs.push(viewClumnDefs)
    const rowData = model.mos
    const defaultColDef = {
      resizable: true
    }

    function onFirstDataRendered(params: FirstDataRenderedEvent) {
      params.api.sizeColumnsToFit()
    }

    function onGridSizeChanged(params: GridSizeChangedEvent) {
      // get the current grids width
      const gridWidth = window?.document?.getElementById('grid-wrapper')?.offsetWidth
      // keep track of which columns to hide/show
      const columnsToShow: string[] = []
      const columnsToHide: string[] = []
      // iterate over all columns (visible or not) and work out how many columns can fit (based on their minWidth)
      let totalColsWidth = 0
      const allColumns = params.columnApi.getColumns()
      if (allColumns && allColumns.length > 0) {
        for (let i = 0; i < allColumns.length; i++) {
          const column: Column = allColumns[i]
          totalColsWidth += column.getMinWidth() || 0
          if (!column.isVisible() || (gridWidth && column && totalColsWidth > gridWidth)) {
            columnsToHide.push(column.getColId())
          } else {
            columnsToShow.push(column.getColId())
          }
        }
      }
      // show/hide columns based on current grid width
      params.columnApi.setColumnsVisible(columnsToShow, true)
      // fill out any available space to ensure there are no gaps
      params.api.sizeColumnsToFit()
    }

    const components = {
      btnCellRenderer: BtnCellRenderer,
      iconCellRenderer: IconCellRenderer
    }
    const onGridReady = params => {
      const gridApi = params.api
      const gridColumnApi = params.columnApi
      //The ag-grid is not enlarging based on the page height,
      //so dynamically adjusting the height of the grid
      // gridApi.setDomLayout("autoHeight")
    }

    return {defaultColDef, columnDefs, rowData, onFirstDataRendered, onGridSizeChanged, onGridReady, components}
    // return {columnDefs, rowData, components}
  }
  const resetGrid = () => {
    emptyGrid = !model?.mos?.length
    const height = emptyGrid? '200px': '100%'
    const grid = window.document.getElementById(gridId)
    const wrapper = grid!.parentElement
    grid!.remove()
    const newGrid = window.document.createElement('div')
    newGrid.setAttribute('id', gridId)
    newGrid.classList.add('grid')
    newGrid.classList.add('ag-theme-alpine')
    newGrid.setAttribute('style', `height: ${height};`)
    // newGrid.setAttribute('class', 'grid ag-theme-alpine')
    wrapper!.appendChild(newGrid)
  }

</script>

<svelte:head>
  <title>Profile</title>
  <meta name='description' content='{displayName}'/>
</svelte:head>

<!--<GPicker doc={doc}/>-->
<div id="grid-wrapper" class={(height == '100%')?'grid-wrapper-full':'grid-wrapper'}>
  <!--  <div id="grid-wrapper" class={(height == '100%')?'grid-wrapper-full':'grid-wrapper'} style="height:{height}">-->
  <!--  <div id="grid-wrapper" class="grid-wrapper-full">-->
  <div id="{gridId}" class="grid ag-theme-alpine" ></div>
</div>

<style lang="sass">
  .grid-wrapper
    margin: 0
    padding: 0
    left: 0
    width: 100%
    height: 100%

  .grid-wrapper-full
    margin: 0
    padding: 0
    position: absolute
    left: 0
    width: 100%
    height: 100%

    .grid
      height: 100%

  :global(.ag-root-wrapper-body.ag-layout-normal)
    height: auto

</style>
