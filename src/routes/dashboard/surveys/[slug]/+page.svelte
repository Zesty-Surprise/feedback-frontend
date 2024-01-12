<script lang="ts">
  import Modal from "$lib/components/Generic/Modal.svelte";
  import Plotly from "plotly.js-dist-min";
  import ApexCharts from "apexcharts";
  import { fetchAPI } from "$lib/functions";
  import { onMount } from "svelte";

  let showDeployModal = false;
  export let data: any;

  const toggleDeployModal = () => {
    showDeployModal = !showDeployModal;
  };

  const deployForms = async () => {
    const response = await fetchAPI(
      "email/send/" + data.session._id,
      "GET",
      data.cookie
    );
    toggleDeployModal();
  };

  let enps = data.session.score;
  let promoters = data.session.promoters;
  let demoters = data.session.demoter;
  let passives = data.session.passive;
  let total = promoters + demoters + passives;

  let engagement = (data.session.completed / data.session.participants) * 100;

  let promotersPercent = (promoters / total) * 100;
  let demotersPercent = (demoters / total) * 100;
  let passivesPercent = (passives / total) * 100;

  let sum = 0;
  data.session.forms.forEach((element: any) => {
    sum += element.score;
  });

  let written = 0;

  data.session.forms.forEach((element: any) => {
    if (element.completed) {
      if (element.custom.length > 0) {
        written++;
      }
    }
  });

  function getGaugeColor() {
    if (enps <= 0) {
      return "#de896e";
    } else if (enps < 20 && enps >= 1) {
      return "yellow";
    } else {
      return "#00c100";
    }
  }

  function engagementGauge() {
    if (engagement < 50) {
      return "#fe5252";
    } else {
      return "#00c100";
    }
  }

  onMount(() => {
    let data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: enps,
        type: "indicator",
        mode: "gauge+number",
        delta: { reference: 75 },
        gauge: {
          axis: { range: [-100, 100] },
          bar: { color: getGaugeColor(), thickness: 1 },
          steps: [{ range: [-100, 100], color: "white" }],
          bordercolor: "transparent",
        },
      },
    ];

    let layout = {
      width: 350,
      height: 135,
      margin: { t: 0, b: 0 },
    };

    let options = {
      chart: {
        height: 200,
        type: "radialBar",
      },
      series: [engagement],
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 15,
            size: "70%",
          },
          dataLabels: {
            showOn: "always",
            name: {
              offsetY: -10,
              show: false,
              color: "#888",
              fontSize: "13px",
            },
            value: {
              color: "#111",
              fontSize: "30px",
              show: true,
            },
          },
        },
      },
      fill: {
        colors: [engagementGauge],
        opacity: 0.9,
        type: "solid",
      },
      stroke: {
        lineCap: "round",
      },
      labels: ["Progress"],
    };

    setTimeout(() => {
      Plotly.newPlot("enpsChart", data, layout);
      let chart = new ApexCharts(document.getElementById("chart"), options);
      chart.render();
    }, 50);
  });
</script>

{#if data.filter !== undefined}
  <Modal bind:showModal={showDeployModal}>
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
        on:click={toggleDeployModal}
      >
        Cancel
      </button>
    </div>
  </Modal>
{/if}

<div class="grid grid-cols-2 auto-rows-min gap-4 m-5">
  <div
    class="flex flex-col bg-white text-color-text p-6 rounded-lg justify-between h-fit"
  >
    <div class="flex justify-between">
      <div
        class="flex items-center text-center rounded-full bg-color-accent px-4"
      >
        <p class="text-white font-bold text-lg">eNPS</p>
      </div>
      {#if data.filter === null}
        {#if data.session.deployed}
          <div
            class="text-orange-500 border-solid border-2 border-orange-500 hover:bg-orange-200 transition duration-200 focus:outline-none font-medium rounded-xl text-md px-6 py-2 text-center"
          >
            Emails Sent
          </div>
        {:else}
          <button
            class="text-green-500 border-solid border-2 border-green-500 hover:bg-green-200 transition duration-200 focus:outline-none font-medium rounded-xl text-md px-6 py-2 text-center"
            type="submit"
            on:click={toggleDeployModal}
          >
            Send emails
          </button>
        {/if}
      {/if}
    </div>
    <div class="flex justify-center m-10">
      <div class="pointer-events-none" id="enpsChart" />
    </div>
    <div class="flex justify-between">
      <div class="flex flex-col ml-2">
        <div class="flex mb-6">
          <p class="text-lg text-color-text">Average Score</p>
        </div>
        <div class="flex">
          <p class="text-2xl font-light text-zinc-500">
            <strong class="text-color-text text-5xl">
              {data.session.completed > 0
                ? (sum / data.session.completed).toFixed(1)
                : "0"}
            </strong>
            / 10
          </p>
        </div>
      </div>
      <div class="flex flex-col w-52">
        <div class="flex justify-between mb-6">
          <div class="bg-promoter w-5 h-5 rounded-md self-center" />
          <p class="font-bold text-sm">
            {promotersPercent > 0 ? promotersPercent.toFixed(1) : "0"}%
          </p>
          <p class="text-sm self-center text-color-text_light w-28">
            Promoters (9-10)
          </p>
        </div>
        <div class="flex justify-between mb-6">
          <div class="bg-neutral w-5 h-5 rounded-md self-center" />
          <p class="font-bold text-sm">
            {passivesPercent > 0 ? passivesPercent.toFixed(1) : "0"}%
          </p>
          <p class="text-sm self-center text-color-text_light w-28">
            Passives (7-8)
          </p>
        </div>
        <div class="flex justify-between">
          <div class="bg-detractor w-5 h-5 rounded-md self-center" />
          <p class="font-bold text-sm">
            {demotersPercent > 0 ? demotersPercent.toFixed(1) : "0"}%
          </p>
          <p class="text-sm self-center text-color-text_light w-28">
            Detractors (0-6)
          </p>
        </div>
      </div>
    </div>
  </div>

  <div
    class="flex flex-col bg-white text-color-text p-6 rounded-lg justify-between"
  >
    <div
      class="flex items-center align-center rounded-full bg-color-accent px-4 py-2 w-fit"
    >
      <p class="text-white font-bold w-1/4 text-lg">Engagement</p>
    </div>
    <div class="flex justify-center">
      <div id="chart" />
    </div>
    <div class="flex justify-between">
      <div class="flex flex-col">
        <div class="flex">
          <p class="text-md font-">Completed by</p>
        </div>
        <div class="">
          <p class="text-xl font-light text-zinc-500">
            <strong class="text-black">
              {data.session.completed}
            </strong>
            / {data.session.participants}
          </p>
        </div>
      </div>
    </div>
    <div class="flex justify-between mt-4">
      <div class="flex flex-col">
        <div class="flex">
          <p class="text-md font-">Feedback submitted</p>
        </div>
        <div class="">
          <p class="text-xl font-light text-zinc-500">
            <strong class="text-black">
              {written}
            </strong>
            / {data.session.completed}
          </p>
        </div>
      </div>
    </div>
  </div>
  <div
    class="flex flex-col bg-white text-color-text p-6 rounded-lg justify-between h-fit col-span-2"
  >
    <div
      class="flex items-center align-center rounded-full bg-color-accent px-3 py-2 mb-4 w-fit"
    >
      <p class="text-white font-bold w-fit text-md">Recent feedback</p>
    </div>
    {#if data.completedForms[0] != undefined}
      <div class="divide-y divide-gray-200">
        {#each data.completedForms.slice(-3).reverse() as form}
          <div
            class="flex flex-horizontal items-center divide-x divide-gray-200 py-2"
          >
            <div class="flex justify-center w-24 py-2">
              <div
                class="bg-{form.type} font-semibold rounded-full flex items-center justify-center w-10 h-10 text-2xl text-white"
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
    {:else}
      <h1 class="flex justify-start items-center text-xl mt-6 text-color-text">
        No feedback to display
      </h1>
    {/if}
  </div>
</div>
