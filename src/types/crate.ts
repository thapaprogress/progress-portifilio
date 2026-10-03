export interface RepoFileNode {
  name: string;
  type: 'file' | 'folder';
  sizeOrLines?: string;
  description?: string;
  children?: RepoFileNode[];
}

export interface ChamberData {
  number: string;
  name: string;
  subtitle: string;
  tagline: string;
  content: string;
  technicalSpecs: { label: string; value: string }[];
  codeSnippet?: string;
}

export interface ProjectSleeveRelease {
  id: string;
  repoName: string;
  githubUrl: string;
  releaseTag: string; // e.g. "v2.4.0-STABLE"
  catalogNumber: string; // e.g. "MBUST-2025-01"
  matrixCode: string; // e.g. "J-NANA-INT8-MASTER"
  title: string;
  subtitle: string;
  category: string;
  year: number;
  commitHash: string; // e.g. "a9f4c3b"
  stars: number;
  forks: number;
  license: string;
  waferVariant: 'emerald' | 'cobalt' | 'amber' | 'ruby' | 'obsidian' | 'tangerine';
  baseFrequency: number; // For audio synth harmonic tone
  spineLabel: string;
  coverAccent: string;
  fileTree: RepoFileNode[];
  dependencies: { name: string; version: string; role: string }[];
  chambers: ChamberData[];
  liveMetric: { label: string; value: string };
}

export interface RawGithubRepo {
  name: string;
  html_url: string;
  description: string;
  language: string;
  stars: number;
  forks?: number;
  category: string;
  defaultBranch?: string;
  updatedAt?: string;
}
