import { request } from 'https://cdn.skypack.dev/@octokit/request'

async function getActions (actionName: string) {
  const content = await request('GET /repos/{owner}/{repo}/actions/artifacts', {
    owner: 'Arktoria',
    repo: 'ACross'
  })

  console.log(content.data.artifacts[0].name)
}

getActions('')
