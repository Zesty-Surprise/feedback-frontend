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
<div class="flex flex-wrap justify-between ml-12 mr-16">
    {#each surveys as survey}
        <Survey title={survey.title} date={survey.date}/>
    {/each}
</div>
