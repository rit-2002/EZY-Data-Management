"use client";
import { useTheme } from "../context/ThemeContext";
import { useActiveTab } from "../context/ActiveTabContext";
import AccountSection from "./components/accountSetting/Account";
import ThemeSettings from "./components/themeSetting/ThemeSetting";
import IntegrationSetting from "./components/integrationSetting/IntegrationSetting";
import ProfileSetting from "./components/profileSetting/ProfileSetting";
import NotificationSetting from "./components/notificationSetting/Notification";
import Button from "../components/ThemeComponent/Button";
import ProtectedRoute from "../components/ProtectedRoute";
import ResponsiveContainer from "../components/ResponsiveContainer";

const Setting = () => {
  const { isDarkMode } = useTheme();
  const { activeTab, setActiveTab } = useActiveTab();


  const tabs = ["profile", "account", "integration-setting", "notification", "theme-setting"];

  const groupedTabs = [];
  if (tabs.length % 2 === 1) {
    groupedTabs.push([tabs[0]])
    for (let i = 1; i < tabs.length; i += 2) {
      groupedTabs.push(tabs.slice(i, i + 2));
    }
  }
  else {
    for (let i = 0; i < tabs.length; i += 2) {
      groupedTabs.push(tabs.slice(i, i + 2));
    }
  }

  return (
    <ProtectedRoute>
      <ResponsiveContainer>
        <div
          className={`flex flex-col`}
          style={{
            height: "calc(100vh - 120px)"
          }}
        >
          <div className="flex flex-wrap justify-center p-2 gap-x-2 gap-y-2">
            {groupedTabs.map((pair, index) => (
              <div key={index} className="flex gap-x-2">
                {pair.map((tab) => (
                  <Button key={tab} active={activeTab === tab}>
                    <button
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-lg text-sm font-semibold active:scale-95 active:bg-opacity-90 transition-all duration-300`}
                    >
                      {tab.replace(/-/g, ' ').replace(/\b\w/g, (char: string) => char.toUpperCase())}
                    </button>
                  </Button>
                ))}
              </div>
            ))}
          </div>

          <div className="flex-1 min-h-full flex justify-center items-center p-2 mt-[-10px]">
            {activeTab === "account" ? (
              <AccountSection isDarkMode={isDarkMode} />
            ) : activeTab === "integration-setting" ? (
              <IntegrationSetting />
            ) : activeTab === "profile" ? (
              <ProfileSetting />
            ) : activeTab === "notification" ? (
              <NotificationSetting />
            ) : activeTab === "theme-setting" ? (
              <ThemeSettings />
            ) : (
              <AccountSection isDarkMode={isDarkMode} />
            )}
          </div>
        </div>
      </ResponsiveContainer>
    </ProtectedRoute>
  );
};

export default Setting;

// ${activeTab === tab
//   ? "bg-blue-500 text-gray-100"
//   : "bg-gray-300 text-gray-800"
//   } hover:bg-blue-400