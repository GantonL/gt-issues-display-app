<script lang="ts">
	import { page } from "$app/state";

  const issues = $state(page.data.issues);
  const pages = $state(page.data.pages);
</script>

<div class="p-2">
  <h2 class="text-lg">lakeFS Issues</h2>
  {#each issues as issue}
    <div class="flex flex-col gap-2 border rounded-md p-2 m-2">
      <span>{issue.number}</span>
      <span>{issue.title}</span>
    </div>  
  {/each}
</div>