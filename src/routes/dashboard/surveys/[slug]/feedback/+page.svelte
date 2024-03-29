<script lang="ts">
  import FilterModal from "$lib/components/FilterModal.svelte";
  import { filter } from "@skeletonlabs/skeleton";

  export let data: any;
  let forms = data.completedForms;

  let showModal: boolean = false;
  let checkedBox: string;
  $: previousFilter = checkedBox;

  function handleCheckboxesChanged(event: any) {
    checkedBox = event.detail;
    if (checkedBox == undefined || checkedBox == "") {
      forms = data.completedForms;
    } else {
      forms = filterForms(data.completedForms, checkedBox);
    }

    currentPage = 0;
    maxPages = Math.ceil(forms.length / chunkSize) - 1;

    currentForms = chunkedForms(forms, currentPage);
  }

  function filterForms(forms: Array<any>, department: string) {
    let array = [];
    for (let i = 0; i < forms.length; i++) {
      if (forms[i].department == department) {
        array.push(forms[i]);
      }
    }
    return array;
  }

  let currentPage: number = 0;
  let chunkSize = forms.length <= 8 ? forms.length : 8;
  let maxPages = forms.length / chunkSize - 1;

  let currentForms = chunkedForms(forms, currentPage);

  function chunkedForms(forms: Array<any>, currentPage: number) {
    let selectedForms: Array<any> = [];

    for (let i = 0; i < forms.length; i++) {
      if (i >= chunkSize * currentPage && i < chunkSize * (currentPage + 1)) {
        selectedForms.push(forms[i]);
      }
    }
    return selectedForms;
  }
  function nextPage() {
    if (currentPage < maxPages) {
      currentPage++;
      currentForms = chunkedForms(forms, currentPage);
    }
  }
  function previousPage() {
    if (currentPage > 0) {
      currentPage--;
      currentForms = chunkedForms(forms, currentPage);
    }
  }
</script>

{#if forms[0] != undefined}
  {#if data.filter === null}
    <div class="mt-10 mb-6">
      <button
        class="flex items-center bg-[#de896e] rounded-full gap-1 pt-[8px] px-[16px] pb-[10px] ml-10"
        on:click={() => (showModal = !showModal)}
        ><img
          src="/images/filter.svg"
          alt="Zesty Surprise"
          class="max-w-[25px] max-h-[25px]"
        /><strong class="text-white">Filter</strong></button
      >
    </div>
  {/if}
  <div class="mr-16 ml-10 w-full justify-between">
    <!-- Feedback (page) -->
    <div class="divide-y divide-gray-200">
      {#each currentForms as form}
        <div
          class="flex flex-horizontal items-center divide-x divide-gray-200 py-2"
        >
          <div class="flex justify-center w-24 py-2">
            <div
              class="bg-{form.type} font-semibold rounded-full flex items-center justify-center w-12 h-12 text-2xl text-white"
            >
              {form.score}
            </div>
          </div>
          <div class="px-2">
            <div class="text-gray-700 mb-1">
              Team {form.department}
            </div>
            {#if form.custom.length === 0}
              <div class="h-full italic">Survey Form has no Feedback</div>
            {:else}
              {#each form.custom as questions}
                <div class="flex flex-col mb-1">
                  {#if data.template.detail !== "Forbidden"}
                    {#each data.template.components as comp}
                      {#if comp.id === questions.id}
                        <p class="text-xs">
                          Question {questions.id - 1}: "{comp.custom_text}"
                        </p>
                      {/if}
                    {/each}
                  {:else}
                    <p class="text-xs">
                      Question {questions.id - 1}
                    </p>
                  {/if}
                  {#if questions.custom === ""}
                    <p class="text-xs italic">Question left empty</p>{:else}
                    <p class="text-xs">
                      Answer: {questions.custom}
                    </p>
                  {/if}
                </div>
              {/each}
            {/if}
          </div>
        </div>
      {/each}
    </div>

    <!-- Page selector -->
    <div class="flex flex-col justify-center items-center sticky top-[80vh]">
      <!-- Help text -->
      <span class="text-sm text-gray-700">
        Showing <span class="font-semibold text-gray-900"
          >{currentPage * chunkSize + 1}</span
        >
        to
        <span class="font-semibold text-gray-900"
          >{currentPage * chunkSize + currentForms.length}</span
        >
        of
        <span class="font-semibold text-gray-900">{forms.length}</span> Entries
      </span>
      <!-- Buttons -->
      <div class="inline-flex mt-2 xs:mt-0">
        <button
          on:click={previousPage}
          class="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-s hover:bg-gray-100"
        >
          Prev
        </button>
        <button
          on:click={nextPage}
          class="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-e hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  </div>
{:else}
  <div class="mt-10 mb-6">
    <button
      class="flex items-center bg-[#de896e] rounded-full pt-[8px] px-[16px] pb-[10px] ml-10"
      on:click={() => (showModal = !showModal)}
      ><img
        src="/images/filter.svg"
        alt="Zesty Surprise"
        class="max-w-[25px] max-h-[25px]"
      /><strong class="text-white">Filter</strong></button
    >
  </div>
  <h1 class="h-full flex justify-center items-center text-4xl">
    No feedback to display
  </h1>
{/if}

{#if showModal}
  <FilterModal
    bind:showModal
    bind:previousFilter
    on:checkboxesChanged={handleCheckboxesChanged}
  />
{/if}
