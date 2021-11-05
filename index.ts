import { request } from 'https://cdn.skypack.dev/@octokit/request'

async function setACrossGitVersion () {
  const content = await request('GET /repos/{owner}/{repo}/actions/artifacts', {
    owner: 'Arktoria',
    repo: 'ACross'
  })

  // TODO: match semver
  const pkgNameStringArray = content.data.artifacts[0].name.split('-')

  if (pkgNameStringArray.length !== 0) {
    const verDiv = document.getElementById('across-git-version')
    const verElement = document.createElement('span')
    const verStr = pkgNameStringArray[pkgNameStringArray.length - 1]
    verElement.textContent = verStr
    verDiv?.appendChild(verElement)
  }
}

setACrossGitVersion()
