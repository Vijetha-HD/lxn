import { useState } from "react";
import CampaignManagerDashboard from "./CampaignManagerDashboard";
import DashboardSidebar from "../components/DashboardSidebar";
import CandidateDashboard from "./CandidateDashboard";
import DataAnalystDashboard from "./DataAnalystDashboard";
import FieldOrganizerDashboard from "./FieldOrganizerDashboard";
import CommunicationsDirectorDashboard from "./CommunicationsDirectorDashboard";
import VoterAnalyticsPage from "./VoterAnalyticsPage";
import CampaignStrategyPage from "./CampaignStrategyPage";
import SentimentAndMediaPage from "./SentimentAndMediaPage";
import PredictionsPage from "./PredictionsPage";
import ReportsPage from "./ReportsPage";
import DataManagementPage from "./DataManagementPage";
import BudgetTrackerPage from "./BudgetTrackerPage";
import CompetitorAnalysisPage from "./CompetitorAnalysisPage";
import EventManagementPage from "./EventManagementPage";
import AdCampaignsPage from "./AdCampaignsPage";
import PageTitle from "../components/PageTitle";
import VolunteerManagementPage from "./VolunteerManagementPage";
import DashboardHeader from "../components/DashboardHeader";
import DailyBriefing from "./DailyBriefing";
import SpeechesAndTalkingPoints from "./SpeechesAndTalkingPoints";
import ModelPerformance from "./ModelPerformance";
import GOTVDashboard from "./GOTVDashboard";
import PressReleaseManagement from "./PressReleaseManagement";
import SocialMediaPlanner from "./SocialMediaPlanner";

// ✅ roles allowed to use dark mode + ThemeToggle
const rolesWithDarkMode = [
  "Campaign Manager",
  "Candidate",
  "Data Analyst",
  "Field Organizer",
  "Communications Director",
];

const Dashboard = ({ userRole, setPage, user, darkMode, setDarkMode }) => {
  const [activeScreen, setActiveScreen] = useState("Main Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const enableDark = rolesWithDarkMode.includes(userRole);

  const renderActiveScreen = () => {
    if (activeScreen === "Main Dashboard") {
      switch (userRole) {
        case "Campaign Manager":
          return <CampaignManagerDashboard darkMode={darkMode} userRole={userRole} />;
        case "Candidate":
          return <CandidateDashboard darkMode={darkMode} userRole={userRole}/>;
        case "Data Analyst":
          return <DataAnalystDashboard darkMode={darkMode} userRole={userRole}/>;
        case "Field Organizer":
          return <FieldOrganizerDashboard darkMode={darkMode} userRole={userRole}/>;
        case "Communications Director":
          return <CommunicationsDirectorDashboard darkMode={darkMode} userRole={userRole}/>;
        default:
          return <CampaignManagerDashboard />;
      }
    }

    // Other navigable pages
    switch (activeScreen) {
      case "Voter Analytics":
      case "Voter Lists":
        return <VoterAnalyticsPage />;
      case "Campaign Strategy":
        return <CampaignStrategyPage />;
      case "Sentiment Monitoring":
      case "Media Highlights":
      case "Media Monitoring":
      case "Messaging":
        return <SentimentAndMediaPage />;
      case "AI Predictions":
        return <PredictionsPage />;
      case "Reports":
        return <ReportsPage />;
      case "Custom Models":
      case "Data Validation":
      case "Data Pipeline":
      case "Geospatial Analysis":
      case "Voter Journey":
      case "Data Export":
        return <DataManagementPage userRole={userRole} darkMode={darkMode} />;
      case "Canvassing Maps":
        return <FieldOrganizerDashboard />;
      case "Budget Tracker":
        return <BudgetTrackerPage darkMode={darkMode} userRole={userRole} />;
      case "Competitor Analysis":
        return <CompetitorAnalysisPage darkMode={darkMode} userRole={userRole} />;
      case "Event Management":
        return <EventManagementPage darkMode={darkMode} userRole={userRole} />;
      case "Ad Campaign Performance":
        return <AdCampaignsPage darkMode={darkMode} userRole={userRole}/>;
      case "Internal Comms":
        return <PageTitle title="Internal Communications" />;
      case "Daily Briefing":
        return <DailyBriefing userRole={userRole} darkMode={darkMode}/>;
      case "Speeches & Talking Points":
        return <SpeechesAndTalkingPoints userRole={userRole} darkMode={darkMode} />;
      case "Constituency Deep Dive":
        return <PageTitle title="Constituency Deep Dive" />;
      case "Endorsements":
        return <PageTitle title="Endorsements Tracker" />;
      case "Media Appearances":
        return <PageTitle title="Media Appearances" />;
      case "Volunteer Management":
        return <VolunteerManagementPage userRole={userRole} darkMode={darkMode} />;
      case "GOTV Dashboard":
        return <GOTVDashboard userRole={userRole} darkMode={darkMode}/>;
      case "Polling Booths":
        return <PageTitle title="Polling Booth Management" />;
      case "Issue Reporting":
        return <PageTitle title="Issue Reporting" />;
      case "Resource Center":
        return <PageTitle title="Resource Center" />;
      case "Press Releases":
        return <PressReleaseManagement userRole={userRole} darkMode={darkMode} />;
      case "Social Media Planner":
        return <SocialMediaPlanner userRole={userRole} darkMode={darkMode} />;
      case "Crisis Management":
        return <PageTitle title="Crisis Management" />;
      case "Influencer Outreach":
        return <PageTitle title="Influencer Outreach" />;
      case "A/B Test Results":
        return <PageTitle title="A/B Test Results" />;
      case "Model Performance":
        return <ModelPerformance userRole={userRole} darkMode={darkMode} />;
      default:
        return <CampaignManagerDashboard />;
    }
  };

  return (
    <div
      className={`
        min-h-screen flex
        transition-colors duration-300
        ${darkMode && enableDark ? "dark bg-gray-900 text-gray-100" : "bg-white text-gray-900"}
      `}
    >
      {/* Sidebar */}
      <DashboardSidebar
        userRole={userRole}
        darkMode={darkMode}
        activeScreen={activeScreen}
        setActiveScreen={setActiveScreen}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        className="w-64 md:w-72 flex-shrink-0"
      />

      {/* Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          userRole={userRole}
          setPage={setPage}
          user={user}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          showThemeToggle={true} // ✅ always show toggle
        />

        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 sm:p-6 lg:p-8">
          {renderActiveScreen()}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
