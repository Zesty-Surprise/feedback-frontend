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
        colors: ["#555", "#000", "#666"],
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: false,
            top: 2,
            left: 0,
            color: "#000",
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
            fontSize: "42px",
            color: "white",
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

<div class="homepage">
  <div class="homepage__enps">
    <h1>eNPS</h1>
  </div>
  <div class="homepage__info">
    <div class="homepage__pie-chart-wrapper">
      <div class="homepage__pie-chart" bind:this={chartElement} />
    </div>
    <!-- second column -->
    <div class="homepage__stats">
      <div>
        <!-- Content for the first column -->
        <div class="homepage__bar">
          <div class="homepage__colour green" />
          <div class="homepage__percentage">
            <p>61.9%</p>
          </div>
          <div class="homepage__type">
            <p>Promoters (9-10)</p>
          </div>
        </div>
      </div>

      <div class="homepage__bar">
        <div class="homepage__colour grey" />
        <div class="homepage__percentage">
          <p>28.3%</p>
        </div>
        <div class="homepage__type">
          <p>Neutrals (7-8)</p>
        </div>
      </div>

      <div class="homepage__bar">
        <div class="homepage__colour red" />
        <div class="homepage__percentage">
          <p>9.7%</p>
        </div>
        <div class="homepage__type">
          <p>Detractors (1-6)</p>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .homepage {
    display: flex;
    flex-direction: column;
    gap: 32px;
    left: 0;
    margin-top: 32px;
    position: absolute;
    width: 100vw;
    z-index: -1;
  }

  .homepage__enps {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .homepage__enps h1 {
    background-color: #f5e5d3;
    border-radius: 15px;
    padding: 8px 24px;
  }

  .homepage__info {
    display: flex;
    /* justify-content: space-evenly; */
    justify-content: center;
    gap: 160px;
    width: 100%;
  }

  .homepage__pie-chart {
    width: 500px;
  }

  .homepage__stats {
    display: flex;
    flex-direction: column;
    gap: 32px;
  }

  .homepage__bar {
    background-color: white;
    border-radius: 15px;
    display: flex;
    gap: 24px;
    padding: 16px;
  }

  .homepage__colour {
    border-radius: 8px;
    height: 25px;
    width: 25px;
  }

  .homepage__percentage {
    color: black;
  }

  .homepage__type {
    color: grey;
  }

  .green {
    background-color: #00c100;
  }

  .grey {
    background-color: grey;
  }

  .red {
    background-color: #de896e;
  }
</style>
