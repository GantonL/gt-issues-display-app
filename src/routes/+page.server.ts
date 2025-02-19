import { Octokit } from "@octokit/core";
import type { PageServerLoad } from "./$types";
import { GITHUB_ACCESS_TOKEN } from "$env/static/private";

const octokit = new Octokit({
  auth: GITHUB_ACCESS_TOKEN
});

const PER_PAGE = 10;

export const load: PageServerLoad = async () => {
  const issues = await octokit.request('GET /repos/{owner}/{repo}/issues', {
    owner: 'treeverse',
    repo: 'lakeFS',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    },
    per_page: PER_PAGE,
  });
  const pagesUrl = issues.headers.link?.match(/(?<=<)([\S]*)(?=>; rel="last")/i);
  const pages = getTotalPagesFromUrl((pagesUrl ?? [])[0]?.toString());
  return {issues: issues.data, pages};
};

const getTotalPagesFromUrl = (url?: string) => {
  if (!url || url?.length === 0) {
     return 0;
  }
  const paramsString = url.split('?')[1] ?? ''; 
  const queryParams = paramsString.split('&').map(p => {
    const keyValue = p.split('=');
    return {
      key: keyValue[0],
      value: keyValue[1],
    }
  });
  const pageKeyValue =  queryParams.find(q => q.key === 'page');
  return Number(pageKeyValue?.value ?? 0);
}