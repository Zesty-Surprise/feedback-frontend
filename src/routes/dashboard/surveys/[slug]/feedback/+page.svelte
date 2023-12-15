<script lang="ts">
    import FilterModal from "$lib/components/FilterModal.svelte";

    export let data: any;
    let forms = data.completedForms;

    let showModal: boolean = false;
    let checkedBox: string;

    function handleCheckboxesChanged(event: any) {
        checkedBox = event.detail;
        if (checkedBox == null) {
            forms = data.completedForms;
        } else {
            forms = filterForms(data.completedForms, checkedBox);
        }

        currentPage = 0;
        maxPages = Math.ceil(forms.length / chunkSize) - 1;
        /* pages = Array.from(Array(maxPages + 1).keys()); */

        currentForms = chunkedForms(forms, currentPage);
    }
    function filterForms(forms: Array<any>, department: string) {
        let array = [];
        for (let i = 0; i < forms.length; i++) {
            if (forms[i].department == department) {
                array.push(forms[i]);
            }
        }

        return array;
    }

    let currentPage: number = 0;
    let chunkSize = forms.length <= 8 ? forms.length : 8;
    let maxPages = forms.length / chunkSize - 1;
    /* let pages = Array.from(Array(maxPages + 1).keys()); */

    let currentForms = chunkedForms(forms, currentPage);

    function chunkedForms(forms: Array<any>, currentPage: number) {
        let selectedForms: Array<any> = [];

        for (let i = 0; i < forms.length; i++) {
            if (
                i >= chunkSize * currentPage &&
                i < chunkSize * (currentPage + 1)
            ) {
                selectedForms.push(forms[i]);
            }
        }
        return selectedForms;
    }
    function nextPage() {
        if (currentPage < maxPages) {
            currentPage++;
            currentForms = chunkedForms(forms, currentPage);
        }
    }
    function previousPage() {
        if (currentPage > 0) {
            currentPage--;
            currentForms = chunkedForms(forms, currentPage);
        }
    }
    function setPage(page: number) {
        currentPage = page;
        currentForms = chunkedForms(forms, currentPage);
    }
</script>

<!-- <img class="w-3/4" src="/images/feedback.png" alt="" srcset="" /> -->

{#if forms[0] != undefined}
    <div class="mt-10 mb-6">
        <button
            class="flex items-center bg-[#de896e] rounded-full pt-[8px] px-[16px] pb-[10px] ml-10"
            on:click={() => (showModal = !showModal)}
            ><img
                src="/images/filter.svg"
                alt="Zesty Surprise"
                class="max-w-[25px] max-w-[25px]"
            /><strong class="text-white">Filter</strong></button
        >
    </div>
    <div class="mr-16 ml-10 w-full justify-between">
        <!-- Feedback (page) -->
        <div class="divide-y divide-gray-200">
            {#each currentForms as form}
                <div
                    class="flex flex-horizontal items-center divide-x divide-gray-200 py-2"
                >
                    <div class="flex justify-center w-24 py-2">
                        <div
                            class="bg-{form.type} font-semibold rounded-full flex items-center justify-center w-12 h-12 text-2xl text-white"
                        >
                            {form.score}
                        </div>
                    </div>
                    <div class="px-2">
                        <div class="text-gray-700 mb-1">
                            Team {form.department}
                        </div>
                        <div class="h-full">{form.custom[0].custom}</div>
                    </div>
                </div>
            {/each}
        </div>

        <!-- Page selector -->
        <div
            class="flex flex-col justify-center items-center sticky top-[80vh]"
        >
            <!-- Help text -->
            <span class="text-sm text-gray-700">
                Showing <span class="font-semibold text-gray-900"
                    >{currentPage * chunkSize + 1}</span
                >
                to
                <span class="font-semibold text-gray-900"
                    >{currentPage * chunkSize + currentForms.length}</span
                >
                of
                <span class="font-semibold text-gray-900">{forms.length}</span> Entries
            </span>
            <!-- Buttons -->
            <div class="inline-flex mt-2 xs:mt-0">
                <button
                    on:click={previousPage}
                    class="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-s hover:bg-gray-100"
                >
                    Prev
                </button>
                <button
                    on:click={nextPage}
                    class="flex items-center justify-center px-4 h-10 text-base font-medium text-gray-500 bg-white border border-gray-300 rounded-e hover:bg-gray-100"
                >
                    Next
                </button>
            </div>
        </div>
        <!-- Page selector -->
        <!-- <nav -->
        <!--     aria-label="Written feedback page selector" -->
        <!--     class="flex justify-center items-center sticky top-[85vh]" -->
        <!-- > -->
        <!--     <ul class="inline-flex -space-x-px text-base h-10"> -->
        <!--         <li> -->
        <!--             <button -->
        <!--                 on:click={previousPage} -->
        <!--                 class="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700" -->
        <!--                 >Previous</button -->
        <!--             > -->
        <!--         </li> -->
        <!--         {#each pages as page} -->
        <!--             <li> -->
        <!--                 {#if currentPage == page} -->
        <!--                     <button -->
        <!--                         class="flex items-center justify-center px-4 h-10 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700" -->
        <!--                         >{page}</button -->
        <!--                     > -->
        <!--                 {:else} -->
        <!--                     <button -->
        <!--                         on:click={() => setPage(page)} -->
        <!--                         class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700" -->
        <!--                         >{page}</button -->
        <!--                     > -->
        <!--                 {/if} -->
        <!--             </li> -->
        <!--         {/each} -->
        <!--         <li> -->
        <!--             <button -->
        <!--                 on:click={nextPage} -->
        <!--                 class="flex items-center justify-center px-4 h-10 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700" -->
        <!--                 >Next</button -->
        <!--             > -->
        <!--         </li> -->
        <!--     </ul> -->
        <!-- </nav> -->
    </div>
{:else}
    <h1 class="h-full flex justify-center items-center text-4xl">
        No feedback to display
    </h1>
{/if}

{#if showModal}
    <FilterModal
        bind:showModal
        on:checkboxesChanged={handleCheckboxesChanged}
    />
{/if}
