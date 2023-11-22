<script>
    import Survey from "./Survey.svelte";
    const surveys = [
    {
      title: "eNPS Survey",
      date: "19.10.2023",
    },
    {
      title: "eNPS Survey",
      date: "19.10.2023",
    },
    {
      title: "eNPS Survey",
      date: "19.10.2023",
    },
    {
      title: "eNPS Survey",
      date: "19.10.2023",
    },
    {
      title: "eNPS Survey",
      date: "19.10.2023",
    },
    {
      title: "eNPS Survey",
      date: "19.10.2023",
    },
    {
      title: "eNPS Survey",
      date: "19.10.2023",
    },
    {
      title: "eNPS Survey",
      date: "19.10.2023",
    },
  ];
</script>
<div class="flex flex-wrap ml-12 mr-16">
    <Survey title="Create a new survey">
        <div class="flex justify-center items-center h-full w-full">
            <div class="bg-[#de896e] rounded-full w-14 h-14 flex justify-center items-center">
                <iconify-icon icon="typcn:plus" width=48px/>
            </div>
        </div>
    </Survey>
    {#each surveys as survey}
        <Survey title={survey.title} date={survey.date}/>
    {/each}
</div>
