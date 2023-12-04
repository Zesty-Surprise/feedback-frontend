<script lang="ts">
  import Engagement from "$lib/components/Engagement.svelte";
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
<Engagement />
