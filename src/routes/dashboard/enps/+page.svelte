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

    let loadChartData = setInterval(() => {
        if (formData != undefined) {
            for (const value of Object.values(formData)) {
                dataY.push(
                    Math.round((value.score + Number.EPSILON) * 100) / 100
                );
                dataX.push(value.date_created);
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

        for (const value of Object.values(data)) {
            newDataX.push(value.date_created);
            newDataY.push(
                Math.round((value.score + Number.EPSILON) * 100) / 100
            );
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

<div class="relative mt-10 px-10 text-zinc-600">
    <h1 class="block text-xl font-medium">eNPS graph</h1>
    <p>Review eNPS by dep and survey moments</p>
</div>
<div class="subHeader">
    <button class="button" on:click={setModal}
        ><img src="/images/filter.svg" alt="Zesty Surprise" /><strong
            class="text-white">Filter</strong
        ></button
    >
</div>
<div>
    <div id="barChart" class="w-3/4 h-3/4" />
</div>
{#if showModal}
    <FilterModal
        bind:showModal
        on:checkboxesChanged={handleCheckboxesChanged}
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
