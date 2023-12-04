<script lang="ts">
  import Enps from "$lib/components/Enps.svelte";
  // import Enps from "$lib/components/Enps.svelte";
  import { onMount } from "svelte";
  import { checkAuth } from "../../auth/auth";

  onMount(async () => {
    const isAuthorized: boolean = await checkAuth();

    if (!isAuthorized) {
      return;
    }
  });
</script>

<!-- website body -->
<Enps />
