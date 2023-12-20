<script lang="ts">
  import {
    destinations,
    emptySurvey,
  } from "../../../routes/dashboard/surveys/types";

  export let handleSubmit: () => void;
  export let survey = emptySurvey;
  export let templates = [survey.template];
  export let recipientLists = destinations;
  const regex = "[a-zA-Z]{2,}";
</script>

<form method="dialog" on:submit|preventDefault={handleSubmit}>
  <div class="flex flex-col mt-8 ml-8 mr-8 gap-6 text-color-text">
    <div class="flex flex-row justify-between items-center">
      <label for="title">Title</label>
      <input
        class="w-2/4 h-8 rounded-md border border-[#2b21181a] focus:border-color-highlight focus:ring-color-highlight"
        type="text"
        bind:value={survey.title}
        required
        pattern={regex}
      />
    </div>
    <div class="flex flex-row justify-between items-center">
      <label for="template">Template</label>
      <select
        class="w-2/4 rounded-md border border-[#2b21181a] pt-1 pb-1 focus:border-color-highlight focus:ring-color-highlight"
        bind:value={survey.template}
        required
      >
        {#each templates as template}
          <option class="bg-color-layout" value={template}
            >{template.name}
          </option>{/each}
      </select>
    </div>
    <div class="flex flex-row justify-between items-center">
      <label for="recipients">Recipients</label>
      <select
        class="w-2/4 rounded-md border border-[#2b21181a] pt-1 pb-1 focus:border-color-highlight focus:ring-color-highlight"
        bind:value={survey.emails}
        required
      >
        {#each recipientLists as recipientList}
          <option class="bg-color-layout" value={recipientList.recipients}
            >{recipientList.name}
          </option>{/each}
      </select>
    </div>
    <!-- <div class="w-full">
      <InputChip
        class="p-1 pl-2 rounded-md border border-[#2b21181a] bg-white"
        bind:value={survey.emails}
        name="chips"
        placeholder="Enter a valid email"
        required
        chips="text-white text-[15px] font-medium pl-2 pr-2 pb-1 pt-1 rounded-md bg-color-accent"
        invalid="!bg-[#fabbb6] text-[#780e00]"
        padding="p-0"
        validation={isValidEmail}
      />
    </div> -->
    <div class="pt-3 pb-2 self-center">
      <button
        class="text-white bg-color-accent hover:brightness-90 transition duration-200 focus:outline-none font-medium rounded-full text-md px-6 py-2 text-center"
        type="submit"
      >
        Create
      </button>
    </div>
  </div>
</form>
