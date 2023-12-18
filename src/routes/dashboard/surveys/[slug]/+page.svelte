<script lang="ts">
    import Modal from "$lib/components/Generic/Modal.svelte";
    import { fetchAPI } from "$lib/functions";
    let modelDeploy = false;
    export let data: any;

  const toggle = () => {
    modelDeploy = !modelDeploy;
  }

  const deployForms = async () =>{
    const response = await fetchAPI("email/send/" + data.session._id, "GET", data.cookie)
    toggle()
  }
  
  let promoters = data.session.promoters;
  let demoters = data.session.demoter;
  let passives = data.session.passive;

  let total = promoters + demoters + passives;

  let promotersPercent = (promoters / total) * 100;
  let demotersPercent = (demoters / total) * 100;
  let passivesPercent = (passives / total) * 100;
  
    let summa = 0
    data.session.forms.forEach((element) => {
      summa += element.score
    });

    let written = 0

    data.session.forms.forEach((element) => {
      if (element.completed) {
        if (element.custom.length > 0){
          written++;
        } 
      }
    });

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
<div class="grid grid-cols-2 grid-rows-1 gap-4 w-3/4 m-10">
  <div class="row-span-2 h-full">
    <div class="flex flex-col bg-white text-black p-8 rounded-lg">
      <div class="flex justify-between">
        <div class="text-center rounded-2xl bg-color-accent p-2">
          <p class="text-white font-bold w-1/4 text-md">
            eNPS
          </p>
        </div>
        {#if data.session.deployed}
          <div
          class="text-orange-500 border-solid border-2 border-orange-500 hover:bg-orange-200 transition duration-200 focus:outline-none font-medium rounded-xl text-md px-6 py-2 text-center"
          >
            Emails Deployed
          </div>
        {:else}
          <button
              class="text-green-500 border-solid border-2 border-green-500 hover:bg-green-200 transition duration-200 focus:outline-none font-medium rounded-xl text-md px-6 py-2 text-center"
              type="submit"
              on:click={toggle}
              >
            Deploy emails
          </button>
        {/if}

      </div>
      <div class="flex justify-center p-4 m-5 ">
        <div
            class="w-40 h-40 rounded-full  
                inline-flex items-center justify-center  
                border-solid border-8 border-green-500"> 
                <p class="text-6xl ">{data.session.score.toFixed()}</p>
        </div> 
      </div>
      <div class="flex justify-between">
        <div class="flex flex-col">
            <div class="flex">
              <p class="text-lg font-">Average Score</p>
            </div>
            <div class="flex">
              <p class="text-2xl font-light text-zinc-500">
                <strong class="text-black text-4xl">
                  {(summa/data.session.forms.length).toFixed(1)}
                </strong>
                / 10
              </p>
            </div>
        </div>
        <div class="flex flex-col w-2/4">
          <div class="flex justify-stretch gap-2 m-2 bg-color-layout p-2 rounded-xl">
            <div class="bg-green-500 w-1/6 rounded-md">
              <p class="text-green-500">0</p>
            </div>
            <div class="w-2/6">
              <p class="font-bold">
                {promotersPercent.toFixed(1)}%
              </p>
            </div>
            <div class="w-3/6 text-zinc-500">
              Promoters
            </div>
          </div>
          <div class="flex justify-stretch gap-2 m-2 bg-color-layout p-2 rounded-xl">
            <div class="bg-yellow-500 w-1/6 rounded-md">
              <p class="text-yellow-500">0</p>
            </div>
            <div class="w-2/6">
              <p class="font-bold">
                {passivesPercent.toFixed(1)}%
              </p>
            </div>
            <div class="w-3/6 text-zinc-500">
              Passives
            </div>
          </div>
          <div class="flex justify-stretch gap-2 m-2 bg-color-layout p-2 rounded-xl">
            <div class="bg-red-500 w-1/6 rounded-md">
              <p class="text-red-500">0</p>
            </div>
            <div class="w-2/6">
              <p class="font-bold">
                {demotersPercent.toFixed(1)}%
              </p>
            </div>
            <div class="w-3/6 text-zinc-500">
              Demoters
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <div class="row-span-2 h-full">
    <div class="flex flex-col bg-white text-black p-8 rounded-lg">
      <div class="flex">
        <div class="items-center align-center rounded-2xl bg-color-accent p-2">
          <p class="text-white font-bold w-1/4 text-md">
            Engagement
          </p>
        </div>
      </div>
      <div class="flex justify-center p-4 m-5">
        <div
            class="w-40 h-40 rounded-full  
                inline-flex items-center justify-center  
                border-solid border-8 border-green-500"> 
                <p class="text-6xl ">{data.session.completed}</p>
        </div> 
      </div>
      <div class="flex justify-between">
        <div class="flex flex-col">
            <div class="flex">
              <p class="text-lg font-">Written feedback</p>
            </div>
            <div class="">
              <p class="text-2xl font-light text-zinc-500">
                <strong class="text-black">
                {written}
                </strong>
                / {data.session.participants}
              </p>
            </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <img class="ml-8 mt-2 w-3/4" src="/src/images/score.png" alt="dasda"> -->
</div>
