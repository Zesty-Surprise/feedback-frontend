<script lang="ts">
    import { TabGroup, Tab } from '@skeletonlabs/skeleton';
    let tabSet: number;

    const sidebarItems = [
        "General",
        "Surveys",
        "eNPS",
        "Engagement",
        "Templates"
    ]
</script>

<TabGroup justify="justify-center" regionList="flex-col">
        {#each sidebarItems as item, index}
            <Tab bind:group={tabSet} name="tab1" value={index} active="bg-red-500" padding="px-10 py-4" rounded="rounded-md" hover="hover:bg-sky-700">
                <div class="flex flex-row">
                    <div class="pr-5">(icon)</div>
                    <span>{item}</span>
                </div>
            </Tab>
        {/each}
	
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if tabSet === 0}
			(tab panel 1 contents)
		{:else if tabSet === 1}
			(tab panel 2 contents)
		{:else if tabSet === 2}
			(tab panel 3 contents)
        {:else if tabSet === 3}
			(tab panel 4 contents)
        {:else if tabSet === 4}
			(tab panel 5 contents)
		{/if}
	</svelte:fragment>
</TabGroup>
			
<style>

</style>