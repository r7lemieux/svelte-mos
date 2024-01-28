<script lang='ts'>
  import {Column, Grid} from 'ag-grid-community'
  import 'ag-grid-community/styles/ag-grid.css'
  import 'ag-grid-community/styles/ag-theme-alpine.css'
  import {onMount} from 'svelte'
  import type {FirstDataRenderedEvent, GridSizeChangedEvent} from 'ag-grid-community/dist/lib/events'
  import type {GridOptions} from 'ag-grid-community/dist/lib/entities/gridOptions'
  import type {FieldDefinition} from '$lib/models/fields/FieldDefinition'
  import type {MoListModel} from '$lib/models/managedObjects/MoList.model'

  export let height = '100px'
  export let gridId = 'grid'
  let grid
  let model: MoListModel | null = null
  let gridOptions: GridOptions

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
        console.log(`==>ModelGrid.svelte:33 err`, err)
      }
    }
  }

  export const modelReady = (listModel: MoListModel): boolean => { //, replaceId: string | null = null): void => {
    if (!listModel) return false
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
      btnCellRenderer: BtnCellRenderer
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
    const grid = window.document.getElementById(gridId)
    const wrapper = grid!.parentElement
    grid!.remove()
    const newGrid = window.document.createElement('div')
    newGrid.setAttribute('id', gridId)
    newGrid.classList.add('grid')
    newGrid.classList.add('ag-theme-alpine')
    newGrid.setAttribute('style', 'height: 100%;')
    // newGrid.setAttribute('class', 'grid ag-theme-alpine')
    wrapper!.appendChild(newGrid)
  }

  /* --------------
   * Click Renderer
   * --------------
   */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  function BtnCellRenderer() {}

  BtnCellRenderer.prototype.init = function (params) {
    this.params = params
    this.eGui = document.createElement('div')
    this.eGui.innerHTML = params.value
    this.btnClickedHandler = this.btnClickedHandler.bind(this)
    this.eGui.addEventListener('click', this.btnClickedHandler)
  }
  BtnCellRenderer.prototype.getGui = function () {
    return this.eGui
  }
  BtnCellRenderer.prototype.destroy = function () {
    this.eGui.removeEventListener('click', this.btnClickedHandler)
  }
  BtnCellRenderer.prototype.btnClickedHandler = function (event) {
    this.params.clicked(this.params.data.id)
  }
</script>

<svelte:head>
  <title>Profile</title>
  <meta name='description' content='User Profile'/>
</svelte:head>
<!--<GPicker doc={doc}/>-->
<div id="grid-wrapper" class={(height == '100%')?'grid-wrapper-full':'grid-wrapper'}>
  <!--  <div id="grid-wrapper" class={(height == '100%')?'grid-wrapper-full':'grid-wrapper'} style="height:{height}">-->
  <!--  <div id="grid-wrapper" class="grid-wrapper-full">-->
  <div id="{gridId}" class="grid ag-theme-alpine"></div>
</div>

<!--<style lang='sass'>-->
<!--  //html-->
<!--    //position: absolute-->
<!--    //overflow: auto-->
<!--  //.grid-context-->
<!--  //  //position: absolute-->
<!--  //  //height: 30rem-->
<!--  //  //width: 50rem-->
<!--  //  height: 100%-->
<!--  //  width: 100%-->
<!--  //-->
<!--  .grid-wrapper-->
<!--    //position: absolute-->
<!--    background: #4caf50-->
<!--    //display: flex-->
<!--    //overflow: hidden-->
<!--    height: 100%-->
<!--    width: 100%-->
<!--    //width: 30rem-->

<!--    .grid-->
<!--      height: 100%-->
<!--      width: 100%-->

<!--    .grid.ag-theme-alpine-->
<!--      //flex-basis: 100%-->
<!--      height: 100%-->
<!--      width: 100%-->
<!--      background: #A93-->

<!--      .firstName-->
<!--        background: #BB9-->

<!--      .lastName-->
<!--        font-weight: bold-->
<!--</style>-->
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