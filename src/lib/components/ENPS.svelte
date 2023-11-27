<script lang="ts">
  //   import { eNPSData } from "$lib/functions";
  import Plotly from "plotly.js-dist-min";
  import FilterModal from "$lib/components/FilterModal.svelte";

  let showModal = true;

  // Sample data for the bar chart
  var data = [
    {
      x: [
        "Category 1",
        "Category 2",
        "Category 3",
        "Category 4",
        "Category 5",
        "Category 6",
      ],
      y: [90, 20, 15, -20, 75, -49],
      type: "bar",
      marker: {
        color: "rgba(118, 137, 72, 0.40)",
      },
      text: [90, 20, 15, -20, 75, -49],
      textposition: "inside",
      insidetextanchor: "middle",
      textfont: {
        color: "white",
      },
    },
  ];

  // Layout settings for the chart
  var layout = {
    height: 750,
    width: window.screen.width - 275,
    yaxis: {
      range: [-100, 100],
    },
    paper_bgcolor: "#FCF8F4",
    plot_bgcolor: "#FCF8F4",
  };

  function setModal() {
    showModal = !showModal;
  }

  // Create the bar chart using Plotly
  setTimeout(() => {
    Plotly.newPlot("barChart", data, layout);
  }, 1000);
</script>   

<div class="subHeader">
  <button 
  class="button"
  on:click={setModal}
    ><img src="/src/images/filter.svg" alt="Zesty Surprise" /><strong
      >Filter</strong
    ></button
  >
</div>
<div>
  <div id="barChart" />
</div>
{#if showModal}
  <FilterModal
    bind:showModal={showModal}
  />
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
