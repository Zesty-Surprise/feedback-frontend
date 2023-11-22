<script lang="ts">
  import { onMount } from "svelte";
  import ApexCharts from "apexcharts";
  import { eNPSData } from "$lib/functions";

  let chartElement: HTMLDivElement; // The container where you want to render the chart
  let options = {
    chart: {
      type: "bar", // Set chart type to 'bar' for a bar chart
    },
    series: [
      {
        name: "Feedback",
        data: [10, 30, 20], // Data for each bar
      },
    ],
    xaxis: {
      categories: ["Promoters (9-10)", "Passives (7-8)", "Detractors (0-6)"], // Labels for each bar
    },
    yaxis: {
      title: {
        text: "Percentage", // Y-axis title
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "60%", // Adjust the width of the bars (space between bars)
      },
    },
  };

  onMount(() => {
    let chart = new ApexCharts(chartElement, options);
    chart.render();
    eNPSData();
  });
</script>

<div>
  <div class="flex justify-center">
    <h1 class="py-5">eNPS</h1>
  </div>
  <div class="p-5">
    <button>Filter</button>
  </div>
</div>

<div class="max_width">
  <div bind:this={chartElement} />
</div>

<style>
  .max_width {
    width: 70%;
  }
</style>
