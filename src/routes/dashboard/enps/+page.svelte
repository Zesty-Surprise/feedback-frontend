<script lang="ts">
  import Plotly from "plotly.js-dist-min";
  import FilterModal from "$lib/components/FilterModal.svelte";
  import { fetchAPI } from "$lib/functions.js";

  export let data;

  let showModal = false;
  let formData: Object;
  let checkedCheckboxes: String;
  let dataGraph: Object;
  let layout = {
    height: window.screen.height - 250,
    width: window.screen.width - 275,
    yaxis: {
      range: [-100, 100],
    },
    paper_bgcolor: "#FCF8F4",
    plot_bgcolor: "#FCF8F4",
  };
  let dataY: Array<number> = [];
  let dataX: Array<string> = [];

  fetchAPI("sessions", "GET", data.cookie)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return response.json();
    })
    .then((data) => {
      formData = data;
    })
    .catch((error) => {
      console.error("Fetch error:", error);
    });

  //   fetch("http://localhost:8000/api/sessions")

  let loadChartData = setInterval(() => {
    if (formData != undefined) {
      for (const value of Object.values(formData)) {
        dataY.push(Math.round((value.score + Number.EPSILON) * 100) / 100);
        dataX.push(value._id);
      }

      dataGraph = [
        {
          x: dataX,
          y: dataY,
          type: "bar",
          marker: {
            color: "rgba(118, 137, 72, 0.40)",
          },
          text: dataY,
          textposition: "inside",
          insidetextanchor: "middle",
          textfont: {
            color: "white",
          },
        },
      ];
      clearInterval(loadChartData);
    }

    setTimeout(() => {
      Plotly.newPlot("barChart", dataGraph, layout);
    }, 1000);
  }, 1);

  function setModal() {
    showModal = !showModal;
  }

  function handleCheckboxesChanged(event) {
    checkedCheckboxes = event.detail;
    getFilteredDepartments();
  }

  async function getFilteredDepartments() {
    let response = await fetchAPI(
      "sessions/" + formData[0]._id + "?dep=" + checkedCheckboxes,
      "GET",
      data.cookie
    );
    let session = await response.json();
    await updateGraph(session);
  }

  function updateGraph(data: Object) {
    let roundedScore = Math.round((data.score + Number.EPSILON) * 100) / 100;
    let newdata = [
      {
        x: [data.template],
        y: [roundedScore],
        text: [roundedScore],
        type: "bar",
        marker: {
          color: "rgba(118, 137, 72, 0.40)",
        },
        textposition: "inside",
        insidetextanchor: "middle",
        textfont: {
          color: "white",
        },
      },
    ];

    Plotly.react("barChart", newdata, layout);
  }
</script>

<div class="subHeader">
  <button class="button" on:click={setModal}
    ><img src="/src/images/filter.svg" alt="Zesty Surprise" /><strong
      >Filter</strong
    ></button
  >
</div>
<div>
  <div id="barChart" />
</div>
{#if showModal}
  <FilterModal bind:showModal on:checkboxesChanged={handleCheckboxesChanged} />
{/if}

<style>
  .subHeader {
    padding: 32px 0 0;
  }

  .button {
    align-items: center;
    background-color: #de896e;
    border-radius: 70px;
    display: flex;
    gap: 4px;
    padding: 8px 16px 10px;
    transition: 0.3s;
    margin-left: 48px;
  }

  .button img {
    max-width: 25px;
    max-height: 25px;
  }

  .button:hover,
  .button:focus-visible {
    opacity: 75%;
  }
</style>
