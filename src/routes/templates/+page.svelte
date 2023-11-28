<script lang="ts">
  import Templates from "$lib/components/Templates.svelte";
  export let data:any;
</script>

<!-- website body -->
<Templates templates={data.templates}/>
