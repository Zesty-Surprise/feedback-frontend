<script lang="ts">
  import Graph from "$lib/components/Graph.svelte";

  export let data: any;

  let range: number = -100;
  let displayVariable = "score";
</script>

<Graph {data} {range} {displayVariable}></Graph>
