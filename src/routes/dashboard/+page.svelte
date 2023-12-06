<script lang="ts">
  import Plotly from "plotly.js-dist-min";
  import { onMount } from "svelte";
  import { checkAuth } from "/src/routes/auth/auth.ts";

  export let data;

  let promoters = data.sessions[0].promoters;
  let demoters = data.sessions[0].demoter;
  let passives = data.sessions[0].passive;

  let total = promoters + demoters + passives;

  let promotersPercent = (promoters / total) * 100;
  let demotersPercent = (demoters / total) * 100;
  let passivesPercent = (passives / total) * 100;

  let gaugeColour = "";

  let enps = data.sessions[0].score;

  if (enps <= 0) {
    gaugeColour = "#de896e";
  } else if (enps < 20 && enps >= 1) {
    gaugeColour = "yellow";
  } else {
    gaugeColour = "#00c100";
  }

  setTimeout(() => {
    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: enps,
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

    Plotly.newPlot("chart", data, layout);
  }, 0);
</script>

<div class="homepage">
  <div class="homepage__enps">
    <h1>eNPS</h1>
  </div>
  <div class="homepage__info">
    <div class="homepage__pie-chart-wrapper">
      <!-- <div class="homepage__pie-chart" bind:this={chartElement} /> -->
      <div id="chart" style="background: none" />
    </div>
    <!-- second column -->
    <div class="homepage__stats">
      <div>
        <!-- Content for the first column -->
        <div class="homepage__bar">
          <div class="homepage__colour green" />
          <div class="homepage__percentage">
            <p>{promotersPercent.toFixed(1)}%</p>
          </div>
          <div class="homepage__type">
            <p>Promoters (9-10)</p>
          </div>
        </div>
      </div>

      <div class="homepage__bar">
        <div class="homepage__colour grey" />
        <div class="homepage__percentage">
          <p>{passivesPercent.toFixed(1)}%</p>
        </div>
        <div class="homepage__type">
          <p>Neutrals (7-8)</p>
        </div>
      </div>

      <div class="homepage__bar">
        <div class="homepage__colour red" />
        <div class="homepage__percentage">
          <p>{demotersPercent.toFixed(1)}%</p>
        </div>
        <div class="homepage__type">
          <p>Detractors (1-6)</p>
        </div>
      </div>
    </div>
  </div>
  <div class="homepage__completed-by">
    <span
      >Completed by <strong
        >{data.sessions[0].completed}
      </strong>participants</span
    >
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
    min-width: 48px;
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
