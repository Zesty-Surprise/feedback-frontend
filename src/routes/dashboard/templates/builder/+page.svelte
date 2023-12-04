<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";
    import { fetchAPI } from "$lib/functions";

    async function postTemplate(template: any) {
        const res = await fetchAPI("templates", "POST", template);
        const json = await res.json();
        return json;
    }

    let loading: boolean = true;

    let newTemplate: any = {
        name: "",
        components: [
            {
                id: 0,
                type: "enps-component",
                custom_text: "",
            },
            {
                id: 1,
                type: "department-component",
                custom_text: "",
            },
        ],
    };

    const addComponent = (): void => {
        const componentId = newTemplate.components.length;
        let comp = {
            custom_text: "",
            id: componentId,
            type: "custom-component",
        };
        newTemplate.components = [...newTemplate.components, comp];
    };

    const removeComponent = (id: any): void => {
        newTemplate.components = newTemplate.components.filter(
            (obj: any) => obj.id !== id,
        );
    };

    const saveTemplate = async (): Promise<void> => {
        let resp = await postTemplate(newTemplate);
        goto(`/dashboard/templates/${resp._id}`, { replaceState: true });
    };

    onMount(() => {
        loading = false;
    });
</script>

<div class="grid grid-cols-3 grid-rows-3 gap-3 text-zinc-600 m-10">
    <div class="row-span-4 col-start-1 row-start-1 rounded-xl ml-2">
        <div class="rounded-md mb-5">
            <h1 class="block text-xl font-medium">Template builder</h1>
            <p>Build and assemble your template for the survey</p>
        </div>
        <div
            class="p-4 bg-white border border-gray-200 rounded-xl shadow m ml-0"
        >
            <div class="h-24 py-1">
                <label
                    for="text"
                    class="block mb-2 text-sm font-medium text-gray-900"
                    >Template name</label
                >
                <input
                    type="text"
                    bind:value={newTemplate.name}
                    class="w-full rounded-xl"
                    placeholder="New template"
                />
            </div>
            <div class="flex">
                <button
                    type="submit"
                    class="w-18 text-red-400 bg-white border-4 border-red-400 rounded-xl p-2 mr-2 hover:bg-red-200"
                    on:click={() => {
                        goto("/dashboard/templates");
                    }}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-8 h-8"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </button>
                <button
                    type="submit"
                    class="w-full bg-white text-green-500 border-4 border-green-500 rounded-xl p-2 text-md font-medium
                    hover:bg-green-200"
                    on:click={saveTemplate}
                >
                    Save Template
                </button>
            </div>
        </div>
    </div>
    <div
        class="col-span-2 row-span-3 mr-10 border border-custom shadow h-full p-4 rounded-xl"
    >
        <div class="rounded-md mb-5">
            <h1 class="block text-md font-medium">Form components</h1>
            <p>Add elements to customize the form</p>
        </div>

        {#each newTemplate.components as component}
            <div
                class="bg-white border shadow-md hover:shadow-xl transition duration-250 ease-in-out border-gray-200 rounded-xl px-4 py-3 mb-4"
            >
                <div class="flex justify-between items-center">
                    <h2 class="text-lg font-semibold">{component.type}</h2>
                    {#if component.type != "enps-component" && component.type != "department-component"}
                        <div class="flex">
                            <button
                                class="transform hover:scale-150 hover:rotate-180 transition duration-500 ease-in-out text-red-500"
                                on:click={() => {
                                    removeComponent(component.id);
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-8 h-8"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </button>
                        </div>
                    {/if}
                </div>
                <div class="">
                    <label for="support" class="text-s mb-2"
                        >Component <strong>title</strong> or
                        <strong>question</strong></label
                    >
                    <textarea
                        id="support"
                        bind:value={component.custom_text}
                        placeholder="Provide a text for the "
                        class="border rounded-xl w-full h-16"
                    ></textarea>
                </div>
            </div>
        {/each}
        <div class="flex justify-center mb-3">
            <button
                class="m-1 transform hover:scale-150 hover:rotate-90 transition duration-500 ease-in-out text-color"
                on:click={addComponent}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-10 h-10"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            </button>
        </div>
    </div>
</div>

<style>
    .custom-color {
        background-color: #de896e;
    }
    .text-color {
        color: #de896e;
    }
    .border-custom {
        border: 2px solid #de896e;
        border-radius: 25px;
    }
</style>
