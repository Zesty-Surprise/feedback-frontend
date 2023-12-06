<script lang="ts">
  export let data: any;
</script>

{#each data.session.forms as form}
  {form.form_id}
{/each}

<h1>feedback survey slug</h1>
