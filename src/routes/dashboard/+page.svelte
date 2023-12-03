<script lang="ts">
  import Home from "$lib/components/Home.svelte";
  import { getCookie, setCookie } from "typescript-cookie";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";

  let data = "";

  onMount(async () => {
    const token = getCookie("access_token");

    if (!token) {
      // Redirect to login or handle unauthorized access
      console.error("Unauthorized access");
      goto("auth/login");
      return;
    }

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
