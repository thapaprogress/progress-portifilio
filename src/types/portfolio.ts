export interface AcademicHistoryItem {
  period: string;
  institution: string;
  degree: string;
  details: string;
  regNo?: string;
  score?: string;
  isComplete: boolean;
}

export interface ProfessionalHistoryItem {
  period: string;
  role: string;
  organization: string;
  focus: string;
}

export interface PeerReviewedPaper {
  id: string;
  title: string;
  journalOrConference: string;
  publisher: string;
  publicationType: 'Journal (J-NaNA)' | 'IEEE Conference (ICTP)';
  year: number;
  pagesOrVolume: string;
  doi?: string;
  authorOrder: string; // e.g. "Progress Jung Thapa (1st Author / 5 Authors)"
  authorsList: string[];
  refereed: boolean;
  abstract: string;
  keywords: string[];
  metrics: { label: string; value: string }[];
  benchmarks: number[];
  deploymentHours?: number; // e.g. 672-hr deployment
  citationBibtex: string;
}

export interface DeveloperProfile {
  name: string;
  youtube: string; // e.g. "https://www.youtube.com/@pjt247"
  handle: string;
  title: string;
  role: string;
  organization: string;
  location: string;
  address: string;
  dob: string;
  age: number;
  nationality: string;
  gender: string;
  bio: string;
  joinedDate: string;
  phonePrimary: string;
  phoneSecondary: string;
  emailUniversity: string;
  emailPersonal: string;
  website: string;
  github: string;
  devfolio: string;
  researchgate: string;
  avatarInitials: string;
  targetDoctoralCourse: string;
  totalCommits: number;
  fieldTrialsCount: number;
  publicationsCount: number;
  activeStreakWeeks: number;
  modelAccuracyScore: string;
  academicHistory: AcademicHistoryItem[];
  professionalHistory: ProfessionalHistoryItem[];
  oralPresentations: { title: string; date: string; venue: string; category: string }[];
  honors: { title: string; date: string; issuer: string; detail: string }[];
}

export interface VisualTile {
  id: string;
  title: string;
  subtitle: string;
  diagramType: 'yolo_detection' | 'edge_hardware' | 'architecture_diagram' | 'field_trial' | 'prajna_system' | 'hsmm_kinematics' | 'unesco_shrine';
  badge?: string;
}

export interface ProjectWork {
  id: string;
  title: string;
  subtitle: string;
  category: 'Computer Vision' | 'Edge AI & IoT' | 'Distributed Systems' | 'Academic Research' | 'Field Deployments' | 'Open Source';
  timestamp: string;
  status: 'Published' | 'Live in Field' | 'Active Production' | 'Open Source';
  doi?: string;
  publicationRef?: string;
  summary: string;
  deepDive: string;
  metrics: { label: string; value: string }[];
  benchmarks: number[];
  technologies: string[];
  visualTiles: VisualTile[];
  starsCount: number;
  userStarred: boolean;
  commentsCount: number;
  comments: {
    id: string;
    author: string;
    avatarInitials: string;
    timeAgo: string;
    text: string;
  }[];
  links: {
    github?: string;
    liveDemo?: string;
    paperUrl?: string;
    newsUrl?: string;
    doiUrl?: string;
  };
  isFlagship?: boolean;
  flagshipBadge?: string;
}

export interface FeaturedStackItem {
  id: string;
  name: string;
  domain: string;
  latencyOrMetric: string;
  status: 'Optimized' | 'Active Field' | 'Production Ready' | 'Experimental';
  stackList: string[];
  description: string;
  lastUpdated: string;
}

export interface AchievementBadge {
  id: string;
  title: string;
  organization: string;
  category: 'Research' | 'Engineering' | 'Founder' | 'Honor' | 'Academic';
  dateEarned: string;
  description: string;
  tier: 'Flagship' | 'Gold' | 'Verified';
  citationOrRef?: string;
}

export interface ResearchCollaborator {
  id: string;
  name: string;
  role: string;
  institution: string;
  connected: boolean;
}
