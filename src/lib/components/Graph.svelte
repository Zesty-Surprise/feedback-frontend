<script lang="ts">
  import Plotly from "plotly.js-dist-min";
  import FilterModal from "$lib/components/FilterModal.svelte";
  import { fetchAPI } from "$lib/functions.js";

  export let data: any;
  export let apiCall: string; 
  console.log(apiCall);  

  let showModal = false;
  let formData: Object;
  let checkedCheckboxes: String;
  let dataGraph: Object;
  let layout = {
    height: window.screen.height - 375,
    width: window.screen.width - 325,
    yaxis: {
      range: [-100, 100],
    },
    paper_bgcolor: "#FCF8F4",
    plot_bgcolor: "#FCF8F4",
  };
  let dataX: Array<string> = [];
  let dataY: Array<number> = [];

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

  function formatDate(date: string) {
    try {
      const dateObject = new Date(date);

      const day = dateObject.getDate();
      const month = dateObject.getMonth() + 1;
      const year = dateObject.getFullYear();
      const hours = dateObject.getHours();
      const minutes = dateObject.getMinutes();
      const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}`;

      return formattedDate;
    } catch (error) {
      console.error(`Error formatting date: ${date}`);
      return null;
    }
  }

  let loadChartData = setInterval(() => {
    if (formData != undefined) {        
    
    let sessionAmount: number = Object.keys(formData).length < 6 ? Object.keys(formData).length : 6;    
    
    for(let i = 1; i <= sessionAmount + 1; i++) {  
        dataX.push(formatDate(formData[Object.keys(formData)[Object.keys(formData).length - i]].date_created))
        dataY.push(Math.round((formData[Object.keys(formData)[Object.keys(formData).length - i]].score + Number.EPSILON) * 100) / 100)
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
    }, 100);
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
      "sessions?dep=" + checkedCheckboxes,
      "GET",
      data.cookie
    );
    let session = await response.json();
    updateGraph(session);
  }

  function updateGraph(data: Object) {
    let newDataX: Array<string> = [];
    let newDataY: Array<number> = [];

    // for (const value of Object.values(data)) {
    //   newDataX.push(formatDate(value.date_created));
    //   newDataY.push(Math.round((value.score + Number.EPSILON) * 100) / 100);
    // }

    let sessionAmount: number = Object.keys(data).length < 6 ? Object.keys(data).length : 6;    
    
    for(let i = 1; i <= sessionAmount + 1; i++) {  
        newDataX.push(formatDate(data[Object.keys(data)[Object.keys(data).length - i]].date_created))
        newDataY.push(Math.round((data[Object.keys(data)[Object.keys(data).length - i]].score + Number.EPSILON) * 100) / 100)
    }    

    let newdata = [
      {
        x: newDataX,
        y: newDataY,
        text: newDataY,
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

<div class="subHeader flex gap-5 content-center">
  <button class="button" on:click={setModal}
    ><img src="/images/filter.svg" alt="Zesty Surprise" /><strong
      class="text-white">Filter</strong
    >
  </button>
  <span class="block text-xl font-medium"
    >{checkedCheckboxes != undefined ? checkedCheckboxes : ""}</span
  >
</div>
<div>
  <div id="barChart" class="w-3/4 h-3/4" />
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
