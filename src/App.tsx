import React, { useState } from 'react';
import { Header } from './components/Header';
import { DeveloperSidebar } from './components/DeveloperSidebar';
import { StreakBanner } from './components/StreakBanner';
import { WorksFeed } from './components/WorksFeed';
import { DeveloperStatRail } from './components/DeveloperStatRail';
import { EdgeVideoPlayer } from './components/EdgeVideoPlayer';
import { LogProjectModal } from './components/LogProjectModal';
import { VisualLightboxModal } from './components/VisualLightboxModal';
import { StackDetailModal } from './components/StackDetailModal';
import { AchievementDetailModal } from './components/AchievementDetailModal';
import { ResearchStatsModal } from './components/ResearchStatsModal';
import { ContactModal } from './components/ContactModal';
import { NotificationsModal } from './components/NotificationsModal';
import { CurriculumVitaeModal } from './components/CurriculumVitaeModal';
import { ArchitectureStackView } from './components/ArchitectureStackView';
import { PhilosophyView } from './components/PhilosophyView';
import { PublicationsView } from './components/PublicationsView';
import { ProjectCrateCarousel } from './components/ProjectCrateCarousel';
import { GatefoldScrollWorld } from './components/GatefoldScrollWorld';
import { YouTubeChannelView } from './components/YouTubeChannelView';
import { FuturisticVisualHeroImage } from './components/FuturisticVisualHeroImage';

import {
  developerProfile,
  portfolioProjects,
  featuredArchitectureStack,
  developerBadges,
  academicCollaborators,
  publishedPapersList,
} from './data/portfolioData';
import { githubProjectReleases } from './data/githubCrateData';
import { ProjectSleeveRelease } from './types/crate';
import {
  ProjectWork,
  FeaturedStackItem,
  VisualTile,
  AchievementBadge,
  ResearchCollaborator,
} from './types/portfolio';
import { Play, Sparkles, FileText, Video, Disc } from 'lucide-react';

export default function App() {
  const [profile, setProfile] = useState(developerProfile);
  const [projects, setProjects] = useState<ProjectWork[]>(portfolioProjects);
  const [featuredStacks, setFeaturedStacks] = useState<FeaturedStackItem[]>(featuredArchitectureStack);
  const [badges, setBadges] = useState<AchievementBadge[]>(developerBadges);
  const [collaborators, setCollaborators] = useState<ResearchCollaborator[]>(academicCollaborators);

  // Active top navigation tab ('works' | 'crate' | 'video' | 'publications' | 'philosophy' | 'stack')
  const [activeNav, setActiveNav] = useState('works');

  // Modals state
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [selectedStack, setSelectedStack] = useState<FeaturedStackItem | null>(null);
  const [isStatsModalOpen, setIsStatsModalOpen] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<AchievementBadge | null>(null);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [isCvModalOpen, setIsCvModalOpen] = useState(false);
  const [activeGatefoldRelease, setActiveGatefoldRelease] = useState<ProjectSleeveRelease | null>(null);

  // Visual Lightbox state
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    tiles: VisualTile[];
    currentIndex: number;
    projectTitle: string;
  }>({
    isOpen: false,
    tiles: [],
    currentIndex: 0,
    projectTitle: '',
  });

  // Toast feedback
  const [shareCopied, setShareCopied] = useState(false);

  // Handlers
  const handleOpenVisualLightbox = (tiles: VisualTile[], index: number, projectTitle: string) => {
    setLightboxState({
      isOpen: true,
      tiles,
      currentIndex: index,
      projectTitle,
    });
  };

  const handleToggleStar = (projectId: string) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === projectId) {
          const nowStarred = !proj.userStarred;
          return {
            ...proj,
            userStarred: nowStarred,
            starsCount: nowStarred ? proj.starsCount + 1 : proj.starsCount - 1,
          };
        }
        return proj;
      })
    );
  };

  const handleAddComment = (projectId: string, commentText: string) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === projectId) {
          const newComment = {
            id: `cm_${Date.now()}`,
            author: profile.name,
            avatarInitials: 'PT',
            timeAgo: 'Just now',
            text: commentText,
          };
          return {
            ...proj,
            commentsCount: proj.commentsCount + 1,
            comments: [newComment, ...proj.comments],
          };
        }
        return proj;
      })
    );
  };

  const handleToggleConnectCollaborator = (collabId: string) => {
    setCollaborators((prev) =>
      prev.map((c) => {
        if (c.id === collabId) {
          return { ...c, connected: !c.connected };
        }
        return c;
      })
    );
  };

  const handleSharePortfolio = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setShareCopied(true);
      setTimeout(() => setShareCopied(false), 2500);
    }
  };

  const handleLogNewProject = (
    newProjectData: Omit<ProjectWork, 'id' | 'starsCount' | 'userStarred' | 'commentsCount' | 'comments'>
  ) => {
    const newEntry: ProjectWork = {
      ...newProjectData,
      id: `proj_${Date.now()}`,
      starsCount: 1,
      userStarred: true,
      commentsCount: 0,
      comments: [],
    };

    setProjects((prev) => [newEntry, ...prev]);

    setProfile((prev) => ({
      ...prev,
      totalCommits: prev.totalCommits + 12,
      activeStreakWeeks: prev.activeStreakWeeks + 1,
    }));
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E2922] flex flex-col font-sans">
      {/* Top Bar Header */}
      <Header
        activeNav={activeNav}
        onSelectNav={(nav) => setActiveNav(nav)}
        onOpenLogModal={() => setIsLogModalOpen(true)}
        unreadNotificationsCount={2}
        onOpenNotifications={() => setIsNotificationsOpen(true)}
        onOpenContactModal={() => setIsContactModalOpen(true)}
        onOpenCvModal={() => setIsCvModalOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* If Active Tab is 'video' */}
        {activeNav === 'video' && (
          <div className="space-y-6 animate-fade-in">
            <div className="bg-white rounded-xl border border-[#E8E2D5] p-5 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <span className="text-xs font-mono font-medium tracking-wide uppercase text-[#1B4332] bg-[#E8EFEA] px-2.5 py-0.5 rounded-full inline-block mb-1">
                    Live Edge Camera &amp; AIoT Simulator
                  </span>
                  <h2 className="text-xl sm:text-2xl font-serif font-bold text-[#14261C]">
                    Sentinel &amp; YOLOv8n Multi-Modal Edge Stream
                  </h2>
                  <p className="text-xs text-[#526357] mt-0.5">
                    Demonstrating real-time 15–18 FPS NCNN INT8 inference, 48D kinematic pose tracking, and automated Slack webhook alert dispatch.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded bg-[#EDF5EE] border border-[#C8DEC9] text-[#2D5A27] text-xs font-mono font-medium flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#22C55E] animate-pulse" />
                    <span>672-hr Continuous Deployment</span>
                  </span>
                </div>
              </div>

              {/* Video Player Component */}
              <EdgeVideoPlayer />

              {/* Research Notes below video */}
              <div className="mt-5 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EDE7DC]">
                  <span className="font-mono text-[#1B4332] font-semibold text-[11px] block">
                    J-NaNA Vol 5 (21 Pages)
                  </span>
                  <h4 className="font-serif font-bold text-[#14261C] mt-1">
                    Sentinel HSMM Forecasting
                  </h4>
                  <p className="text-[#55695C] mt-1 text-[11px] leading-relaxed">
                    Duration-aware Hidden Semi-Markov Model eliminates 86.6% temporal jitter caused by rapid primate movement and occlusions.
                  </p>
                </div>

                <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EDE7DC]">
                  <span className="font-mono text-[#1B4332] font-semibold text-[11px] block">
                    IEEE ICTP 2026 (DOI: 10.1109/ICTP67998.2026.11485402)
                  </span>
                  <h4 className="font-serif font-bold text-[#14261C] mt-1">
                    Raspberry Pi 5 Slack Pipeline
                  </h4>
                  <p className="text-[#55695C] mt-1 text-[11px] leading-relaxed">
                    Sub-second webhook alerts dispatching photo verification directly to farmers' mobile devices upon crop perimeter breach.
                  </p>
                </div>

                <div className="p-3.5 bg-[#FAF8F5] rounded-xl border border-[#EDE7DC]">
                  <span className="font-mono text-[#1B4332] font-semibold text-[11px] block">
                    MBUST Department of Data Science
                  </span>
                  <h4 className="font-serif font-bold text-[#14261C] mt-1">
                    28 Agricultural Field Trials
                  </h4>
                  <p className="text-[#55695C] mt-1 text-[11px] leading-relaxed">
                    Field-verified across Chitlang and Makwanpur farms with 4,000+ real-world annotated image corpus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* If Active Tab is 'crate' (3D Project Crate Carousel) */}
        {activeNav === 'crate' && (
          <div className="space-y-6 animate-fade-in">
            <ProjectCrateCarousel
              releases={githubProjectReleases}
              onOpenGatefold={(rel) => setActiveGatefoldRelease(rel)}
            />
          </div>
        )}

        {/* If Active Tab is 'stack' */}
        {activeNav === 'stack' && (
          <ArchitectureStackView
            stacks={featuredStacks}
            onSelectStack={(s) => setSelectedStack(s)}
            onOpenGatefold={(rel) => setActiveGatefoldRelease(rel)}
            onNavigateToCrate={() => setActiveNav('crate')}
          />
        )}

        {/* If Active Tab is 'philosophy' */}
        {activeNav === 'philosophy' && <PhilosophyView />}

        {/* If Active Tab is 'publications' */}
        {activeNav === 'publications' && <PublicationsView />}

        {/* If Active Tab is 'youtube' */}
        {activeNav === 'youtube' && <YouTubeChannelView />}

        {/* Default 'works' Tab: The 3-Column Dashboard Layout */}
        {activeNav === 'works' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Left Column: Developer Profile Sidebar (col-span-3) */}
            <div className="lg:col-span-3 lg:sticky lg:top-20">
              <DeveloperSidebar
                profile={profile}
                featuredStacks={featuredStacks}
                onSelectStack={(stack) => setSelectedStack(stack)}
                onOpenStatsModal={() => setIsStatsModalOpen(true)}
                onSharePortfolio={handleSharePortfolio}
                shareCopied={shareCopied}
                selectedStackId={selectedStack?.id}
                onOpenContactModal={() => setIsContactModalOpen(true)}
                onOpenCvModal={() => setIsCvModalOpen(true)}
                onOpenVideoModal={() => setActiveNav('video')}
                onNavigateToCrate={() => setActiveNav('crate')}
                onNavigateToYoutube={() => setActiveNav('youtube')}
              />
            </div>

            {/* Center Column: Contributions & Research Feed (col-span-6) */}
            <div className="lg:col-span-6 space-y-5">
              {/* Research & Shipping Streak Banner */}
              <StreakBanner
                currentStreakWeeks={profile.activeStreakWeeks}
                onLogClick={() => setIsLogModalOpen(true)}
              />

              {/* Animated & Responsive Futuristic Cybernetic Architecture Image Viewport */}
              <FuturisticVisualHeroImage
                onExploreTech={() => setActiveNav('stack')}
                onLaunchStream={() => setActiveNav('video')}
              />

              {/* Embedded Live Video Simulator Launch Banner */}
              <div className="bg-[#14291E] rounded-xl border border-[#2D5A27] p-4 text-[#FAF8F5] flex items-center justify-between gap-3 shadow-xs">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#22C55E]/20 text-[#86EFAC] border border-[#22C55E]/30 flex items-center justify-center shrink-0">
                    <Video className="w-5 h-5 text-[#4ADE80]" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white">
                        Live AIoT Edge Video Stream
                      </span>
                      <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                    </div>
                    <p className="text-[11px] text-[#A7F3D0] mt-0.5">
                      Watch real-time YOLOv8n NCNN INT8 (15–18 FPS) &amp; 48D pose kinematics simulation.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setActiveNav('video')}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-[#22C55E] hover:bg-[#16A34A] text-[#0A1610] transition-colors whitespace-nowrap shadow-xs flex items-center gap-1.5 shrink-0"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Launch Stream</span>
                </button>
              </div>

              {/* Works Feed with Filter Chips and Project Cards */}
              <WorksFeed
                projects={projects}
                onOpenVisualLightbox={handleOpenVisualLightbox}
                onToggleStar={handleToggleStar}
                onAddComment={handleAddComment}
                onBookmarkProject={(proj) => {
                  if (!featuredStacks.some((s) => s.name === proj.title)) {
                    setFeaturedStacks((prev) => [
                      {
                        id: `fs_${Date.now()}`,
                        name: proj.title,
                        domain: proj.category,
                        latencyOrMetric: proj.metrics[0]?.value || 'Verified',
                        status: 'Active Field',
                        stackList: proj.technologies.slice(0, 4),
                        description: proj.summary,
                        lastUpdated: '2026',
                      },
                      ...prev,
                    ]);
                  }
                }}
                onOpenLogModal={() => setIsLogModalOpen(true)}
              />
            </div>

            {/* Right Column: Research Stat-Card Rail (col-span-3) */}
            <div className="lg:col-span-3 lg:sticky lg:top-20">
              <DeveloperStatRail
                totalCommits={profile.totalCommits}
                publicationsCount={profile.publicationsCount}
                fieldTrialsCount={profile.fieldTrialsCount}
                modelAccuracyScore={profile.modelAccuracyScore}
                badges={badges}
                collaborators={collaborators}
                onToggleConnectCollaborator={handleToggleConnectCollaborator}
                onOpenBadgeDetails={(badge) => setSelectedBadge(badge)}
              />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-[#E8E2D5] bg-[#FAF8F5] py-6 px-4 text-center text-xs text-[#63756A]">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <span className="font-serif font-bold text-[#1B4332]">Progress Jung Thapa</span>
            <span aria-hidden="true" className="text-[#C5D1C9]">·</span>
            <span>MBUST MAS Data Science (024/MDS/05)</span>
            <span aria-hidden="true" className="text-[#C5D1C9]">·</span>
            <a
              href="https://progressthapa.com.np"
              target="_blank"
              rel="noreferrer"
              className="text-[#1B4332] hover:underline"
            >
              progressthapa.com.np
            </a>
            <span aria-hidden="true" className="text-[#C5D1C9]">·</span>
            <a
              href="https://www.youtube.com/@pjt247"
              target="_blank"
              rel="noreferrer"
              className="text-[#DC2626] font-semibold hover:underline"
            >
              YouTube @pjt247
            </a>
          </div>
          <div className="flex items-center gap-4 text-[11px] flex-wrap justify-center">
            <span>IEEE DOI: 10.1109/ICTP67998.2026.11485402</span>
            <span>J-NaNA Vol 5 (21p)</span>
            <span>Suwa University of Science (Doctoral Course)</span>
          </div>
        </div>
      </footer>

      {/* Official Curriculum Vitae Modal */}
      <CurriculumVitaeModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
        profile={profile}
        papers={publishedPapersList}
      />

      {/* Lightbox Modal for System & Architecture Diagrams */}
      <VisualLightboxModal
        isOpen={lightboxState.isOpen}
        onClose={() => setLightboxState((prev) => ({ ...prev, isOpen: false }))}
        tiles={lightboxState.tiles}
        currentIndex={lightboxState.currentIndex}
        onSelectIndex={(index) =>
          setLightboxState((prev) => ({ ...prev, currentIndex: index }))
        }
        projectTitle={lightboxState.projectTitle}
      />

      {/* Log Project Modal */}
      <LogProjectModal
        isOpen={isLogModalOpen}
        onClose={() => setIsLogModalOpen(false)}
        onSubmitProject={handleLogNewProject}
      />

      {/* Architecture Stack Details Modal */}
      <StackDetailModal
        stack={selectedStack}
        onClose={() => setSelectedStack(null)}
        onOpenContactModal={() => setIsContactModalOpen(true)}
      />

      {/* Achievement / Badge Details Modal */}
      <AchievementDetailModal
        badge={selectedBadge}
        onClose={() => setSelectedBadge(null)}
      />

      {/* Research Stats & Field Trials Modal */}
      <ResearchStatsModal
        isOpen={isStatsModalOpen}
        onClose={() => setIsStatsModalOpen(false)}
      />

      {/* Direct Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        email={profile.emailUniversity}
      />

      {/* Notifications Drawer */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />

      {/* Cinematic 3D Gatefold Scroll World inside each project */}
      {activeGatefoldRelease && (
        <GatefoldScrollWorld
          isOpen={Boolean(activeGatefoldRelease)}
          release={activeGatefoldRelease}
          onClose={() => setActiveGatefoldRelease(null)}
          allReleases={githubProjectReleases}
          onSelectRelease={(rel) => setActiveGatefoldRelease(rel)}
        />
      )}
    </div>
  );
}
