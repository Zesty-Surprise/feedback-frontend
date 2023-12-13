<script lang="ts">
  export let showModal: Boolean;

  import { createEventDispatcher } from "svelte";
  import Modal from "$lib/components/Generic/Modal.svelte";

  let checkedCheckboxes: String;
  const dispatch = createEventDispatcher();

  function handleCheckbox() {
    dispatch("checkboxesChanged", checkedCheckboxes);
  }

  function setModal() {
    showModal = !showModal;
  }

  let showSurveyModal = true;
</script>

<Modal bind:showModal={showSurveyModal}>
  <div>
    <div>
      <div>
        <div class="pt-5">
          <h1 class="pl-5 font-semibold">Filter by team</h1>
          <h2></h2>
        </div>
        <div class="pl-16 pt-10 grid grid-cols-2">
          <div>
            <input
              type="radio"
              class=""
              name="it"
              value="IT"
              id="it"
              bind:group={checkedCheckboxes}
            />
            <label for="it" class="label-spacing">IT</label>

            <input
              type="radio"
              class=""
              name="production"
              value="Production"
              id="production"
              bind:group={checkedCheckboxes}
            />
            <label for="production" class="label-spacing">Production</label>

            <input
              type="radio"
              class=""
              name="people"
              value="People"
              id="people"
              bind:group={checkedCheckboxes}
            />
            <label for="people" class="label-spacing">People</label>

            <input
              type="radio"
              class=""
              name="campus"
              value="Campus"
              id="campus"
              bind:group={checkedCheckboxes}
            />
            <label for="campus" class="label-spacing">Campus</label>

            <input
              type="radio"
              class=""
              name="finance"
              value="Finance"
              id="finance"
              bind:group={checkedCheckboxes}
            />
            <label for="finance" class="label-spacing">Finance</label>
          </div>

          <div>
            <input
              type="radio"
              class=""
              name="gifts"
              value="Gifts"
              id="gifts"
              bind:group={checkedCheckboxes}
            />
            <label for="gifts" class="label-spacing">Gifts</label>

            <input
              type="radio"
              class=""
              name="innovation"
              value="Innovation"
              id="innovation"
              bind:group={checkedCheckboxes}
            />
            <label for="innovation" class="label-spacing">Innovation</label>

            <input
              type="radio"
              class=""
              name="ecommerce"
              value="E-commerce"
              id="ecommerce"
              bind:group={checkedCheckboxes}
            />
            <label for="ecommerce" class="label-spacing">E-commerce</label>

            <input
              type="radio"
              class=""
              name="customerService"
              value="Customer Service"
              id="customerService"
              bind:group={checkedCheckboxes}
            />
            <label for="customerService" class="label-spacing"
              >Customer service</label
            >

            <input
              type="radio"
              class=""
              name="purchase"
              value="Purchase"
              id="purchase"
              bind:group={checkedCheckboxes}
            />
            <label for="purchase" class="label-spacing">Purchase</label>
          </div>
        </div>
        <div class="flex justify-center space-x-32 pt-5"> 
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
      </div>
    </div>
  </div>
</Modal>

<style>
  .label-spacing {
    margin-bottom: 15px; /* Adjust the value as needed */
  }

  .modal__wrapper {
    align-items: center;
    background-color: rgba(200, 200, 200, 0.25);
    left: 0;
    position: absolute;
    top: 0;
    width: 100vw;
  }

  .modal {
    background-color: white;
    display: flex;
    flex-direction: column;
    height: fit-content;
    left: 15px;
    max-width: 550px;
    padding: 24px;
    position: relative;
    width: 100%;
  }

  /* .modal__close {
    display: flex;
    justify-content: flex-end;
  } */

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

  input[type="radio"] {
    display: none;
  }

  label {
    cursor: pointer;
    display: flex;
    position: relative;
    padding-left: 35px;
    align-items: center;
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
