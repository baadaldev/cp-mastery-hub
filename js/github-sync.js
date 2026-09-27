/**
 * 1-Click GitHub Auto-Push & Repository Sync Integration
 * Allows pushing any written/tested code directly to user's GitHub profile.
 */

class GitHubSync {
  constructor() {
    this.tokenKey = "cp_github_pat";
    this.repoKey = "cp_github_target_repo";
    this.defaultRepo = "competitive-programming";
    this.owner = "baadaldev";
  }

  getToken() {
    return localStorage.getItem(this.tokenKey) || "";
  }

  setToken(token) {
    localStorage.setItem(this.tokenKey, token.trim());
  }

  getTargetRepo() {
    return localStorage.getItem(this.repoKey) || this.defaultRepo;
  }

  setTargetRepo(repoName) {
    localStorage.setItem(this.repoKey, repoName.trim());
  }

  async checkOrCreateRepo(token, repoName) {
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json"
    };

    try {
      const res = await fetch(`https://api.github.com/repos/${this.owner}/${repoName}`, { headers });
      if (res.status === 200) {
        return true; // Already exists
      }
    } catch (e) {}

    // Create repo if it doesn't exist
    try {
      const createRes = await fetch("https://api.github.com/user/repos", {
        method: "POST",
        headers,
        body: JSON.stringify({
          name: repoName,
          description: "⚔️ Competitive Programming and Data Structures & Algorithms Solutions automatically synced from CP Mastery Hub.",
          private: false,
          auto_init: true
        })
      });
      return createRes.status === 201;
    } catch (e) {
      console.error("Failed to auto-create repo:", e);
      return false;
    }
  }

  async pushCode({ filename, content, commitMessage }) {
    const token = this.getToken();
    if (!token) {
      throw new Error("GitHub Personal Access Token is required. Please set it in GitHub Sync Settings.");
    }

    const repoName = this.getTargetRepo();
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      "Content-Type": "application/json"
    };

    // Ensure repo exists
    await this.checkOrCreateRepo(token, repoName);

    // Check if file already exists to get its SHA for update
    let existingSha = null;
    try {
      const getFileRes = await fetch(
        `https://api.github.com/repos/${this.owner}/${repoName}/contents/${filename}`,
        { headers }
      );
      if (getFileRes.status === 200) {
        const fileData = await getFileRes.json();
        existingSha = fileData.sha;
      }
    } catch (e) {}

    // Encode content to Base64 (Unicode safe)
    const base64Content = btoa(unescape(encodeURIComponent(content)));

    const bodyData = {
      message: commitMessage || `feat: add solution for ${filename}`,
      content: base64Content
    };
    if (existingSha) {
      bodyData.sha = existingSha;
    }

    const putRes = await fetch(
      `https://api.github.com/repos/${this.owner}/${repoName}/contents/${filename}`,
      {
        method: "PUT",
        headers,
        body: JSON.stringify(bodyData)
      }
    );

    if (!putRes.ok) {
      const err = await putRes.json();
      throw new Error(err.message || "Failed to commit file to GitHub.");
    }

    const resJson = await putRes.json();
    return {
      commitUrl: resJson.commit?.html_url || `https://github.com/${this.owner}/${repoName}`,
      filePath: resJson.content?.path || filename,
      repoName: repoName
    };
  }
}

window.githubSync = new GitHubSync();
