<script lang="ts">
  import { enhance } from "$app/forms";
  import { goto, invalidateAll } from "$app/navigation";
  import Modal from "$lib/components/Generic/Modal.svelte";
  import { fetchAPI } from "$lib/functions.js";

  export let data;
  export let form;

  let emailValue = "";
  let passwordValue = "";
  let roleValue = "";
  let usernameValue = "";

  let showDeleteModal = false;
  let showAddModal = false;
  let selectedForDelete = "";

  const toggleDelete = (email: string) => {
    selectedForDelete === ""
      ? (selectedForDelete = email)
      : (selectedForDelete = "");
    showDeleteModal = !showDeleteModal;
  };

  const toggleAdd = () => {
    emailValue = "";
    passwordValue = "";
    roleValue = "";
    usernameValue = "";
    form = null;
    showAddModal = !showAddModal;
  };

  const deleteRequest = async (email: string): Promise<void> => {
    const res = await fetchAPI(`users/${email}`, "DELETE", data.cookie);
    const json = await res.json();
  };

  const deleteTemplate = async (): Promise<void> => {
    const res = await deleteRequest(selectedForDelete);
    toggleDelete("");
    invalidateAll();
  };
</script>

<Modal bind:showModal={showDeleteModal}>
  <p slot="header" class="text-color-text font-semibold text-center">
    Are you sure you want to delete this template?
  </p>
  <div class="pt-3 pb-2 self-center flex justify-center gap-5">
    <button
      class="text-white bg-red-500 hover:brightness-90 transition duration-200 focus:outline-none font-medium rounded-full text-md px-6 py-2 text-center"
      type="submit"
      on:click={() => deleteTemplate()}
    >
      Delete
    </button>
    <button
      class="text-white bg-gray-300 hover:brightness-90 transition duration-200 focus:outline-none font-medium rounded-full text-md px-6 py-2 text-center"
      type="submit"
      on:click={() => toggleDelete("")}
    >
      Cancel
    </button>
  </div>
</Modal>

<Modal bind:showModal={showAddModal}>
  <p slot="header" class="text-color-text font-semibold text-center">
    New user
  </p>
  <form method="POST" action="/dashboard/settings" use:enhance>
    <div class="flex flex-col m-8 text-color-text">
      <div class="flex flex-col items-right">
        <label for="title" class="mt-1 italic">Username</label>
        <input
          class="mt-1 mb-1 w-full h-8 p-2 rounded-md border border-[#2b21181a] focus:border-color-highlight focus:ring-color-highlight"
          name="name"
          type="name"
          bind:value={usernameValue}
          required
        />
      </div>
      <div class="flex flex-col items-right">
        <label for="title" class="mt-1 italic">Email</label>
        <input
          class="mt-1 mb-1 w-full h-8 p-2 rounded-md border border-[#2b21181a] focus:border-color-highlight focus:ring-color-highlight"
          name="email"
          type="email"
          bind:value={emailValue}
          required
        />
        {#if form?.fail}
          <p class="text-red-500 text-xs italic">
            {form?.message}
          </p>
        {/if}
      </div>
      <div class="flex flex-col items-right">
        <label for="title" class="mt-1 italic">Password</label>
        <input
          class="mt-1 mb-1 w-full h-8 p-2 rounded-md border border-[#2b21181a] focus:border-color-highlight focus:ring-color-highlight"
          name="password"
          type="password"
          bind:value={passwordValue}
          required
        />
      </div>
      <div class="flex flex-col items-right">
        <label for="template" class="mt-1 italic">Template</label>
        <select
          class="mt-1 mb-1 w-full rounded-md border border-[#2b21181a] pt-1 pb-1 focus:border-color-highlight focus:ring-color-highlight"
          name="role"
          bind:value={roleValue}
          required
        >
          <option value="it">IT</option>
          <option value="gifts">Gifts</option>
          <option value="purchase">Purchase</option>
          <option value="people">People</option>
          <option value="production">Production</option>
          <option value="customer-service">Customer Service</option>
          <option value="e-commerce">E-Commerce</option>
          <option value="finance">Finance</option>
          <option value="innovation">Innovation</option>
        </select>
      </div>
    </div>
    <div class="pt-3 pb-2 self-center flex justify-center gap-5">
      <button
        class="text-white bg-green-400 hover:brightness-90 transition duration-200 focus:outline-none font-medium rounded-full text-md px-6 py-2 text-center"
        type="submit"
      >
        Add User
      </button>
      <button
        class="text-white bg-red-400 hover:brightness-90 transition duration-200 focus:outline-none font-medium rounded-full text-md px-6 py-2 text-center"
        type="submit"
        on:click|preventDefault={toggleAdd}
      >
        Cancel
      </button>
    </div>
  </form>
</Modal>

<div class="relative mt-10 px-10 text-zinc-600">
  <h1 class="block text-xl font-medium">Settings</h1>
  <p>Admin panel for user management</p>
</div>

<div class="flex flex-wrap ml-10 mr-16">
  <div
    class="flex flex-col min-w-fit min-h-fit mr-16 mt-16 hover:scale-105 duration-100"
  >
    <div
      class="flex items-center justify-evenly h-52 w-52 bg-color-highlight rounded-lg"
    >
      <button
        class="flex justify-center items-center h-full w-full"
        on:click|preventDefault={toggleAdd}
      >
        <div
          class="bg-color-accent rounded-full w-14 h-14 flex justify-center items-center"
        >
          <iconify-icon class="text-white" icon="typcn:plus" width="48px" />
        </div>
      </button>
    </div>
    <div class="pl-1">
      <p class="text-color-accent font-semibold">Create New User</p>
    </div>
  </div>
  {#each [...data.users].reverse() as user}
    {@const date = new Date(user.date_created).toLocaleDateString()}
    <div
      class="flex flex-col min-w-fit min-h-fit mr-16 mt-16 hover:scale-105 duration-100"
    >
      <div
        class="flex items-center justify-evenly h-52 w-52 bg-color-highlight rounded-lg"
      >
        <button
          class="bg-color-accent rounded-2xl w-14 h-14 flex justify-center items-center hover:brightness-90 transition duration-200"
          on:click={() => {
            toggleDelete(user.email);
          }}
        >
          <iconify-icon class="text-white" icon="ph:trash-fill" width="40px" />
        </button>
      </div>
      <div class="pl-1">
        <p class="text-color-text_light font-light">
          Role: {user.role.toUpperCase()}
        </p>
        <p class="text-color-accent font-semibold">{user.email}</p>
      </div>
    </div>
  {/each}
</div>
