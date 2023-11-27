<script lang="ts">
    export let title:string = "";
    export let date:string = "";
    export let href:string = "";
    export let isLink:boolean = false;
</script>

{#if isLink}
    <a href={href} class="flex flex-col min-w-fit min-h-fit mr-16 mt-16 hover:scale-105 duration-100">
        <div class="h-52 w-52 bg-color-highlight rounded-lg">
            <slot/>
        </div>
        <div class="pl-1">
            <p class="text-color-text_light font-light">{date}</p>
            <p class="text-color-accent font-semibold">{title}</p>
        </div>
    </a>
{:else}
    <div class="flex flex-col min-w-fit min-h-fit mr-16 mt-16 hover:scale-105 duration-100">
        <div class="h-52 w-52 bg-color-highlight rounded-lg">
            <slot/>
        </div>
        <div class="pl-1">
            <p class="text-color-text_light font-light">{date}</p>
            <p class="text-color-accent font-semibold">{title}</p>
        </div>
    </div>
{/if}
