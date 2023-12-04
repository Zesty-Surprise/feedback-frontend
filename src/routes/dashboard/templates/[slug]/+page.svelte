<script lang="ts">
  import { goto } from "$app/navigation";
  import { onMount } from "svelte";
  import { checkAuth } from "../../../auth/auth";

  export let data: any;

  onMount(async () => {
    const isAuthorized: boolean = await checkAuth();

    if (!isAuthorized) {
      return;
    }
  });
</script>

<div class="grid grid-cols-3 grid-rows-5 gap-4 text-zinc-600 m-10">
  <div class="col-span-3">
    <div class="flex justify-between rounded-md mb-5">
      <div>
        <h1 class="block text-xl font-medium">Template preview</h1>
        <p>This is where you can see fully assembled template</p>
      </div>

      <div
        class="p-4 bg-white border border-gray-200 rounded-xl shadow m ml-0 flex"
      >
        <button
          type="submit"
          class="w-18 text-color-accent bg-white border-2 border-color-accent rounded-2xl p-2 mr-2 hover:bg-orange-200"
          on:click={() => {
            goto("/dashboard/templates");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </button>
        <button
          type="submit"
          class="w-18 text-color-accent bg-white border-2 border-color-accent rounded-2xl p-2 hover:bg-orange-200"
          on:click={() => {
            goto(`/dashboard/templates/builder/${data.template}`);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-8 h-8"
          >
            <path
              d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z"
            />
            <path
              d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
  <div
    class="flex justify-center col-span-3 row-span-4 row-start-2 border-2 border-color-accent rounded-2xl bg-white"
  >
    <!-- <div class="w-96 h-32">{@html data.html}</div> -->
    <div class="w-96 h-32" >{data.html}</div>
  </div>
</div>
