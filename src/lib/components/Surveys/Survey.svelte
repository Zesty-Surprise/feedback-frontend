<script lang="ts">
    export let title:string = "";
    export let date:string = "";
</script>

<div class="flex flex-col min-w-fit	min-h-fit mr-16 mt-16 hover:scale-105 duration-100">
    <div class="h-52 w-52 bg-[#F5E5D3] rounded-lg">
        <div>

        </div>
    </div>
    <div>
        <p class="text-[#A19F9F] font-light">{date}</p>
        <p class="text-[#de896e] font-semibold">{title}</p>
    </div>
</div>