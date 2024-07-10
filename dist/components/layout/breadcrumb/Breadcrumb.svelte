<script>export let nodes = [];
export let nodeSelected;
export const addChild = (id, name, replace = false) => {
  if (replace) {
    nodes = nodes.slice(0, nodes.length - 1);
  }
  nodes = [...nodes, { id, name }];
};
const nodeClicked = (id) => {
  nodeSelected(id).then((success) => {
    if (success) {
      const index = nodes.findIndex((n) => n.id === id);
      nodes = [...nodes.slice(0, index + 1)];
    }
  });
};
</script>

<svelte:head>
  <title>Profile</title>
  <meta name="breadcrumb" content="breadcrumb"/>
</svelte:head>
<div>
{#each nodes as node, i}
  {#if i == nodes.length - 1 }
    <span class="last-node">{node.name}</span>
    {:else}
      <span class="node" on:click={nodeClicked(node.id)} on:keypress={nodeClicked(node.id)} role="button" aria-pressed="false" tabindex="0">{node.name} > </span>
  {/if}
{/each}
</div>
<style>.node {
  display: inline;
  margin: 2px 0;
}

.last-node {
  display: inline;
  margin: 2px 0;
  font-weight: bold;
}</style>