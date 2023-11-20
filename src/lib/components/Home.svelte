<script lang="ts">
  import { onMount } from "svelte";
  import ApexCharts from "apexcharts";
  import Plotly from "plotly.js-dist-min";

  let gaugeColour = "";
  let espn = 55;

  if (espn <= 0) {
    gaugeColour = "#de896e";
  } else if (espn < 20 && espn >= 1) {
    gaugeColour = "yellow";
  } else {
    gaugeColour = "#00c100";
  }

  let chartElement: HTMLDivElement; // The container where you want to render the chart
  let options = {
    series: [76, 23, 1],
    chart: {
      type: "radialBar",
      offsetY: -20,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        colors: ["#555", "#555", "#666"],
        startAngle: -90,
        endAngle: 90,
        track: {
          background: "#e7e7e7",
          strokeWidth: "97%",
          margin: 10, // margin is in pixels
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
            color: "#595959",
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
      type: "solid",
      colors: ["#a1dbae"],
    },
    labels: ["Average Results"],
  }; // Customize this object with your chart options

  onMount(() => {
    let chart = new ApexCharts(chartElement, options);
    chart.render();
  });

  setTimeout(() => {
    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: espn,
        title: { text: "eNPS" },
        type: "indicator",
        mode: "gauge+number+delta",
        delta: { reference: 75 },
        gauge: {
          axis: { range: [-100, 100] },
          bar: { color: gaugeColour, thickness: 1 },
          steps: [{ range: [-100, 100], color: "white" }],
          bordercolor: "transparent",
        },
      },
    ];

    var layout = {
      width: 550,
      height: 325,
      margin: { t: 0, b: 0 },
      paper_bgcolor: "#FCF8F4",
    };

    Plotly.newPlot("asdf", data, layout);
  }, 500);
</script>

<div class="homepage">
  <div class="homepage__enps">
    <h1>eNPS</h1>
  </div>
  <div class="homepage__info">
    <div class="homepage__pie-chart-wrapper">
      <!-- <div class="homepage__pie-chart" bind:this={chartElement} /> -->
      <div id="asdf" style="background: none" />
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
  <div class="homepage__completed-by">
    <span>Completed by <strong>192/411</strong></span>
  </div>
</div>

<style>
  .homepage {
    display: flex;
    flex-direction: column;
    justify-content: left;
    gap: 32px;
  }

  .homepage__enps {
    display: flex;
    justify-content: center;
    padding: 32px 0 64px;
    position: relative;
    left: -115px;
    width: 100%;
  }

  .homepage__enps h1 {
    background-color: #f5e5d3;
    border-radius: 15px;
    padding: 8px 24px;
  }

  .homepage__info {
    display: flex;
    gap: 160px;
    justify-content: center;
    left: -115px;
    position: relative;
    width: 100%;
  }

  .homepage__pie-chart {
    width: 500px;
  }

  .homepage__stats {
    display: flex;
    flex-direction: column;
    gap: 32px;
    justify-content: center;
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

  .homepage__completed-by {
    display: flex;
    justify-content: center;
    padding: 80px 0 0;
    position: relative;
    left: -115px;
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
