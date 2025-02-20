import type { PageServerLoad } from "./$types";
import type { RequestEvent } from "@sveltejs/kit";

export const load: PageServerLoad = async (event: RequestEvent) => {
  const issuesRes = await event.fetch('/');
  const pageData = await issuesRes.json();
  return pageData;
};
