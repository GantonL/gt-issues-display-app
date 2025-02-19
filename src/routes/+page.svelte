<script lang="ts">
	import { page } from "$app/state";

  const issues = $state(page.data.issues);
  const pages = $state(page.data.pages);
  const issuesStates: Record<number, {opened?: boolean}> = $state({});
  function toggleIssueBody(number: number) {
    if (!issuesStates[number]) {
      issuesStates[number] = {};
    }
    issuesStates[number].opened = !issuesStates[number].opened;
  }
</script>

<div class="p-2">
  <h2 class="text-lg">lakeFS Issues</h2>
  {#each issues as issue}
    <div class="flex flex-col gap-2 border rounded-md p-2 m-2">
      <h3 class="text-md font-medium">
        <button class="hover:underline-offset-1 hover:underline cursor-pointer" onclick={() => toggleIssueBody(issue.number)}>{issue.title}</button>
      </h3>
      <span>#{issue.number}</span>
      {#if issuesStates[issue.number] && issuesStates[issue.number].opened}
        <p>{issue.body}</p>
      {/if}
    </div>
  {/each}
</div>