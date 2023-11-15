<script lang="ts">
  import { onMount } from "svelte";
  import ApexCharts from "apexcharts";

  let chartElement: HTMLDivElement; // The container where you want to render the chart
  let options = {
    series: [76],
    chart: {
      type: "radialBar",
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: "#999",
            opacity: 1,
            blur: 2,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: "22px",
          },
        },
      },
    },
    grid: {
      padding: {
        top: -10,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "light",
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
      },
    },
    labels: ["Average Results"],
  }; // Customize this object with your chart options

  onMount(() => {
    let chart = new ApexCharts(chartElement, options);
    chart.render();
  });
</script>

<div>
  <div class="flex justify-center">
    <h1 class="py-5">eNPS</h1>
  </div>
</div>
<div class="grid grid-cols-2 gap-4">
  <div>
    <div bind:this={chartElement} />
  </div>
  <!-- second column -->
  <div class="flex flex-col">
    <div>
      <div class="border border-500 p-4 m-2 flex items-center">
        <div class="bg-green-500 h-8 w-8 mr-2" />
        <p>10%</p>
        <!-- Content for the first column -->
        <div class="flex content-center">
          <p>Promoters (9-10)</p>
        </div>
      </div>
    </div>

    <div class="border border-500 p-4 m-2 flex items-center">
      <div class="bg-blue-500 h-8 w-8 mr-2" />
      <p>10%</p>
      <!-- Content for the second column -->
      <p>Neutral (7-8)</p>
    </div>
    <div class="border border-500 p-4 m-2 flex items-center">
      <div class="bg-red-500 h-8 w-8 mr-2" />
      <p>10%</p>
      <!-- Content for the third column -->
      <p>Detractors (0-6)</p>
    </div>
  </div>
</div>
