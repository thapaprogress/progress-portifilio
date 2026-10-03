export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  role: string;
  location: string;
  bio: string;
  joinedDate: string;
  followersCount: number;
  followingCount: number;
  hikesLogged: number;
  totalElevationFt: number;
  totalDistanceMi: number;
  currentStreakWeeks: number;
  avatarSeed: string;
  verifiedSteward: boolean;
}

export interface PhotoTile {
  id: string;
  caption: string;
  locationName: string;
  altitudeFt: number;
  palette: 'pine' | 'granite' | 'sunset' | 'lake' | 'mist';
  badgeLabel?: string;
}

export interface TrailLog {
  id: string;
  trailName: string;
  region: string;
  timestamp: string;
  activityType: 'Alpine Hike' | 'Thru-Hike' | 'Scramble' | 'Trail Run' | 'Snowshoe';
  distanceMi: number;
  elevationGainFt: number;
  movingTime: string;
  maxAltitudeFt: number;
  difficulty: 'Easy' | 'Moderate' | 'Strenuous' | 'Expert';
  conditionReport: string;
  trailStatus: 'Clear' | 'Snow Above 6k' | 'Blowdowns' | 'Muddy' | 'Buggy';
  photos: PhotoTile[];
  kudosCount: number;
  userGaveKudos: boolean;
  commentsCount: number;
  comments: {
    id: string;
    author: string;
    avatarInitials: string;
    timeAgo: string;
    text: string;
  }[];
  elevationProfile: number[]; // Sparkline data points
  gearHighlights: string[];
  isMilestone?: boolean;
  milestoneTitle?: string;
}

export interface SavedTrail {
  id: string;
  name: string;
  park: string;
  distanceMi: number;
  elevationFt: number;
  difficulty: 'Moderate' | 'Strenuous' | 'Expert';
  permitRequired: boolean;
  bestSeason: string;
  status: 'Open' | 'Snow Caution' | 'Wildfire Watch' | 'Permit Window Active';
  lastReportedDate: string;
}

export interface Badge {
  id: string;
  title: string;
  description: string;
  category: 'Elevation' | 'Stewardship' | 'Explorer' | 'Endurance';
  dateEarned: string;
  level: 'Bronze' | 'Silver' | 'Gold' | 'Alpine Gold';
}

export interface CommunityMember {
  id: string;
  name: string;
  handle: string;
  avatarSeed: string;
  lastHike: string;
  isFollowing: boolean;
  recentKudos: boolean;
}
