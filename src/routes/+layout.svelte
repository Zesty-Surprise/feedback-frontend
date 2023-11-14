<script>
  import "../app.css";

  import Header from "$lib/components/Header.svelte";
  import Sidebar from "$lib/components/Sidebar.svelte";

  import { AppShell, AppBar } from "@skeletonlabs/skeleton";
</script>

<!-- App Shell -->

<AppShell>
  <!-- add your own header :)-->
  <svelte:fragment slot="header"><Header/></svelte:fragment>
  <!-- add your own sidebar :)-->
  <svelte:fragment slot="sidebarLeft"><Sidebar/></svelte:fragment>
  <!-- Router Slot -->
  <slot />
  <!-- ---- / ---- -->
  <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>
  <!-- (footer) -->
</AppShell>
