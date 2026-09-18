export interface Repository {
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  language: string;
  forks_count: number;
  watchers_count: number;
  topics: string[];
  homepage: string | null;
  updated_at: string;
}

/**
 * The subset of GitHub's `/users/:user/repos` payload this site reads.
 * Fields are optional because the API omits them on some repos (`topics` and
 * `updated_at` are defaulted below), and because this is untrusted JSON: typing
 * it loosely here is what lets the mapping below stay explicit.
 */
interface GithubRepoResponse {
  name?: string;
  description?: string;
  html_url?: string;
  stargazers_count?: number;
  language?: string;
  forks_count?: number;
  watchers_count?: number;
  topics?: string[];
  homepage?: string | null;
  updated_at?: string;
}

export async function getGithubRepos(username: string, limit: number = 4): Promise<Repository[]> {
  try {
    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=${limit}&type=owner`,
      { 
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
          'Accept': 'application/vnd.github.v3+json',
        }
      }
    );

    if (!response.ok) {
      console.error('Failed to fetch GitHub repositories');
      return [];
    }

    const repos: GithubRepoResponse[] = await response.json();
    return repos.map((repo) => ({
      name: repo.name ?? '',
      description: repo.description ?? '',
      html_url: repo.html_url ?? '',
      stargazers_count: repo.stargazers_count ?? 0,
      language: repo.language ?? '',
      forks_count: repo.forks_count ?? 0,
      watchers_count: repo.watchers_count ?? 0,
      topics: repo.topics ?? [],
      homepage: repo.homepage ?? null,
      updated_at: repo.updated_at ?? '',
    }));
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return [];
  }
}
