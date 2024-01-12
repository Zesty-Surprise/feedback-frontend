<script lang="ts">
  import { emptySurvey } from "../../../routes/dashboard/surveys/types";

  export let err: { fail: boolean; msg: string };
  export let handleSubmit: () => void;
  export let survey = emptySurvey;
  export let templates = [survey.template];
  const regex = "[a-zA-Z]{2,}";

  let emailCount = 0;

  const onInput = (e) => {
    const value = e.target.value;

    let entries = value
      .replace(/\s/g, "")
      .split(",")
      .filter((n) => n);
    entries = entries.filter((item, index) => entries.indexOf(item) === index);

    survey.emails = entries;
  };

  const handleKeyDown = (e) => {
    if (e.code === "Space" || e.code === "Enter") e.preventDefault();
  };
</script>

<form method="dialog" on:submit|preventDefault={handleSubmit}>
  <div class="flex flex-col mt-4 mb-2 gap-3 text-color-text">
    <div class="w-full flex flex-col">
      <div class="w-full flex flex-col mb-2">
        <label for="emails">Recipients</label>
        <p class="text-xs text-color-text_light">
          Provide valid email addresses
        </p>
      </div>
      <textarea
        name="emails"
        class="rounded-md border border-[#2b21181a] focus:border-color-highlight focus:ring-color-highlight"
        on:input={onInput}
        on:keydown={handleKeyDown}
        required
      />
      {#if err.fail}<p class="text-red-500 italic text-xs mt-1 font-bold">
          {err.msg}
        </p>{/if}
    </div>

    <div class="w-full flex flex-col">
      <div class="w-full flex flex-col mb-2">
        <label for="title" class="">Title</label>
        <p class="text-xs text-color-text_light">Write valid survey tittle</p>
      </div>
      <input
        class="rounded-md border border-[#2b21181a] focus:border-color-highlight focus:ring-color-highlight"
        type="text"
        bind:value={survey.title}
        required
        pattern={regex}
      />
    </div>
    <div class="w-full flex flex-col">
      <div class="w-full flex flex-col mb-2">
        <label for="title" class="">Template</label>
        <p class="text-xs text-color-text_light">Select survey template</p>
      </div>
      <select
        class="rounded-md border border-[#2b21181a] focus:border-color-highlight focus:ring-color-highlight"
        bind:value={survey.template}
        required
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
      >
        Create
      </button>
    </div>
  </div>
</form>
