<script lang="ts">
  import { TabGroup, Tab, TabAnchor } from "@skeletonlabs/skeleton";
  export let data;

  import "../app.css";

  import Header from "$lib/components/Header.svelte";
  import { AppShell } from "@skeletonlabs/skeleton";

  const sidebarItems = [
    {
      title: "General",
      icon: "teenyicons:pie-chart-solid",
      url: "/",
    },
    {
      title: "Surveys",
      icon: "mingcute:document-fill",
      url: "/surveys",
    },
    {
      title: "eNPS",
      icon: "ion:person",
      url: "/enps",
    },
    {
      title: "Engagement",
      icon: "iconoir:percentage-square-solid",
      url: "/engagement",
    },
    {
      title: "Templates",
      icon: "heroicons-solid:template",
      url: "/templates",
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
    <TabGroup regionList="flex-col border-b-0 px-6 text-[#595959]">
      <p class="text-[#595959] text-xl px-2 py-5 font-semibold">Dashboard</p>
      {#each sidebarItems as item, index}
        <TabAnchor
          class="my-2"
          name="tab"
          value={index}
          active="bg-[#F5E5D3] text-[#de896e]"
          padding="px-8 py-4"
          rounded="rounded-md"
          hover="hover:bg-[#f5e5dd80]"
          flex="flex flex-row"
          selected={data.pathname === item.url}
          href={item.url}
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
        </TabAnchor>
      {/each}
    </TabGroup>
  </svelte:fragment>
  <!-- Tab Panels --->

  <!-- Router Slot -->
  <slot />
  <!-- ---- / ---- -->
  <svelte:fragment slot="footer">Footer</svelte:fragment>
  <!-- (footer) -->
</AppShell>

<style>
</style>
