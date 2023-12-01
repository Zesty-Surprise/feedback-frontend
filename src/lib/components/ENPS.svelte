<script lang="ts">
  import Plotly from "plotly.js-dist-min";
  import FilterModal from "$lib/components/FilterModal.svelte";

  let showModal = false;
  let formData: Object;
  let checkedCheckboxes: Array<string> = [];

  fetch("http://localhost:8000/api/sessions")
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

  let loadChartData = setInterval(() => {
    if (formData != undefined) {
      var data = [
        {
          x: [
            formData[Object.keys(formData)[Object.keys(formData).length - 1]]
              ._id,
            formData[Object.keys(formData)[Object.keys(formData).length - 2]]
              ._id,
            // formData[Object.keys(formData)[Object.keys(formData).length - 3]]
            //   ._id,
            // formData[Object.keys(formData)[Object.keys(formData).length - 4]]
            //   ._id,
            // formData[Object.keys(formData)[Object.keys(formData).length - 5]]
            //   ._id,
            // formData[Object.keys(formData)[Object.keys(formData).length - 6]]
            //   ._id,
            // formData[Object.keys(formData)[Object.keys(formData).length - 7]]
            //   ._id,
            // formData[Object.keys(formData)[Object.keys(formData).length - 8]]
            //   ._id,
            // formData[Object.keys(formData)[Object.keys(formData).length - 9]]
            //   ._id,
            // formData[Object.keys(formData)[Object.keys(formData).length - 10]]
            //   ._id,
          ],
          y: [
            formData[Object.keys(formData)[Object.keys(formData).length - 1]]
              .score,
            formData[Object.keys(formData)[Object.keys(formData).length - 2]]
              .score,
            // formData[Object.keys(formData)[Object.keys(formData).length - 3]]
            //   .score,
            // formData[Object.keys(formData)[Object.keys(formData).length - 4]]
            //   .score,
            // formData[Object.keys(formData)[Object.keys(formData).length - 5]]
            //   .score,
            // formData[Object.keys(formData)[Object.keys(formData).length - 6]]
            //   .score,
            // formData[Object.keys(formData)[Object.keys(formData).length - 7]]
            //   .score,
            // formData[Object.keys(formData)[Object.keys(formData).length - 8]]
            //   .score,
            // formData[Object.keys(formData)[Object.keys(formData).length - 9]]
            //   .score,
            // formData[Object.keys(formData)[Object.keys(formData).length - 10]]
            //   .score,
          ],
          type: "bar",
          marker: {
            color: "rgba(118, 137, 72, 0.40)",
          },
          text: [
            formData[Object.keys(formData)[Object.keys(formData).length - 1]]
              .score,
            formData[Object.keys(formData)[Object.keys(formData).length - 2]]
              .score,
            // formData[Object.keys(formData)[Object.keys(formData).length - 3]]
            //   .score,
            // formData[Object.keys(formData)[Object.keys(formData).length - 4]]
            //   .score,
            // formData[Object.keys(formData)[Object.keys(formData).length - 5]]
            //   .score,
            // formData[Object.keys(formData)[Object.keys(formData).length - 6]]
            //   .score,
            // formData[Object.keys(formData)[Object.keys(formData).length - 7]]
            //   .score,
            // formData[Object.keys(formData)[Object.keys(formData).length - 8]]
            //   .score,
            // formData[Object.keys(formData)[Object.keys(formData).length - 9]]
            //   .score,
            // formData[Object.keys(formData)[Object.keys(formData).length - 10]]
            //   .score,
          ],
          textposition: "inside",
          insidetextanchor: "middle",
          textfont: {
            color: "white",
          },
        },
      ];

      // Layout settings for the chart
      var layout = {
        height: window.screen.height - 250,
        width: window.screen.width - 275,
        yaxis: {
          range: [-100, 100],
        },
        paper_bgcolor: "#FCF8F4",
        plot_bgcolor: "#FCF8F4",
      };
      clearInterval(loadChartData);
    }

    setTimeout(() => {
      Plotly.newPlot("barChart", data, layout);
    }, 1000);
  }, 1);

  function setModal() {
    showModal = !showModal;
  }

  function handleCheckboxesChanged(event) {
    checkedCheckboxes = event.detail;
    console.log(checkedCheckboxes);
    filterDepartments();
  }

  function filterDepartments() {
    let results: Array<object> = [];

    for (let i = 0; i < formData[0].forms.length; i++) {
      //   console.log(formData[0].forms[i].department);
      for (let j = 0; j < checkedCheckboxes.length; j++) {
        if (formData[0].forms[i].department === checkedCheckboxes[j]) {
          results.push(formData[0].forms[i]);
        }
      }
    }
    console.log(results);
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
