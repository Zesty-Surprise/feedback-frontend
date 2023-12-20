<script lang="ts">
  import Plotly from "plotly.js-dist-min";

  export let data;

  let latestSession = data.sessions[data.sessions.length - 1];

  let promoters = latestSession.promoters;
  let demoters = latestSession.demoter;
  let passives = latestSession.passive;

  let total = promoters + demoters + passives;

  let promotersPercent = promoters ? (promoters / total) * 100 : 0;
  let demotersPercent = demoters ? (demoters / total) * 100 : 0;
  let passivesPercent = passives ? (passives / total) * 100 : 0;

  let enps = latestSession.score;

  function getGaugeColor() {
    if (enps <= 0) {
      return "#de896e";
    } else if (enps < 20 && enps >= 1) {
      return "yellow";
    } else {
      return "#00c100";
    }
  }

  setTimeout(() => {
    var data = [
      {
        domain: { x: [0, 1], y: [0, 1] },
        value: enps,
        title: { text: "eNPS" },
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
    <h1>{latestSession.title}</h1>
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
        >{latestSession.completed}/{latestSession.participants}
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
