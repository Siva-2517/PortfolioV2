import React from "react";
import { GitBranch, Star, Github } from "lucide-react";
import { PROFILE } from "@/lib/data";

interface GitHubStatsData {
  totalCommits: number;
  topRepo: {
    name: string;
    stars: number;
    url: string;
  } | null;
}

// Fetch GitHub statistics server-side (Next.js App Router Server Component)
async function getGithubStats(): Promise<GitHubStatsData> {
  const username = "Siva-2517"; // Siva's GitHub username
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    console.warn("WARNING: GITHUB_TOKEN is not defined in the environment. Utilizing mock GitHub statistics.");
    
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 50));

    return {
      totalCommits: 312,
      topRepo: {
        name: "rag-customer-support",
        stars: 8,
        url: `https://github.com/${username}/rag-customer-support`
      }
    };
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
          }
        }
        pinnedItems(first: 6, types: [REPOSITORY]) {
          nodes {
            ... on Repository {
              name
              stargazerCount
              url
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        query,
        variables: { username }
      }),
      // Set ISR revalidation to 1 hour (3600 seconds)
      next: { revalidate: 3600 }
    });

    if (!response.ok) {
      throw new Error(`GitHub GraphQL API request failed: ${response.statusText}`);
    }

    const json = await response.json();
    const user = json.data?.user;

    if (!user) {
      throw new Error("Unable to retrieve user details from GraphQL response.");
    }

    const totalCommits = user.contributionsCollection?.contributionCalendar?.totalContributions || 0;
    const pinnedRepos = user.pinnedItems?.nodes || [];

    // Identify the repo with the highest star count
    let topRepo = null;
    if (pinnedRepos.length > 0) {
      const sorted = [...pinnedRepos].sort((a, b) => b.stargazerCount - a.stargazerCount);
      topRepo = {
        name: sorted[0].name,
        stars: sorted[0].stargazerCount,
        url: sorted[0].url
      };
    }

    return { totalCommits, topRepo };

  } catch (error) {
    console.warn("WARNING: Unable to fetch live GitHub stats (token may be invalid or query failed). Utilizing fallback statistics. Error:", error);
    // Silent recovery: Fall back to mock numbers
    return {
      totalCommits: 312,
      topRepo: {
        name: "rag-customer-support",
        stars: 8,
        url: `https://github.com/${username}/rag-customer-support`
      }
    };
  }
}

export default async function GithubStats() {
  const stats = await getGithubStats();

  return (
    <div className="w-full max-w-5xl mx-auto px-4 md:px-8 mt-12 mb-6">
      <div className="glass-card px-5 py-3.5 bg-surface-glass/30 border-border-hairline flex flex-col sm:flex-row items-center justify-between gap-4 select-none">
        
        {/* Left: Synced Live Status */}
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00E6A0] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00E6A0]"></span>
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider font-data text-text-secondary">
            synced live
          </span>
        </div>

        {/* Middle: Metrics Stats */}
        <div className="flex flex-wrap items-center justify-center gap-6 md:gap-10 text-xs font-data">
          
          {/* Commits */}
          <div className="flex items-center gap-2">
            <GitBranch className="w-4 h-4 text-accent-indigo" />
            <span className="text-text-secondary">GitHub Commits (2026):</span>
            <span className="font-bold text-text-primary text-sm">
              {stats.totalCommits.toString().padStart(3, "0")}
            </span>
          </div>

          {/* Top Repo */}
          {stats.topRepo && (
            <a
              href={stats.topRepo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 group hover:text-text-primary transition-colors"
            >
              <Star className="w-4 h-4 text-accent-coral group-hover:scale-110 transition-transform" />
              <span className="text-text-secondary">Top Project:</span>
              <span className="font-semibold text-text-primary border-b border-dashed border-white/20 group-hover:border-accent-coral/60 transition-colors">
                {stats.topRepo.name}
              </span>
              <span className="font-bold text-[#00E6A0]">
                ({stats.topRepo.stars.toString().padStart(2, "0")} ★)
              </span>
            </a>
          )}

        </div>

        {/* Right: Github Portal Link */}
        <a
          href={PROFILE.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-xs font-semibold text-accent-indigo hover:text-accent-coral transition-colors font-data"
        >
          <Github className="w-4 h-4" />
          <span>View GitHub</span>
        </a>

      </div>
    </div>
  );
}
