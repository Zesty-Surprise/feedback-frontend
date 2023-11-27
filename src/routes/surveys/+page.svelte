<script lang="ts">
  import Modal from "$lib/components/Generic/Modal.svelte";
  import Survey from "$lib/components/Surveys/Survey.svelte";


  const surveys = [
  {
    title: "eNPS Survey",
    date: "19.10.2023",
    id: "123122213",
  },
  {
    title: "eNPS Survey",
    date: "19.10.2023",
    id: "123122213",
  },
  {
    title: "eNPS Survey",
    date: "19.10.2023",
    id: "123122213",
  },
  {
    title: "eNPS Survey",
    date: "19.10.2023",
    id: "123122213",
  },
  {
    title: "eNPS Survey",
    date: "19.10.2023",
    id: "123122213",
  },
  {
    title: "eNPS Survey",
    date: "19.10.2023",
    id: "123122213",
  },
  {
    title: "eNPS Survey",
    date: "19.10.2023",
    id: "123122213",
  },
];

let showModal = false;
let options = [
  'eNPS',
  'bar',
  'baz',
  'bar',
  'baz',
  'bar',
  'baz',
];
let selected = options[0];

function handleSubmit(){
  console.log("submit")
}
</script>

<Modal bind:showModal>
<p slot="header" class="text-color-text font-semibold">
  Create a new survey
</p>

<form on:submit|preventDefault={handleSubmit}>
  <div class="flex flex-col mt-8 ml-8 mr-8 gap-6 text-color-text">
    <div class="flex flex-row justify-between items-center">
      <label>Title</label>
      <input class="w-2/4 h-8 rounded-md border border-[#2b21181a]" type="text"/>
    </div>
    <div class="flex flex-row justify-between items-center">
      <label>Participants</label>
      <input class="w-2/4 h-8 rounded-md border border-[#2b21181a]" type="text" />
    </div>
    <div class="flex flex-row justify-between items-center">
      <label>Type</label>
      <select class="w-2/4 rounded-md border border-[#2b21181a] pt-1 pb-1" bind:value={selected}>
        {#each options as value}<option class="bg-color-layout" {value}>{value}</option>{/each}
      </select>
    </div>
    <div class="pt-3 pb-2 self-center">
      <button class="text-white bg-color-accent hover:brightness-90 transition duration-200 focus:outline-none font-medium rounded-full text-md px-6 py-2 text-center" type="submit" on:click={() => (showModal = false)}>
        Create
      </button>
    </div>
  </div>
  
</form>
</Modal>

<div class="flex flex-wrap ml-12 mr-16">
  <Survey title="Create a new survey">
      <button class="flex justify-center items-center h-full w-full" on:click={() => (showModal = true)}>
        <div class="bg-color-accent rounded-full w-14 h-14 flex justify-center items-center">
          <iconify-icon icon="typcn:plus" width=48px/>
        </div>
      </button>
  </Survey>
  {#each surveys as survey}
      <Survey title={survey.title} date={survey.date} isLink href={"/surveys/"+survey.id}/>
  {/each}
</div>
