<script>import { Column, Grid } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { onMount } from "svelte";
import { BtnCellRenderer } from "../../common/BtnCellRenderer";
import { buildIconColDef, IconCellRenderer } from "../../common/IconCellRenderer";
import CgArrowRight from "svelte-icons-pack/cg/CgArrowRight";
import { goto } from "$app/navigation";
import AiOutlineArrowRight from "svelte-icons-pack/ai/AiOutlineArrowRight";
export let height = "100px";
export let gridId = "grid";
let grid;
export let model = null;
let displayName = "";
let gridOptions;
let emptyGrid = false;
onMount(() => {
  if (model)
    buildGrid();
});
const buildGrid = () => {
  const eGridDiv = window.document.getElementById(gridId);
  gridOptions = buildGridOptions();
  if (eGridDiv && gridOptions) {
    try {
      grid = new Grid(eGridDiv, gridOptions);
      return true;
    } catch (err) {
      `==>ModelGrid.svelte:33 err`, err;
    }
  }
};
export const modelReady = (listModel) => {
  if (!listModel)
    return false;
  displayName = listModel.moDef.getDisplayName();
  emptyGrid = !listModel?.mos?.length;
  if (model && model.getName() === listModel.getName()) {
    gridOptions?.api?.setRowData(listModel.mos);
    return true;
  } else {
    resetGrid();
  }
  model = listModel;
  buildGrid();
  return true;
};
const goToView = (mo) => {
  goto(`/mo/${mo.moDef.name}/${mo.id}`).then((r) => {
    console.log(`==>MosGrid.svelte:67 r`, r);
    return r;
  }).catch((e) => {
    console.log(`==>MosGrid.svelte:71 catch e`, e);
    throw e;
  });
};
const buildGridOptions = () => {
  if (!model)
    return {};
  let gridFieldDefs = Array.from(model.getFieldDefs().values());
  if (model.moDef.gridFieldnames) {
    gridFieldDefs = gridFieldDefs.filter((d) => model?.moDef.gridFieldnames?.indexOf(d.name) !== -1);
  }
  const columnDefs = gridFieldDefs.map((def) => {
    const colDef = def.buildColDef();
    return colDef;
  });
  const viewColumnDefs = buildIconColDef(CgArrowRight, goToView);
  columnDefs.push(viewColumnDefs);
  const rowData = model.mos;
  const defaultColDef = {
    resizable: true
  };
  function onFirstDataRendered(params) {
    params.api.sizeColumnsToFit();
  }
  function onGridSizeChanged(params) {
    const gridWidth = window?.document?.getElementById("grid-wrapper")?.offsetWidth;
    const columnsToShow = [];
    const columnsToHide = [];
    let totalColsWidth = 0;
    const allColumns = params.columnApi.getColumns();
    if (allColumns && allColumns.length > 0) {
      for (let i = 0; i < allColumns.length; i++) {
        const column = allColumns[i];
        totalColsWidth += column.getMinWidth() || 0;
        if (!column.isVisible() || gridWidth && column && totalColsWidth > gridWidth) {
          columnsToHide.push(column.getColId());
        } else {
          columnsToShow.push(column.getColId());
        }
      }
    }
    params.columnApi.setColumnsVisible(columnsToShow, true);
    params.api.sizeColumnsToFit();
  }
  const components = {
    btnCellRenderer: BtnCellRenderer,
    iconCellRenderer: IconCellRenderer
  };
  const onGridReady = (params) => {
    const gridApi = params.api;
    const gridColumnApi = params.columnApi;
  };
  return { defaultColDef, columnDefs, rowData, onFirstDataRendered, onGridSizeChanged, onGridReady, components };
};
const resetGrid = () => {
  emptyGrid = !model?.mos?.length;
  const height2 = emptyGrid ? "200px" : "100%";
  const grid2 = window.document.getElementById(gridId);
  const wrapper = grid2.parentElement;
  grid2.remove();
  const newGrid = window.document.createElement("div");
  newGrid.setAttribute("id", gridId);
  newGrid.classList.add("grid");
  newGrid.classList.add("ag-theme-alpine");
  newGrid.setAttribute("style", `height: ${height2};`);
  wrapper.appendChild(newGrid);
};
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

<style>.grid-wrapper {
  margin: 0;
  padding: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.grid-wrapper-full {
  margin: 0;
  padding: 0;
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
}
.grid-wrapper-full .grid {
  height: 100%;
}

:global(.ag-root-wrapper-body.ag-layout-normal) {
  height: auto;
}</style>
