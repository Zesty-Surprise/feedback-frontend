
<script lang="ts">
  import Modal from "$lib/components/Generic/Modal.svelte";
  import { fetchAPI } from "$lib/functions";
  let modelDeploy = false;
  export let data: any;

  const toggle = () => {
    modelDeploy = !modelDeploy;
  }

  const deployForms = async () =>{
    console.log("triggered");
    const response = await fetchAPI("email/send/" + data.session._id, "GET", data.cookie)
    toggle()
  }

</script>

<Modal bind:showModal={modelDeploy} >
  <p slot="header" class="text-color-text font-semibold text-center">
    Are you sure you want to deploy this session?
  </p>
  <div class="pt-3 pb-2 self-center flex justify-center gap-5">
    <button
      class="text-white bg-green-500 hover:brightness-90 transition duration-200 focus:outline-none font-medium rounded-full text-md px-6 py-2 text-center"
      type="submit"
      on:click={deployForms}
    >
      Deploy
    </button>
    <button
      class="text-white bg-red-300 hover:brightness-90 transition duration-200 focus:outline-none font-medium rounded-full text-md px-6 py-2 text-center"
      type="submit"
      on:click={toggle}
    >
      Cancel
    </button>
  </div>
</Modal>

<button
class="text-white bg-green-500 hover:brightness-90 transition duration-200 focus:outline-none font-medium rounded-full text-md px-6 py-2 text-center mt-5 ml-10"
type="submit"
on:click={toggle}
>
Deploy emails
</button>
<img class="ml-8 mt-2 w-3/4" src="/src/images/score.png" alt="dasda">
<div class="grid grid-cols-2 grid-rows-1 gap-4 w-3/4 ml-10 mt-2">
  <div class="row-span-2 h-full">
    <div class="bg-color-highlight text-black p-8 rounded-lg">
      <p class="text-2xl font-bold">CURRENT ENPS: {data.session.score}</p>
    </div>
  </div>
  <div class="row-span-2 ">
    <div class="bg-color-highlight text-black p-8 rounded-lg">
      <p class="text-2xl font-bold">COMPLETED FORMS: {data.session.completed}</p>
    </div>
  </div>
</div>
