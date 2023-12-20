<script>
  import { enhance } from "$app/forms";
  import { goto } from "$app/navigation";
  export let form;
</script>

<div class="relative mt-10 px-10 text-zinc-600">
  <h1 class="block text-xl font-medium">Create application user</h1>
</div>

<form method="POST" use:enhance>
  <div
    class="flex flex-col mt-8 ml-8 mr-8 gap-6 text-color-text w-2/4 bg-white p-8 rounded-xl shadow-sm"
  >
    <div class="flex flex-row justify-between">
      <label for="username">Username</label>
      <input
        class="w-2/4 h-8 rounded-md border border-[#2b21181a] focus:border-color-highlight focus:ring-color-highlight"
        type="text"
        name="username"
        required
      />
    </div>
    <div class="flex flex-row justify-between">
      <label for="email">Email</label>
      <input
        class="w-2/4 h-8 rounded-md border border-[#2b21181a] focus:border-color-highlight focus:ring-color-highlight"
        type="email"
        name="email"
        required
      />
    </div>
    <div class="flex flex-row justify-between">
      <label for="password">Password</label>
      <input
        class="w-2/4 h-8 rounded-md border border-[#2b21181a] focus:border-color-highlight focus:ring-color-highlight"
        type="password"
        name="password"
        required
      />
    </div>
    <div class="flex flex-row justify-between imz">
      <label for="role">Role</label>
      <select
        class="w-2/4 rounded-md border border-[#2b21181a] pt-1 pb-1 focus:border-color-highlight focus:ring-color-highlight"
        required
        name="role"
      >
        <option class="bg-color-layout" value="it">IT</option>
        <ogtion class="bg-color-layout" value="gifts">Gifts</ogtion>
        <option class="bg-color-layout" value="people">People</option>
        <option class="bg-color-layout" value="production">Production</option>
        <option class="bg-color-layout" value="e-commerce">E-Commerce</option>
        <option class="bg-color-layout" value="finance">Finance</option>
        <option class="bg-color-layout" value="innovation">Innovation</option>
        <option class="bg-color-layout" value="customer-service"
          >Customer-Service</option
        >
        <option class="bg-color-layout" value="campus">Campus</option>
        <option class="bg-color-layout" value="purchase">Purchase</option>
      </select>
    </div>

    <div class="pt-3 pb-2 flex flex-row items-center justify-center gap-5">
      <button
        class="text-white bg-gray-400 hover:brightness-90 transition duration-200 focus:outline-none font-medium rounded-full text-md px-6 py-2 text-center"
        on:click={() => {
          goto("/dashboard/settings");
        }}
      >
        Cancel
      </button>
      <button
        class="text-white bg-color-accent hover:brightness-90 transition duration-200 focus:outline-none font-medium rounded-full text-md px-6 py-2 text-center"
        type="submit"
      >
        Create
      </button>
    </div>
    {#if form?.fail}
      <div class="pt-3 pb-2 flex flex-row items-center justify-center gap-5">
        <p class="text-red-500 italic mt-1">
          {form.details}
        </p>
      </div>
    {/if}
  </div>
</form>
