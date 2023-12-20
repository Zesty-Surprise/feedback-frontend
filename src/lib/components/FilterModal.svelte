<script lang="ts">
    export let showModal: Boolean;

    import { createEventDispatcher } from "svelte";
    import Modal from "$lib/components/Generic/Modal.svelte";

    let checkedBox: string;
    let checkedBoxToUncheck: string;
    const dispatch = createEventDispatcher();

    function handleCheckbox() {
        dispatch("checkboxesChanged", checkedBox);
    }

    function setModal() {
        showModal = !showModal;
    }

    let showSurveyModal = true;

    const departments = [
        "IT",
        "Production",
        "People",
        "Campus",
        "Finance",
        "Gifts",
        "Innovation",
        "E-commerce",
        "Customer service",
        "Purchase",
    ];
</script>

<Modal bind:showModal={showSurveyModal}>
    <div class="pt-5">
        <h1 class="pl-10 font-semibold">Filter by team</h1>
    </div>
    <div class="pl-20 py-10 grid grid-cols-2 gap-x-8">
        {#each departments as department}
            <input
                type="checkbox"
                class=""
                name={department}
                value={department}
                id={department}
                checked={checkedBoxToUncheck == department}
                on:click={() => {
                    if (checkedBox == department) {
                        checkedBox = "";
                    } else {
                        checkedBox = department;
                        checkedBoxToUncheck = department;
                    }
                }}
            />
            <label
                for={department}
                class="mb-[15px] cursor-pointer flex relative pl-[35px] items-center"
                >{department}</label
            >
        {/each}
    </div>
    <div class="flex justify-center space-x-32">
        <button
            class="text-white bg-gray-300 hover:brightness-90 transition duration-200 focus:outline-none font-medium rounded-full text-md px-6 py-2 text-center"
            on:click={setModal}>Cancel</button
        >
        <button
            class="text-white bg-color-accent hover:brightness-90 transition duration-200 focus:outline-none font-medium rounded-full text-md px-6 py-2 text-center"
            on:click={() => {
                setModal(), handleCheckbox();
            }}>Apply</button
        >
    </div>
</Modal>

<style>
    input[type="checkbox"] {
        display: none;
    }

    label:before {
        background-color: white;
        border-radius: 5px;
        border: 3px solid black;
        content: "";
        display: block; /* Change from inline-block to block */
        height: 36px;
        left: -25px;
        width: 36px;
        position: absolute;
    }

    label:after {
        background-color: transparent;
        color: black;
        content: "\2714";
        font-family: "Arial", sans-serif;
        font-size: 32px;
        left: -8px;
        position: absolute;
        top: 10px;
        transform: translate(-50%, -50%) scale(0);
        transition: transform 0.3s ease;
    }

    input:checked + label:after {
        transform: translate(-50%, -50%) scale(1);
    }
</style>
