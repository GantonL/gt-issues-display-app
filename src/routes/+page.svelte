<script lang="ts">
	import { page } from "$app/state";

  let issues = $state(page.data.issues);
  const pages = $state(page.data.pages);
  let currentPage = $state(1);
  let hasPrev = $state(page.data.hasPrev);
  let hasNext = $state(page.data.hasNext);
  let issuesStates: Record<number, {opened?: boolean}> = $state({});
  
  function toggleIssueBody(number: number) {
    if (!issuesStates[number]) {
      issuesStates[number] = {};
    }
    issuesStates[number].opened = !issuesStates[number].opened;
  }

  function getPrevPage() {
    currentPage--;
    getPage(currentPage)
  }

  function getNextPage() {
    currentPage++;
    getPage(currentPage)
  }

  function onPageInputChange(pageNumber: number) {
    if (pageNumber < 1) {
      currentPage = 1;
    }
    if (pageNumber > pages) {
      currentPage = pages;
    }
    getPage(currentPage);
  }

  function getPage(page: number) {
    fetch(`/?page=${page}`)
    .then(res => {
      res.json().then(page => {
        issuesStates = {};
        issues = page.issues;
        hasPrev = page.hasPrev;
        hasNext = page.hasNext;
      })
    })
  }
</script>

<div class="p-4 flex flex-col gap-2">
  <h2 class="text-xl">lakeFS Issues</h2>
  {#each issues as issue}
    <div class="flex flex-col border p-2 rounded-md">
      <h3 class="text-md font-medium">
        <button class="hover:underline-offset-1 hover:underline cursor-pointer" onclick={() => toggleIssueBody(issue.number)}>{issue.title}</button>
      </h3>
      <span>#{issue.number}</span>
      {#if issuesStates[issue.number] && issuesStates[issue.number].opened}
        <p>{issue.body}</p>
      {/if}
    </div>
  {/each}
  <div class="flex flex-row gap-4 items-center justify-end">
    <button class="border rounded-md p-1 cursor-pointer disabled:text-gray-500 disabled:cursor-default"
      disabled={!hasPrev} 
      onclick={getPrevPage}>Prev</button>
    <span>Page</span>
    <input type="number" min=0 max={pages} class="max-w-8 border rounded-md" bind:value={currentPage} onchange={(v: any) => onPageInputChange(v.target.value)}>
    <span>of {pages}</span>
    <button class="border rounded-md p-1 cursor-pointer disabled:text-gray-500 disabled:cursor-default" 
      disabled={!hasNext}  
      onclick={getNextPage}>Next</button>
  </div>
</div>