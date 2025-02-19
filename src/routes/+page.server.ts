import { Octokit } from "@octokit/core";
import type { PageServerLoad } from "./$types";
import { GITHUB_ACCESS_TOKEN } from "$env/static/private";

const octokit = new Octokit({
  auth: GITHUB_ACCESS_TOKEN
});

const PER_PAGE = 10;

export const load: PageServerLoad = async () => {
  const issuesRes = await octokit.request('GET /repos/{owner}/{repo}/issues', {
    owner: 'treeverse',
    repo: 'lakeFS',
    headers: {
      'X-GitHub-Api-Version': '2022-11-28'
    },
    per_page: PER_PAGE,
  });
  const pages = getTotalPagesFromUrl(issuesRes.headers.link);
  const issues = issuesRes?.data?.map(d => {
    return {
      number: d.number,
      title: d.title,
      body: d.body,
    }
  })
  return {issues, pages};
};

const getTotalPagesFromUrl = (url?: string) => {
  const matches = url?.match(/(?<=<)([\S]*)(?=>; rel="last")/i);
  if (!matches || matches?.length === 0) {
     return 0;
  }
  const paramsString = matches[0]?.toString().split('?')[1] ?? ''; 
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