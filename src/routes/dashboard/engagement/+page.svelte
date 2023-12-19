<script lang="ts">
  import Graph from "$lib/components/Graph.svelte";

  export let data: any;

  let range: number = 0;
  let displayVariable = "participation"
</script>

<Graph 
    {data}
    {range}
    {displayVariable}
    >
</Graph>