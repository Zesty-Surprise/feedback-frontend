<script lang="ts">
  import { goto, invalidateAll } from "$app/navigation";
  import Modal from "$lib/components/Generic/Modal.svelte";
  import Survey from "$lib/components/Surveys/Survey.svelte";
  import { fetchAPI } from "$lib/functions";
  import { emptySurvey } from "./types";
  import CreateSurveyForm from "$lib/components/Surveys/CreateSurveyForm.svelte";
  export let data: any;

  let err: { fail: boolean; msg: string } = { fail: false, msg: "" };

  let showSurveyModal = false;
  let showDeleteModal = false;
  let deleteId: string;
  let survey = emptySurvey;

  const toggleSurveyModal = () => {
    showSurveyModal = !showSurveyModal;
  };
  const toggleDeleteModal = () => {
    showDeleteModal = !showDeleteModal;
  };

  const emailRegex = new RegExp(
    /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  );

  let isValidEmail = (value: string): boolean => {
    if (emailRegex.test(value) && value.includes(".com")) return true;
    return false;
  };

  let clearSurvey = () => {
    survey = {
      title: "",
      date_created: "",
      _id: "",
      template: {
        _id: "",
        name: "",
      },
      emails: [],
      deployed: false,
    };
    err = { fail: false, msg: "" };
  };

  let handleSubmit = async () => {
    if (
      survey.title.trim() === "" ||
      !survey.template._id ||
      !survey.template.name ||
      !Array.isArray(survey.emails) ||
      survey.emails.length === 0
    ) {
      err = { fail: true, msg: "Invalid survey submission" };
      return;
    }

    if (!survey.emails.every((email) => isValidEmail(email))) {
      err = { fail: true, msg: "Invalid email provided!" };
      return;
    }

    const formData = {
      emails: survey.emails,
      form_count: survey.emails.length,
      forms: [],
      template: survey.template._id,
      title: survey.title,
      deployed: false,
    };
    await fetchAPI("sessions", "POST", data.cookie, formData);
    invalidateAll();

    clearSurvey();
    toggleSurveyModal();
  };

  let handleDelete = async (id: string) => {
    await fetchAPI(`sessions/${id}`, "DELETE", data.cookie);
    toggleDeleteModal();
    invalidateAll();
  };
</script>

{#if data.filter != null}
  <div class="flex flex-wrap ml-10 mr-16">
    {#each [...data.sessions].reverse() as session}
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
      </Survey>
    {/each}
  </div>
{:else}
  <Modal bind:showModal={showSurveyModal}>
    <p slot="header" class="text-color-text font-semibold">
      Create a new survey
    </p>
    <CreateSurveyForm
      {handleSubmit}
      {survey}
      templates={data.templates}
      {err}
    />
  </Modal>

  <Modal bind:showModal={showDeleteModal}>
    <p slot="header" class="text-color-text font-semibold text-center">
      Are you sure you want to delete this survey?
    </p>
    <div class="pt-3 pb-2 self-center flex justify-center gap-5">
      <button
        class="text-white bg-red-500 hover:brightness-90 transition duration-200 focus:outline-none font-medium rounded-full text-md px-6 py-2 text-center"
        type="submit"
        on:click={() => handleDelete(deleteId)}
      >
        Delete
      </button>
      <button
        class="text-white bg-gray-300 hover:brightness-90 transition duration-200 focus:outline-none font-medium rounded-full text-md px-6 py-2 text-center"
        type="submit"
        on:click={toggleDeleteModal}
      >
        Cancel
      </button>
    </div>
  </Modal>

  <div class="relative mt-10 px-10 text-zinc-600">
    <h1 class="block text-xl font-medium">Survey's collection</h1>
    <p>All current survey overview</p>
  </div>
  <div class="flex flex-wrap ml-10 mr-16">
    <Survey title="Create a new survey">
      <button
        class="flex justify-center items-center h-full w-full"
        on:click={toggleSurveyModal}
      >
        <div
          class="bg-color-accent rounded-full w-14 h-14 flex justify-center items-center"
        >
          <iconify-icon class="text-white" icon="typcn:plus" width="48px" />
        </div>
      </button>
    </Survey>
    {#each [...data.sessions].reverse() as session}
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
          on:click={() => {
            deleteId = session._id;
            toggleDeleteModal();
          }}
        >
          <iconify-icon class="text-white" icon="ph:trash-fill" width="40px" />
        </button>
      </Survey>
    {/each}
  </div>
{/if}
