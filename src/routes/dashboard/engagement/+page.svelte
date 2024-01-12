<script lang="ts">
  import Graph from "$lib/components/Graph.svelte";

  export let data: any;

  let range: number = 0;
  let displayVariable = "participation";
</script>

<div class="relative mt-10 px-10 text-zinc-600">
  <h1 class="block text-xl font-medium">Engagement score comparison</h1>
  <p>Filter current and previous Engagement score data</p>
</div>
<Graph {data} {range} {displayVariable}></Graph>
