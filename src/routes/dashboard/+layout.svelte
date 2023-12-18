<script lang="ts">
  import { setContext } from 'svelte';
	import { writable } from 'svelte/store';

  import { TabGroup, TabAnchor } from "@skeletonlabs/skeleton";
  export let data;

  import "$lib/app.css";

  import Header from "$lib/components/Header.svelte";
  import { AppShell } from "@skeletonlabs/skeleton";

  let sidebarItems : {
    title:string,
    icon:string,
    url:string[]
  }[];

  $: sidebarItems = data.side
  
</script>

<AppShell
  slotPageContent="bg-color-layout"
  slotSidebarLeft="bg-color-layout"
  slotFooter="bg-color-layout"
>
  <!-- add your own header :)-->
  <svelte:fragment slot="header"><Header /></svelte:fragment>
  <!-- add your own sidebar :)-->
  <svelte:fragment slot="sidebarLeft">
    <TabGroup regionList="flex-col border-b-0 px-6 text-color-text">
      {#each sidebarItems as item, index}
        <TabAnchor
          class="mt-7 transition duration-200"
          name="tab"
          value={index}
          active="bg-color-highlight text-color-accent"
          padding="px-7 py-4"
          rounded="rounded-md"
          hover="hover:bg-color-hover"
          flex="flex flex-row"
          selected={item.url.includes(data.pathname)}
          href={item.url[0]}
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
