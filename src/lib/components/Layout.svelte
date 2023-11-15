<script lang="ts">
    import { TabGroup, Tab } from '@skeletonlabs/skeleton';
    let tabSet: number = 0;
    import "../../app.css";

    import Header from "$lib/components/Header.svelte";
    import { AppShell } from "@skeletonlabs/skeleton";

    const sidebarItems = [
        "General",
        "Surveys",
        "eNPS",
        "Engagement",
        "Templates"
    ]

</script>


<AppShell slotPageContent="bg-[#FCF8F4]" slotSidebarLeft="bg-[#FCF8F4]" slotFooter="bg-[#FCF8F4]">
    <!-- add your own header :)-->
    <svelte:fragment slot="header"><Header/></svelte:fragment>
    <!-- add your own sidebar :)-->
    <svelte:fragment slot="sidebarLeft">
        <TabGroup regionList="flex-col border-b-0 px-6">
            <p class="text-[#595959] text-xl px-2 py-5 font-semibold">
                Home
            </p>
            {#each sidebarItems as item, index}
                <Tab 
                bind:group={tabSet}
                name="tab"
                value={index}
                active="bg-[#F5E5D3] text-[#de896e]"
                padding="px-8 py-4"
                rounded="rounded-md"
                hover="hover:bg-[#f5e5dd80]"
                flex="flex flex-row"
                regionTab={index !== tabSet ? "text-[#595959] font-normal" : ""}>
                    <div class="flex items-center font-normal">
                        <iconify-icon icon='teenyicons:pie-chart-solid' height=22 width=22 class="pr-5"></iconify-icon>
                        <span>{item}</span>
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