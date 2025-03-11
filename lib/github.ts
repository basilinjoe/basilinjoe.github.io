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

    const repos = await response.json();
    return repos.map((repo: any) => ({
      name: repo.name,
      description: repo.description,
      html_url: repo.html_url,
      stargazers_count: repo.stargazers_count,
      language: repo.language,
      forks_count: repo.forks_count,
      watchers_count: repo.watchers_count,
      topics: repo.topics || [],
      homepage: repo.homepage
    }));
  } catch (error) {
    console.error('Error fetching GitHub repositories:', error);
    return [];
  }
}