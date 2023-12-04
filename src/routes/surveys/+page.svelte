<script lang="ts">
  import { goto } from "$app/navigation";
  import Modal from "$lib/components/Generic/Modal.svelte";
  import Survey from "$lib/components/Surveys/Survey.svelte";

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
    participants: 0,
  };
  let surveys = [survey];

  let templates = [survey.template];

  // async function fetchData() {
  //   surveys = await getSurveys();
  //   templates = await getTemplates();
  // }
  // async function getSurveys() {
  //   const response = await fetch(
  //     "https://amp.test.axelzublena.com/api/sessions"
  //   );
  //   const surveys = await response.json();
  //   return surveys;
  // }
  // async function getTemplates() {
  //   const response = await fetch(
  //     "https://amp.test.axelzublena.com/api/templates"
  //   );
  //   const templates = await response.json();
  //   return templates;
  // }
  // (async () => {
  //   await fetchData();
  // })();

  async function handleSubmit() {
    const formData = {
      emails: ["bobpanda.bp@gmail.com"],
      form_count: survey.participants,
      forms: [],
      template: survey.template.name,
      title: survey.title,
    };

    await fetch("https://amp.test.axelzublena.com/api/sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    // fetchData();
  }

  async function handleDelete(id:string) {
    await fetch(`https://amp.test.axelzublena.com/api/sessions/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    // fetchData();
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
        <label for="name">Participants</label>
        <input
          class="w-2/4 h-8 rounded-md border border-[#2b21181a]"
          type="text"
          bind:value={survey.participants}
        />
      </div>
      <div class="flex flex-row justify-between items-center">
        <label for="name">Template</label>
        <select
          class="w-2/4 rounded-md border border-[#2b21181a] pt-1 pb-1"
          bind:value={survey.template}
        >
          {#each templates as template}
            <option class="bg-color-layout" value={template}
              >{template.name}
            </option>{/each}
        </select>
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
  <p slot="header" class="text-color-text font-semibold text-center">Are you sure you want to delete this survey?</p>
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
  {#each surveys as survey}
    {@const date = new Date(survey.date_created).toLocaleDateString()}
    <Survey title={survey.title} {date}>
      <button
        class="bg-color-accent rounded-2xl w-14 h-14 flex justify-center items-center hover:brightness-90 transition duration-200"
        on:click={() => {
          goto(`/surveys/${survey._id}`);
        }}
      >
        <iconify-icon class="text-white" icon="uis:chart" width="36px" />
      </button>

      <button
        class="bg-color-accent rounded-2xl w-14 h-14 flex justify-center items-center hover:brightness-90 transition duration-200"
        on:click={() => (showDeleteModal = true)}
        on:click={() => (deleteId = survey._id)}
      >
        <iconify-icon class="text-white" icon="ph:trash-fill" width="40px" />
      </button>
    </Survey>
  {/each}
</div>
