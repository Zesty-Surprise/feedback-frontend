<script lang="ts">
    import { PUBLIC_BACKEND_URI } from "$env/static/public";
    import { goto, invalidateAll } from "$app/navigation";
    import { onMount } from "svelte";
    import { checkAuth } from "../../auth/auth";
    import { fetchAPI } from "$lib/functions";

    export let data: any;

    const deleteRequest = async (id: string): Promise<void> => {
        const res = await fetchAPI(`templates/${id}`, "DELETE");
        const json = await res.json();
        return json;
    };

    const deleteTemplate = async (id: string): Promise<void> => {
        const res = await deleteRequest(id);
        invalidateAll();
    };
</script>

<!--Grid-->
<div class="relative mt-10 px-10 text-zinc-600">
    <h1 class="block text-xl font-medium">Template collection</h1>
    <p>Add, Edit and Delete survey templates here</p>
</div>
<div
    class="flex justify-center grid grid-cols-4 gap-10 mt-10 px-10 text-zinc-600"
>
    <div class="rounded-xl text-center h-96 w-46">
        <div
            class="h-full flex items-center justify-center text-white border-custom"
        >
            <a href="templates/builder">
                <div class="flex items-center justify-center mx-2">
                    <span
                        class="text-color transform hover:scale-150 hover:rotate-90 transition duration-500 ease-in-out"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            class="w-12 h-12"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                    </span>
                </div>
            </a>
        </div>
    </div>
    {#each data.templates as template}
        <button on:click={() => goto(`templates/${template._id}`)}>
            <div
                class="bg-white shadow-md rounded-xl text-center h-96 w-46 border-custom hover:shadow-xl transition duration-250 ease-in-out"
            >
                <div
                    class="flex justify-end px-1 pt-1 border-b-2 border-neutral-200 mb-2"
                >
                    <a href="templates/builder/{template._id}">
                        <div
                            class="flex items-center justify-center rounded-full h-12 w-12"
                        >
                            <span class="font-bold text-2xl">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                    />
                                </svg>
                            </span>
                        </div>
                    </a>
                    <button
                        on:click={() => {
                            deleteTemplate(template._id);
                        }}
                    >
                        <div
                            class="flex items-center justify-center rounded-full h-12 w-12"
                        >
                            <span class="font-bold text-2xl">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke-width="1.5"
                                    stroke="currentColor"
                                    class="w-6 h-6"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                    />
                                </svg>
                            </span>
                        </div>
                    </button>
                </div>

                <div class="flex h-72 items-center justify-center text-3xl">
                    <h1 class="font-xl">{template.name}</h1>
                </div>
            </div>
        </button>
    {/each}
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
