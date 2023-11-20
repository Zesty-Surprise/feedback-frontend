<script lang="ts">
  import { TabGroup, Tab } from "@skeletonlabs/skeleton";
  let tabSet: number = 0;
  import "../../app.css";

  import Header from "$lib/components/Header.svelte";
  import Home from "./Home.svelte";
  import { AppShell } from "@skeletonlabs/skeleton";
  import Enps from "$lib/components/ENPS.svelte";
  import Surveys from "$lib/components/Surveys.svelte";
  import Engagement from "$lib/components/Engagement.svelte";
  import Templates from "$lib/components/Templates.svelte";
  import { Router, Link, Route } from "svelte-routing";

  const sidebarItems = [
    {
      title: "General",
      icon: "teenyicons:pie-chart-solid",
    },
    {
      title: "Surveys",
      icon: "mingcute:document-fill",
    },
    {
      title: "eNPS",
      icon: "ion:person",
    },
    {
      title: "Engagement",
      icon: "iconoir:percentage-square-solid",
    },
    {
      title: "Templates",
      icon: "heroicons-solid:template",
    },
  ];
</script>

<AppShell
  slotPageContent="bg-[#FCF8F4]"
  slotSidebarLeft="bg-[#FCF8F4]"
  slotFooter="bg-[#FCF8F4]"
>
  <!-- add your own header :)-->
  <svelte:fragment slot="header"><Header /></svelte:fragment>
  <!-- add your own sidebar :)-->
  <svelte:fragment slot="sidebarLeft">
    <TabGroup regionList="flex-col border-b-0 px-6">
      <p class="text-[#595959] text-xl px-2 py-5 font-semibold">Dashboard</p>
      {#each sidebarItems as item, index}
        <Tab
          bind:group={tabSet}
          class="my-2"
          name="tab"
          value={index}
          active="bg-[#F5E5D3] text-[#de896e]"
          padding="px-8 py-4"
          rounded="rounded-md"
          hover="hover:bg-[#f5e5dd80]"
          flex="flex flex-row"
          regionTab={index !== tabSet ? "text-[#595959] font-normal" : ""}
        >
          <div class="flex items-center font-normal">
            <iconify-icon
              icon={item.icon}
              height="24"
              width="24"
              class="pr-5"
            />
            <span>{item.title}</span>
          </div>
        </Tab>
      {/each}
    </TabGroup>
  </svelte:fragment>
  <!-- Tab Panels --->
  <!-- <div class="text-black">
    {#if tabSet === 0}
      <Link to="/">Home</Link>
    {:else if tabSet === 1}
    <Link to="/">Surveys</Link>
    {:else if tabSet === 2}
    <Link to="/enps">eNPS</Link>
    {:else if tabSet === 3}
    <Link to="/Engagement">Engagement</Link>
    {:else if tabSet === 4}
    <Link to="/Templates">Templates</Link>
    {/if}
  </div> -->
  <!-- Router Slot -->
  <Router>
    <!-- Define a route for the Home component -->
    <Route path="/" component={Home} />
    <Route path="/surveys" component={Surveys} />
    <Route path="/enps" component={Enps} />
    <Route path="/engagement" component={Engagement} />
    <Route path="/templates" component={Templates} />
  </Router>
  <slot />
  <!-- ---- / ---- -->
  <svelte:fragment slot="footer">Footer</svelte:fragment>
  <!-- (footer) -->
</AppShell>

<style>
</style>
