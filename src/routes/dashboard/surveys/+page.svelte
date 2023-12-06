<script lang="ts">
  import { goto, invalidateAll } from "$app/navigation";
  import Modal from "$lib/components/Generic/Modal.svelte";
  import Survey from "$lib/components/Surveys/Survey.svelte";
  import { fetchAPI } from "$lib/functions";
  import { InputChip } from "@skeletonlabs/skeleton";

  export let data: any;

  let showSurveyModal = false;
  let showDeleteModal = false;
  let deleteId = "";

  let survey = {
    title: "",
    date_created: "",
    _id: "",
    template: {
      _id: "",
      name: "",
    },
    emails: [],
  };

//   function isValidEmail(value: string): boolean {
//     return value.includes("@") && value.includes(".");
//   }

  async function handleSubmit() {
    const formData = {
      emails: survey.emails,
      form_count: survey.emails.length,
      forms: [],
      template: survey.template._id,
      title: survey.title,
    };
    await fetchAPI("sessions", "POST", data.cookie, formData);
    invalidateAll();

    survey = {
      title: "",
      date_created: "",
      _id: "",
      template: {
        _id: "",
        name: "",
      },
      emails: [],
    };
  }

  async function handleDelete(id: string) {
    await fetchAPI(`sessions/${id}`, "DELETE", data.cookie);
    invalidateAll();
  }
</script>

<Modal bind:showModal={showSurveyModal}>
  <p slot="header" class="text-color-text font-semibold">Create a new survey</p>

  <form on:submit|preventDefault={handleSubmit}>
    <div class="flex flex-col mt-8 ml-8 mr-8 gap-6 text-color-text">
      <div class="flex flex-row justify-between items-center">
        <label for="name">Title</label>
        <input
          class="w-2/4 h-8 rounded-md border border-[#2b21181a]"
          type="text"
          bind:value={survey.title}
        />
      </div>
      <div class="flex flex-row justify-between items-center">
        <label for="name">Template</label>
        <select
          class="w-2/4 rounded-md border border-[#2b21181a] pt-1 pb-1"
          bind:value={survey.template}
        >
          {#each data.templates as template}
            <option class="bg-color-layout" value={template}
              >{template.name}
            </option>{/each}
        </select>
      </div>
      <div class="flex flex-row justify-between items-center">
        <InputChip
          bind:value={survey.emails}
          name="chips"
          placeholder="Enter a valid email"
        />
      </div>
      <div class="pt-3 pb-2 self-center">
        <button
          class="text-white bg-color-accent hover:brightness-90 transition duration-200 focus:outline-none font-medium rounded-full text-md px-6 py-2 text-center"
          type="submit"
          on:click={() => (showSurveyModal = false)}
        >
          Create
        </button>
      </div>
    </div>
  </form>
</Modal>

<Modal bind:showModal={showDeleteModal}>
  <p slot="header" class="text-color-text font-semibold text-center">
    Are you sure you want to delete this survey?
  </p>
  <div class="pt-3 pb-2 self-center flex justify-center gap-5">
    <button
      class="text-white bg-red-500 hover:brightness-90 transition duration-200 focus:outline-none font-medium rounded-full text-md px-6 py-2 text-center"
      type="submit"
      on:click={() => (showDeleteModal = false)}
      on:click={() => handleDelete(deleteId)}
    >
      Delete
    </button>
    <button
      class="text-white bg-gray-300 hover:brightness-90 transition duration-200 focus:outline-none font-medium rounded-full text-md px-6 py-2 text-center"
      type="submit"
      on:click={() => (showDeleteModal = false)}
    >
      Cancel
    </button>
  </div>
</Modal>

<div class="flex flex-wrap ml-12 mr-16">
  <Survey title="Create a new survey">
    <button
      class="flex justify-center items-center h-full w-full"
      on:click={() => (showSurveyModal = true)}
    >
      <div
        class="bg-color-accent rounded-full w-14 h-14 flex justify-center items-center"
      >
        <iconify-icon class="text-white" icon="typcn:plus" width="48px" />
      </div>
    </button>
  </Survey>
  {#each data.sessions as session}
    {@const date = new Date(session.date_created).toLocaleDateString()}
    <Survey title={session.title} {date}>
      <button
        class="bg-color-accent rounded-2xl w-14 h-14 flex justify-center items-center hover:brightness-90 transition duration-200"
        on:click={() => {
          goto(`/dashboard/surveys/${session._id}`);
        }}
      >
        <iconify-icon class="text-white" icon="uis:chart" width="36px" />
      </button>

      <button
        class="bg-color-accent rounded-2xl w-14 h-14 flex justify-center items-center hover:brightness-90 transition duration-200"
        on:click={() => (showDeleteModal = true)}
        on:click={() => (deleteId = session._id)}
      >
        <iconify-icon class="text-white" icon="ph:trash-fill" width="40px" />
      </button>
    </Survey>
  {/each}
</div>
