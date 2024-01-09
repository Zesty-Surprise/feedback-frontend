<script lang="ts">
  import { goto } from "$app/navigation";
  import { setCookie } from "typescript-cookie";
  import { PUBLIC_BACKEND_URI } from "$env/static/public";

  let email = "";
  let password = "";

  import { enhance } from "$app/forms";
  export let form;
</script>

<div class="min-h-screen flex flex-col justify-center items-center">
  <div>
    <a href="/">
      <img src="/images/logo.svg" alt="Your Surprise" />
    </a>
  </div>

  <div
    class="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg"
  >
    <form method="post" use:enhance>
      <div class="text-2xl text-center font-bold text-gray-600">Login</div>
      <div>
        <label class="block font-medium text-sm text-gray-700" for="email"
          >Email</label
        >
        <input
          class="block text-black mt-1 w-full border-gray-300 focus:border-color-highlight focus:ring-color-highlight rounded-md shadow-sm"
          id="email"
          type="email"
          name="email"
          required
          autocomplete="email"
        />
      </div>

      <div class="mt-4">
        <label class="block font-medium text-sm text-gray-700" for="password"
          >Password</label
        >
        <input
          class="block text-black mt-1 w-full border-gray-300 focus:border-color-highlight focus:ring-color-highlight rounded-md shadow-sm"
          id="password"
          type="password"
          name="password"
          required
        />
        {#if form?.fail}<p class="text-red-500 italic text-xs mt-1">
            {form.details}
          </p>{/if}
      </div>

      <div class="flex justify-end">
        <button
          type="submit"
          class="text-white mt-4 bg-color-accent hover:bg-orange-700 focus:outline-none font-medium rounded-2xl text-sm px-4 py-2"
        >
          Submit
        </button>
      </div>
    </form>
  </div>
</div>
