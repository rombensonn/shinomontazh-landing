import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === "true";
const githubRepositoryName =
  process.env.GITHUB_REPOSITORY?.split("/")[1] ||
  process.env.GITHUB_REPOSITORY_NAME ||
  "shinomontazh-landing";
const githubPagesBasePath = `/${githubRepositoryName}`;

const nextConfig: NextConfig = {
  allowedDevOrigins: ["127.0.0.1"],
  env: {
    NEXT_PUBLIC_BASE_PATH: isGitHubPages ? githubPagesBasePath : "",
  },
  ...(isGitHubPages
    ? {
        assetPrefix: `${githubPagesBasePath}/`,
        basePath: githubPagesBasePath,
        images: {
          unoptimized: true,
        },
        output: "export",
        trailingSlash: true,
      }
    : {}),
};

export default nextConfig;
