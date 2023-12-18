<script lang="ts">
    export let showModal: Boolean;

    import { createEventDispatcher } from "svelte";

    let checkedCheckboxes: String;
    const dispatch = createEventDispatcher();

    function handleCheckbox() {
        dispatch("checkboxesChanged", checkedCheckboxes);
    }

    function setModal() {
        showModal = !showModal;
    }
</script>

<div class="modal__wrapper">
    <div class="modal">
        <div class="modal__close">
            <button on:click={setModal}>
                <img src="/images/close.svg" alt="" /></button
            >
        </div>
        <div class="modal__title">
            <h1>Filter by team</h1>
            <h2>Teams</h2>
        </div>
        <div class="modal__options">
            <div class="modal__option-column">
                <input
                    type="checkbox"
                    class="modalCheckbox"
                    name="it"
                    value="IT"
                    id="it"
                    bind:group={checkedCheckboxes}
                />
                <label for="it">IT</label>

                <input
                    type="checkbox"
                    class="modalCheckbox"
                    name="production"
                    value="Production"
                    id="production"
                    bind:group={checkedCheckboxes}
                />
                <label for="production">Production</label>

                <input
                    type="checkbox"
                    class="modalCheckbox"
                    name="people"
                    value="People"
                    id="people"
                    bind:group={checkedCheckboxes}
                />
                <label for="people">People</label>

                <input
                    type="checkbox"
                    class="modalCheckbox"
                    name="campus"
                    value="Campus"
                    id="campus"
                    bind:group={checkedCheckboxes}
                />
                <label for="campus">Campus</label>

                <input
                    type="checkbox"
                    class="modalCheckbox"
                    name="finance"
                    value="Finance"
                    id="finance"
                    bind:group={checkedCheckboxes}
                />
                <label for="finance">Finance</label>
            </div>

            <div class="modal__option-column">
                <input
                    type="checkbox"
                    class="modalCheckbox"
                    name="gifts"
                    value="Gifts"
                    id="gifts"
                    bind:group={checkedCheckboxes}
                />
                <label for="gifts">Gifts</label>

                <input
                    type="checkbox"
                    class="modalCheckbox"
                    name="innovation"
                    value="Innovation"
                    id="innovation"
                    bind:group={checkedCheckboxes}
                />
                <label for="innovation">Innovation</label>

                <input
                    type="checkbox"
                    class="modalCheckbox"
                    name="ecommerce"
                    value="E-commerce"
                    id="ecommerce"
                    bind:group={checkedCheckboxes}
                />
                <label for="ecommerce">E-commerce</label>

                <input
                    type="checkbox"
                    class="modalCheckbox"
                    name="customerService"
                    value="Customer Service"
                    id="customerService"
                    bind:group={checkedCheckboxes}
                />
                <label for="customerService">Customer service</label>

                <input
                    type="checkbox"
                    class="modalCheckbox"
                    name="purchase"
                    value="Purchase"
                    id="purchase"
                    bind:group={checkedCheckboxes}
                />
                <label for="purchase">Purchase</label>
            </div>
        </div>
        <div class="modal__apply">
            <button class="button__light" on:click={setModal}>Cancel</button>
            <button
                class="button"
                on:click={() => {
                    setModal(), handleCheckbox();
                }}>Apply</button
            >
        </div>
    </div>
</div>

<style>
    .modal__wrapper {
        align-items: center;
        background-color: rgba(200, 200, 200, 0.25);
        display: flex;
        height: 100vh;
        justify-content: center;
        left: 0;
        position: absolute;
        top: 0;
        width: 100vw;
        z-index: 10;
    }

    .modal {
        background-color: white;
        display: flex;
        flex-direction: column;
        height: fit-content;
        left: 15px;
        max-width: 650px;
        padding: 24px;
        position: relative;
        width: 100%;
    }

    .modal__close {
        display: flex;
        justify-content: flex-end;
    }

    .modal__title {
        color: #595959;
        display: flex;
        flex-direction: column;
        gap: 32px;
    }

    .modal__title h1 {
        font-size: xx-large;
        margin-left: 45px;
    }

    .modal__title h2 {
        font-size: x-large;
        margin-bottom: 24px;
        margin-left: 45px;
    }

    .modal__options {
        color: black;
        display: flex;
        gap: 64px;
        left: 15px;
        margin-bottom: 40px;
        position: relative;
    }

    input[type="checkbox"] {
        display: none;
    }

    label {
        cursor: pointer;
        display: flex;
        position: relative;
        padding-left: 30px;
        align-items: center;
    }

    label:before {
        background-color: white;
        border-radius: 5px;
        border: 3px solid black;
        content: "";
        display: inline-block;
        height: 36px;
        margin-right: 16px;
        width: 36px;
    }

    label:after {
        background-color: transparent;
        color: black;
        content: "\2714";
        font-family: "Arial", sans-serif;
        font-size: 32px;
        left: 48px;
        position: absolute;
        top: 20px;
        transform: translate(-50%, -50%) scale(0);
        transition: transform 0.3s ease;
    }

    input:checked + label:after {
        transform: translate(-50%, -50%) scale(1);
    }

    .modal__apply {
        display: flex;
        justify-content: space-evenly;
    }

    .modal__options::after {
        background-color: rgba(217, 217, 217, 0.71);
        bottom: -30px;
        content: "";
        height: 1px;
        left: -15px;
        position: absolute;
        width: 100%;
    }

    .modal__option-column {
        display: flex;
        flex-direction: column;
        gap: 13px;
    }

    .button {
        background-color: #de896e;
        border-radius: 45px;
        padding: 10px 74px;
        transition: 0.3s;
        width: fit-content;
    }

    .button:hover {
        opacity: 75%;
    }

    .button__light {
        border-radius: 45px;
        border: 1px solid #595959;
        color: #595959;
        padding: 10px 74px;
        transition: 0.3s;
        width: fit-content;
    }

    .button__light:hover {
        background-color: lightgray;
    }
</style>
