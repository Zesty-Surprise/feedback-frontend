<script lang="ts">
  import Home from "$lib/components/Home.svelte";
  import { onMount } from "svelte";
  import { checkAuth } from "../auth/auth";

  let data = "";

  onMount(async () => {
    const isAuthorized: boolean = await checkAuth();

    if (!isAuthorized) {
      return;
    }
    // const token = getCookie("access_token");

    // if (!token) {
    //   console.error("Unauthorized access");
    //   goto("auth/login");
    //   return;
    // }

    // const response = await fetch("http://your-api/protected-resource", {
    //   headers: {
    //     Authorization: `Bearer ${token}`,
    //   },
    // });

    // if (response.ok) {
    //   const result = await response.json();
    //   data = result.data;
    // } else {
    //   // Handle unauthorized access or other errors
    //   console.error("Error accessing protected resource");
    // }
  });
</script>

<!-- website body -->
<Home />
