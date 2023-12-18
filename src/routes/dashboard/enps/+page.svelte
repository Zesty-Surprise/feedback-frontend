<script lang="ts">
  import Graph from "$lib/components/Graph.svelte";
  export let data: any;
  let apiCall: string = "enps page";
</script>

<Graph 
    {data}
    {apiCall}
    >
</Graph>
