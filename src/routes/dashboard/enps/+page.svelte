<script lang="ts">
  import Graph from "$lib/components/Graph.svelte";

  export let data: any;

  let range: number = -100;
  let displayVariable = "score";
</script>

<div class="relative mt-10 px-10 text-zinc-600">
  <h1 class="block text-xl font-medium">eNPS survey comparison</h1>
  <p>Filter current and previous eNPS score data</p>
</div>
<Graph {data} {range} {displayVariable}></Graph>
