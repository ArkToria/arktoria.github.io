import { request } from 'https://cdn.skypack.dev/@octokit/request';
import { semverRegex } from 'https://cdn.skypack.dev/semver-regex';
async function setACrossGitVersion() {
    const content = await request('GET /repos/{owner}/{repo}/actions/artifacts', {
        owner: 'Arktoria',
        repo: 'ACross'
    });
    const pkgName = content.data.artifacts[0].name;
    if (pkgName.length !== 0) {
        const verDiv = document.getElementById('across-git-version');
        const verElement = document.createElement('span');
        const verStr = pkgName.match(semverRegex());
        if (verStr !== null) {
            verElement.textContent = verStr[0].toString();
            verDiv === null || verDiv === void 0 ? void 0 : verDiv.appendChild(verElement);
        }
    }
}
setACrossGitVersion();
