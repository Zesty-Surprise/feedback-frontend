<script lang="ts">
    export let title:string = "";
    export let date:string = "";
</script>

<div class="flex flex-col mr-16 mt-16 hover:scale-105 duration-100">
    <div class="flex items-center justify-evenly h-52 w-52 bg-color-highlight rounded-lg">
        <slot/>
    </div>
    <div class="pl-1">
        <p class="text-color-text_light font-light">{date}</p>
        <p class="text-color-accent font-semibold break-all">{title}</p>
    </div>
</div>

