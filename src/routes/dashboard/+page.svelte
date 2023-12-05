<script lang="ts">
  import Home from "$lib/components/Home.svelte";

  export let data;
</script>

<!-- website body -->
<Home sessions={data.sessions} />
