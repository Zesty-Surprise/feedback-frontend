<script lang="ts">
  import Surveys from "$lib/components/Surveys.svelte";
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
<Surveys />
