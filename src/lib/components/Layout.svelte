<script lang="ts">
    import { TabGroup, Tab } from '@skeletonlabs/skeleton';
    let tabSet: number = 0;
    import "../../app.css";

    import Header from "$lib/components/Header.svelte";
    import { AppShell } from "@skeletonlabs/skeleton";

    const sidebarItems = [
    {
        title: "General",
        icon: "teenyicons:pie-chart-solid"
    },
    {
        title: "Surveys",
        icon: "mingcute:document-fill"
    },
    {
        title: "eNPS",
        icon: "ion:person"
    },
    {
        title: "Engagement",
        icon: "iconoir:percentage-square-solid"
    },
    {
        title: "Templates",
        icon: "heroicons-solid:template"
    }]

</script>


<AppShell slotPageContent="bg-[#FCF8F4]" slotSidebarLeft="bg-[#FCF8F4]" slotFooter="bg-[#FCF8F4]">
    <!-- add your own header :)-->
    <svelte:fragment slot="header"><Header/></svelte:fragment>
    <!-- add your own sidebar :)-->
    <svelte:fragment slot="sidebarLeft">
        <TabGroup regionList="flex-col border-b-0 px-6">
            {#each sidebarItems as item, index}
                <Tab 
                bind:group={tabSet}
                class="mt-7"
                name="tab"
                value={index}
                active="bg-[#F5E5D3] text-[#de896e]"
                padding="px-8 py-4"
                rounded="rounded-md"
                hover="hover:bg-[#f5e5dd80]"
                flex="flex flex-row"
                regionTab={index !== tabSet ? "text-[#595959] font-normal" : ""}>
                    <div class="flex items-center font-normal">
                        <iconify-icon icon={item.icon} height=24 width=24 class="pr-5"></iconify-icon>
                        <span>{item.title}</span>
                    </div>
                </Tab>
            {/each}
        </TabGroup>
    </svelte:fragment>
    <!-- Tab Panels --->
    <div class="text-black">
        {#if tabSet === 0}
            (General contents)
        {:else if tabSet === 1}
            (Surveys contents)
        {:else if tabSet === 2}
            (eNPS contents)
        {:else if tabSet === 3}
            (Engagement contents)
        {:else if tabSet === 4}
            (Templates contents)
        {/if}
    </div>
    <!-- Router Slot -->
    <slot />
    <!-- ---- / ---- -->
    <svelte:fragment slot="footer">Footer</svelte:fragment>
    <!-- (footer) -->
</AppShell>
			
<style>

</style>