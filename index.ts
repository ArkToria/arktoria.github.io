import { request } from 'https://cdn.skypack.dev/@octokit/request'

async function setACrossGitVersion () {
  const content = await request('GET /repos/{owner}/{repo}/actions/artifacts', {
    owner: 'Arktoria',
    repo: 'ACross'
  })

  const pkgMap = new Map<string, boolean>()

  for (const pkg of content.data.artifacts) {
    for (const pkgType of ['msvc', 'mingw-w64', 'archlinux']) {
      if (pkg.name !== '' && pkg.name.includes(pkgType) && !pkgMap.has(pkgType)) {
        pkgMap.set(pkgType, true)
        const verElement = document.getElementById(`across-git-${pkgType}`)
        if (verElement != null) {
          verElement.textContent = pkg.name
        }
        break
      }
    }
  }
}

setACrossGitVersion()
