<script>
  function click() {
    console.log("you clicked");
  }
  //javascript an array of objs on
  let templates = [
    {
      _id: "6556081117d0c3e1240a25db",
      name: "TEST-CASE",
      date_created: "2023-11-16T12:16:17.924580Z",
      date_updated: null,
      components: [
        {
          type: "enps-component",
          custom_text: "",
          default_text: "Fill in the score!",
        },
        {
          type: "department-component",
          custom_text: "",
          default_text: "Select your department!",
        },
      ],
    },
    {
      _id: "6556081117d0c3e1240a25da",
      name: "TEST-CASE1",
      date_created: "2023-11-16T12:16:17.924580Z",
      date_updated: null,
      components: [
        {
          type: "enps-component",
          custom_text: "",
          default_text: "Fill in the score!",
        },
        {
          type: "department-component",
          custom_text: "",
          default_text: "Select your department!",
        },
      ],
    },
    {
      _id: "6556081117d0c3e1240a25dc",
      name: "TEST-CASE2",
      date_created: "2023-11-16T12:16:17.924580Z",
      date_updated: null,
      components: [
        {
          type: "enps-component",
          custom_text: "",
          default_text: "Fill in the score!",
        },
        {
          type: "department-component",
          custom_text: "",
          default_text: "Select your department!",
        },
      ],
    },
    {
      _id: "6556081117d0c3e1240a25dc",
      name: "TEST-CASE2",
      date_created: "2023-11-16T12:16:17.924580Z",
      date_updated: null,
      components: [
        {
          type: "enps-component",
          custom_text: "",
          default_text: "Fill in the score!",
        },
        {
          type: "department-component",
          custom_text: "",
          default_text: "Select your department!",
        },
      ],
    },
    {
      _id: "6556081117d0c3e1240a25dc",
      name: "TEST-CASE2",
      date_created: "2023-11-16T12:16:17.924580Z",
      date_updated: null,
      components: [
        {
          type: "enps-component",
          custom_text: "",
          default_text: "Fill in the score!",
        },
        {
          type: "department-component",
          custom_text: "",
          default_text: "Select your department!",
        },
      ],
    },
    {
      _id: "6556081117d0c3e1240a25dc",
      name: "TEST-CASE2",
      date_created: "2023-11-16T12:16:17.924580Z",
      date_updated: null,
      components: [
        {
          type: "enps-component",
          custom_text: "",
          default_text: "Fill in the score!",
        },
        {
          type: "department-component",
          custom_text: "",
          default_text: "Select your department!",
        },
      ],
    },
    {
      _id: "6556081117d0c3e1240a25dc",
      name: "TEST-CASE2",
      date_created: "2023-11-16T12:16:17.924580Z",
      date_updated: null,
      components: [
        {
          type: "enps-component",
          custom_text: "",
          default_text: "Fill in the score!",
        },
        {
          type: "department-component",
          custom_text: "",
          default_text: "Select your department!",
        },
      ],
    },
    {
      _id: "6556081117d0c3e1240a25dc",
      name: "TEST-CASE2",
      date_created: "2023-11-16T12:16:17.924580Z",
      date_updated: null,
      components: [
        {
          type: "enps-component",
          custom_text: "",
          default_text: "Fill in the score!",
        },
        {
          type: "department-component",
          custom_text: "",
          default_text: "Select your department!",
        },
      ],
    },
  ];
</script>

<!--Grid-->
<div class="grid grid-cols-4 gap-10 mt-10 px-10">
  <div class="bg-white shadow-md rounded-md text-center h-96">
    <div class="h-full flex items-center justify-center">
      <a href="href" on:click={click}>
        <div
          class="custom-color rounded-full h-12 w-12 flex items-center justify-center"
        >
          <span class="text-white font-bold text-2xl">+</span>
        </div>
      </a>
    </div>
    <p class="text-center text-lg font-bold text-black">Add Template</p>
  </div>

  {#each templates as template}
    <div class="bg-white shadow-md rounded-md text-center h-96">
      <div class="h-full flex items-center justify-center">
        <a href="href" on:click={click}>
          <div
            class="flex items-center justify-center custom-color rounded-full h-12 w-12 mx-2"
          >
            <span class="text-black font-bold text-2xl">+</span>
          </div>
        </a>
        <a href="href" on:click={click}>
          <div
            class="flex items-center justify-center custom-color rounded-full h-12 w-12 mx-2"
          >
            <span class="text-white font-bold text-2xl">
              <img alt="edit" src="../src/images/edit.png" class="h-4 w-4" />
            </span>
          </div>
        </a>
      </div>
      <p class="text-center text-lg font-bold text-black">{template.name}</p>
    </div>
  {/each}
</div>

<style>
  .custom-color {
    background-color: #de896e;
  }
</style>
