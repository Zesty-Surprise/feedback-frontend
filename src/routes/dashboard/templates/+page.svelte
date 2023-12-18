<script lang="ts">
  import { goto, invalidateAll } from "$app/navigation";
  import { fetchAPI } from "$lib/functions";
  import Modal from "$lib/components/Generic/Modal.svelte";

  export let data: any;

  let showDeleteModal = false;
  let selectedForDelete = "";

  const toggleDelete = (id: string) => {
    selectedForDelete === ""
      ? (selectedForDelete = id)
      : (selectedForDelete = "");
    showDeleteModal = !showDeleteModal;
  };

  const deleteRequest = async (id: string): Promise<void> => {
    const res = await fetchAPI(`templates/${id}`, "DELETE", data.cookie);
    const json = await res.json();
    return json;
  };

  const deleteTemplate = async (): Promise<void> => {
    const res = await deleteRequest(selectedForDelete);
    toggleDelete("");
    invalidateAll();
  };
</script>

<Modal bind:showModal={showDeleteModal}>
  <p slot="header" class="text-color-text font-semibold text-center">
    Are you sure you want to delete this template?
  </p>
  <div class="pt-3 pb-2 self-center flex justify-center gap-5">
    <button
      class="text-white bg-red-500 hover:brightness-90 transition duration-200 focus:outline-none font-medium rounded-full text-md px-6 py-2 text-center"
      type="submit"
      on:click={() => deleteTemplate()}
    >
      Delete
    </button>
    <button
      class="text-white bg-gray-300 hover:brightness-90 transition duration-200 focus:outline-none font-medium rounded-full text-md px-6 py-2 text-center"
      type="submit"
      on:click={() => toggleDelete("")}
    >
      Cancel
    </button>
  </div>
</Modal>

<div class="relative mt-10 px-10 text-zinc-600">
  <h1 class="block text-xl font-medium">Template collection</h1>
  <p>Add, Edit and Delete survey templates here</p>
</div>
<div class="flex flex-wrap ml-10 mr-16">
  <div
    class="flex flex-col min-w-fit min-h-fit mr-16 mt-16 hover:scale-105 duration-100"
  >
    <div
      class="flex items-center justify-evenly h-52 w-52 bg-color-highlight rounded-lg"
    >
      <button
        class="flex justify-center items-center h-full w-full"
        on:click={() => goto(`/dashboard/templates/builder`)}
      >
        <div
          class="bg-color-accent rounded-full w-14 h-14 flex justify-center items-center"
        >
          <iconify-icon class="text-white" icon="typcn:plus" width="48px" />
        </div>
      </button>
    </div>
    <div class="pl-1">
      <p class="text-color-accent font-semibold">Create New Template</p>
    </div>
  </div>
  {#each [...data.templates].reverse() as template}
    {@const date = new Date(template.date_created).toLocaleDateString()}
    <div
      class="flex flex-col min-w-fit min-h-fit mr-16 mt-16 hover:scale-105 duration-100"
    >
      <div
        class="flex items-center justify-evenly h-52 w-52 bg-color-highlight rounded-lg"
      >
        <button
          class="bg-color-accent rounded-2xl w-14 h-14 flex justify-center items-center hover:brightness-90 transition duration-200"
          on:click={() => goto(`/dashboard/templates/${template._id}`)}
        >
          <iconify-icon
            class="text-white"
            icon="mingcute:inspect-line"
            width="40px"
          />
        </button>
        <button
          class="bg-color-accent rounded-2xl w-14 h-14 flex justify-center items-center hover:brightness-90 transition duration-200"
          on:click={() => {
            toggleDelete(template._id);
          }}
        >
          <iconify-icon class="text-white" icon="ph:trash-fill" width="40px" />
        </button>
      </div>
      <div class="pl-1">
        <p class="text-color-text_light font-light">{date}</p>
        <p class="text-color-accent font-semibold">{template.name}</p>
      </div>
    </div>
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
