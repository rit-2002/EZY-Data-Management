"use client";
import { useState, useEffect, useCallback } from "react";
import { useTheme } from "../context/ThemeContext";
import {
  AiOutlineExclamationCircle,
  AiOutlineCheckCircle,
  AiOutlineAppstoreAdd,
  AiOutlineTeam,
  AiOutlineUsergroupAdd,
  AiFillHome
} from "react-icons/ai";
import { IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/navigation";
import ResponsiveContainer from "../components/ResponsiveContainer";
import Modal from "../components/Modal";
import { FaHubspot, FaSalesforce } from "react-icons/fa";
import {
  SiMailchimp,
  SiQuickbooks,
  SiGooglesheets,
  SiGoogleanalytics,
} from "react-icons/si";
import { Carousel } from "./Carousel";
import { toast } from "react-toastify";
import {
  connectGoogleAnalytics,
  connectGoogleWorkbook,
  connectHubspot,
  connectMailchimp,
  connectSalesforce,
  fetchActiveUsersData,
  fetchGoogleAnlaytics,
  fetchGoogleWorkbook,
  fetchHubspot,
  fetchLastDisconnectedData,
  fetchMailChimp,
  fetchSalesForce,
  fetchTotalUsersData,
} from "../api/dataIntegrationAPI.js";
import { IntegrationSection } from "./IntegrationSection";

const DataIntegration = () => {
  const { isDarkMode } = useTheme();
  const router = useRouter();

  // static data
  const [productionData] = useState({ value: 8, percentage: 25 });
  const [dataSourceData] = useState({ value: 20, percentage: 75 });

  // table data
  const [activeTableHubspot, setActiveTableHubspot] = useState("table1");
  const [activeTableMailchimp, setActiveTableMailchimp] = useState("table1");
  const [activeTableSalesforce, setActiveTableSalesforce] = useState("table1");
  const [activeTableGoogleAnalytics, setActiveTableGoogleAnalytics] = useState("table1");
  const [activeTableGoogleWorkbook, setActiveTableGoogleWorkbook] = useState("table1");

  // search terms for tables
  const [searchTermForHubspot, setSearchTermForHubspot] = useState("");
  const [searchTermForMailChimp, setSearchTermForMailChimp] = useState("");
  const [searchTermForsalesforce, setSearchTermForsalesforce] = useState("");
  const [searchTermForGoogleAnlaytics, setSearchTermForGoogleAnlaytics] = useState("");
  const [searchTermForGoogleWorkbook, setSearchTermForGoogleWorkbook] = useState("");

  // table data
  const [mailchimpData, setMailChimpData] = useState([]);
  const [salesforceData, setSalesforceData] = useState([]);
  const [googleAnalyticsData, setGoogleAnalyticsData] = useState([]);
  const [googleWorkbookData, setGoogleWorkbookData] = useState([]);
  const [hubspotData, setHubspotData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);

  // integration connection auth data
  const [integrationName, setIntegrationName] = useState("");
  const [accessUrl, setAccessUrl] = useState("");
  const [token, setToken] = useState("");
  const [refreshToken, setRefreshToken] = useState("");

  // statistics data
  const activeIntegrations = {
    hubspot: 0,
    mailchimp: 0,
    salesforce: 0,
    googleAnalytics: 0,
    googleWorkbook: 0,
  };
  const [lastDisconnected, setLastDisconnected] = useState({
    date: "",
    time: "",
    ago: "",
  });
  const [lastConnected, setLastConnected] = useState({
    date: "",
    time: "",
    ago: "",
  });
  const [totalUsers, setTotalUsers] = useState({
    value: "",
    percentage: 0,
  });
  const [activeUsers, setActiveUsers] = useState({
    value: "",
    percentage: 0,
  });
  const [totalUsersPieData, setTotalUsersPieData] = useState(null);
  const [activeUsersPieData, setActiveUsersPieData] = useState(null);

  // static data
  const [lastIncident] = useState({
    date: "Jun 10, 2024",
    time: "9:41 AM",
    ago: "34 min ago",
  });

  const [lastChecked] = useState({
    date: "Jun 10, 2024",
    time: "9:41 AM",
    ago: "34 min ago",
  });

  const integrationOptions = [
    {
      Icon: FaHubspot,
      name: "HubSpot",
      color: "#FF7A59",
      onclick: () =>
        handleRedirect(
          "https://ezy-api-service-dev-498807929429.us-central1.run.app/api/v1/integrations/authorize"
        ),
    },
    {
      Icon: FaSalesforce,
      name: "Salesforce",
      color: "#00A1E0",
      onclick: () =>
        handleRedirect(
          "https://ezy-api-service-dev-498807929429.us-central1.run.app/api/v1/salesforce/authorize"
        ),
    },
    {
      Icon: SiQuickbooks,
      name: "QuickBooks",
      color: "#2CA01C",
      onclick: () =>
        handleRedirect(
          "https://ezy-api-service-dev-498807929429.us-central1.run.app/api/v1/quickbooks/connect"
        ),
    },
    {
      Icon: SiGoogleanalytics,
      name: "Google Analytics",
      color: "#F9AB00",
      onclick: () =>
        handleRedirect(
          "https://ezy-api-service-dev-498807929429.us-central1.run.app/api/v1/analytics/authorize"
        ),
    },
    {
      Icon: SiGooglesheets,
      name: "Google Sheets",
      color: "#0F9D58",
      onclick: () =>
        handleRedirect(
          "https://ezy-api-service-dev-498807929429.us-central1.run.app/api/v1/google_workbook/authorize"
        ),
    },
    {
      Icon: SiMailchimp,
      name: "Mailchimp",
      color: "#FFE01B",
      onclick: () =>
        handleRedirect(
          "https://ezy-api-service-dev-498807929429.us-central1.run.app/api/v1/mailchimp/authorize"
        ),
    },
  ];

  const cardData = [
    {
      id: 1,
      title: "Production",
      type: "progress" as const,
      value: productionData.value,
      percentage: productionData.percentage,
      color: "#f87171",
    },
    {
      id: 2,
      title: "Data Source",
      type: "progress" as const,
      value: dataSourceData.value,
      percentage: dataSourceData.percentage,
      color: "#60a5fa",
    },
    {
      id: 3,
      title: "Last Incident",
      type: "incident" as const,
      icon: AiOutlineExclamationCircle,
      iconColor: "text-red-500",
      date: lastIncident.date,
      time: lastIncident.time,
      ago: lastIncident.ago,
    },
    {
      id: 4,
      title: "Last Checked",
      type: "incident" as const,
      icon: AiOutlineCheckCircle,
      iconColor: "text-green-500",
      date: lastChecked.date,
      time: lastChecked.time,
      ago: lastChecked.ago,
    },
    {
      id: 5,
      title: "Active Users",
      type: "progress" as const,
      value: "2,547",
      percentage: 85,
      color: "#4ade80",
      icon: AiOutlineTeam,
      iconColor: "text-blue-500",
    },
    {
      id: 6,
      title: "Total Users",
      type: "progress" as const,
      value: "3,942",
      percentage: 92,
      color: "#c084fc",
      icon: AiOutlineUsergroupAdd,
      iconColor: "text-purple-500",
    },
  ];

  // statistics fetch apis
  const fetchLastDisconnected = useCallback(async () => {
    try {
      const data = await fetchLastDisconnectedData();
      setLastDisconnected({
        date: new Date(data.last_disconnected_date).toLocaleDateString(),
        time: new Date(data.last_disconnected_date).toLocaleTimeString(),
        ago: new Date(data.last_disconnected_date).toLocaleString(),
      });

    } catch (error) {
      toast.error("Error in fetching last disconnected data");
    }
  }, [setLastDisconnected]);

  const fetchLastConnected = useCallback(async () => {
    try {
      const data = await fetchLastDisconnectedData();
      setLastConnected({
        date: new Date(data.last_connected_date).toLocaleDateString(),
        time: new Date(data.last_connected_date).toLocaleTimeString(),
        ago: new Date(data.last_connected_date).toLocaleString(),
      });
    } catch (error) {
      toast.error("Error in fetching last connected data");
    }
  }, [setLastConnected]);

  const fetchTotalUsers = useCallback(async () => {
    try {
      const data = await fetchTotalUsersData();
      setTotalUsers({
        value: data.total_accounts,
        percentage: data.percentage,
      });
      setTotalUsersPieData({
        labels: ["HubSpot", "Mailchimp", "Salesforce", "Google Analytics", "Google Workbook"],
        datasets: [
          {
            data: [
              data.integration_counts.HubSpot,
              data.integration_counts.Mailchimp,
              data.integration_counts.Salesforce,
              data.integration_counts.Analytics,
              data.integration_counts.Workbook,
            ],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
          },
        ],
      });
    } catch (error) {
      toast.error("Error in fetching total users data");
    }
  }, [setTotalUsers, setTotalUsersPieData]);

  const fetchActiveUsers = useCallback(async () => {
    try {
      const data = await fetchActiveUsersData();
      setActiveUsers({
        value: data.total_active_accounts,
        percentage: data.percentage,
      });
      setActiveUsersPieData({
        labels: ["HubSpot", "Mailchimp", "Salesforce", "Google Analytics", "Google Workbook"],
        datasets: [
          {
            data: [
              data.active_integrations.hubspot_integration_credentials,
              data.active_integrations.mailchimp_integration_credentials,
              data.active_integrations.salesforce_integration_credentials,
              data.active_integrations.analytics_integration_credentials,
              data.active_integrations.workbook_integration_credentials,
            ],
            backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
            hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"],
          },
        ],
      });
    } catch (error) {
      toast.error("Error in fetching active users data");
    }
  }, [setActiveUsers, setActiveUsersPieData]);

  // data fetch apis
  const fetchHubspotData = useCallback(async () => {
    try {
      const accountData = await fetchHubspot()
      setHubspotData(accountData);
    } catch (error) {
      toast.error("Error in fetching hubspot data");
    }
  }, [setHubspotData])

  const fetchMailChimpData = useCallback(async () => {
    try {
      const accountData = await fetchMailChimp()
      setMailChimpData(accountData);
    } catch (error) {
      toast.error("Error in fetching mailchimp data");
    }
  }, [setMailChimpData])

  const fetchSalesForceData = useCallback(async () => {
    try {
      const accountData = await fetchSalesForce()
      setSalesforceData(accountData);
    } catch (error) {
      toast.error("Error in fetching salesforce data");
    }
  }, [setSalesforceData])

  const fetchGoogleAnlayticsData = useCallback(async () => {
    try {
      const accountData = await fetchGoogleAnlaytics()
      setGoogleAnalyticsData(accountData);
    } catch (error) {
      toast.error("Error in fetching google analytics data");
    }
  }, [setGoogleAnalyticsData])

  const fetchGoogleWorkbookDataData = useCallback(async () => {
    try {
      const accountData = await fetchGoogleWorkbook()
      setGoogleWorkbookData(accountData);
    } catch (error) {
      toast.error("Error in fetching google workbook data");
    }
  }, [setGoogleWorkbookData])

  const filteredAccountsData = (name: string) => {
    let searchTerm = "";
    let data = [];

    switch (name) {
      case "Hubspot":
        searchTerm = searchTermForHubspot;
        data = hubspotData;
        break;

      case "Mailchimp":
        searchTerm = searchTermForMailChimp;
        data = mailchimpData;
        break;

      case "Salesforce":
        searchTerm = searchTermForsalesforce;
        data = salesforceData;
        break;

      case "Google Analytics":
        searchTerm = searchTermForGoogleAnlaytics;
        data = googleAnalyticsData;
        break;

      case "Google Workbook":
        searchTerm = searchTermForGoogleWorkbook;
        data = googleWorkbookData;
        break;

      default:
        return [];
    }

    if (searchTerm !== "") {
      return data.filter((account) =>
        account.email[0]
          .toLowerCase()
          .includes(searchTerm.trim().toLowerCase())
      );
    }

    return data;
  };

  // fetch all integration data and stats data concurrently
  useEffect(() => {
    const fetchDataConcurrently = async () => {
      await Promise.all([
        fetchHubspotData(),
        fetchMailChimpData(),
        fetchSalesForce(),
        fetchGoogleAnlayticsData(),
        fetchGoogleWorkbookDataData(),
        fetchLastDisconnected(),
        fetchLastConnected(),
        fetchTotalUsers(),
        fetchActiveUsers(),
      ]);
    };

    fetchDataConcurrently();
  }, []);

  // fetching token and integration from url params
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setIntegrationName(params.get("integration"));
    setToken(params.get("access_token"));
    setAccessUrl(params.get("instance_url"));
    setRefreshToken(params.get("refresh_token"));
  }, []);

  // connecting to selected integration
  useEffect(() => {
    if (token && integrationName) {
      const fetchIntegrations = async () => {
        switch (integrationName) {
          case "hubspot":
            await connectHubspot(token, refreshToken);
            fetchHubspotData();
            break;
          case "Google_Workbook":
            await connectGoogleWorkbook(token, refreshToken);
            fetchGoogleWorkbookDataData();
            break;
          case "google_analytics":
            await connectGoogleAnalytics(token, refreshToken);
            fetchGoogleAnlayticsData();
            break;
          case "mailchimp":
            await connectMailchimp(token);
            fetchMailChimpData();
            break;
          case "salesforce":
            await connectSalesforce(token, accessUrl, refreshToken);
            fetchSalesForceData();
            break;
          default:
            return;
        }
      };

      fetchIntegrations();
    }
  }, [token, integrationName, refreshToken, accessUrl]);

  const integrations = [
    {
      label: "Hubspot",
      data: hubspotData,
      activeTable: activeTableHubspot,
      setActiveTable: setActiveTableHubspot,
      searchTerm: searchTermForHubspot,
      setSearchTerm: setSearchTermForHubspot,
      fetchUserData: fetchHubspotData,
    },
    {
      label: "Mailchimp",
      data: mailchimpData,
      activeTable: activeTableMailchimp,
      setActiveTable: setActiveTableMailchimp,
      searchTerm: searchTermForMailChimp,
      setSearchTerm: setSearchTermForMailChimp,
      fetchUserData: fetchMailChimpData,
    },
    {
      label: "Salesforce",
      data: salesforceData,
      activeTable: activeTableSalesforce,
      setActiveTable: setActiveTableSalesforce,
      searchTerm: searchTermForsalesforce,
      setSearchTerm: setSearchTermForsalesforce,
      fetchUserData: fetchSalesForceData,
    },
    {
      label: "Google Analytics",
      data: googleAnalyticsData,
      activeTable: activeTableGoogleAnalytics,
      setActiveTable: setActiveTableGoogleAnalytics,
      searchTerm: searchTermForGoogleAnlaytics,
      setSearchTerm: setSearchTermForGoogleAnlaytics,
      fetchUserData: fetchGoogleAnlayticsData,
    },
    {
      label: "Google Workbook",
      data: googleWorkbookData,
      activeTable: activeTableGoogleWorkbook,
      setActiveTable: setActiveTableGoogleWorkbook,
      searchTerm: searchTermForGoogleWorkbook,
      setSearchTerm: setSearchTermForGoogleWorkbook,
      fetchUserData: fetchGoogleWorkbookDataData,
    },
  ];

  const handleRedirect = async (url: string) => router.push(url);

  return (
    <ResponsiveContainer>
      <div
        className={`max-w-full min-h-screen ${isDarkMode ? "text-white" : "text-black"
          } overflow-hidden`}
      >
        <div className="w-full md:max-w-[800px] lg:max-w-[1024px] xl:max-w-[1280px] mx-auto p-6 rounded-lg shadow-lg">
          <div className='transition-all duration-300'>

            {/* title and button */}
            <div className="flex justify-between items-center">
              <h3 className="text-lg sm:text-xl md:text-2xl font-semibold">
                Data Integration
              </h3>

              <button
                onClick={() => setModalOpen(true)}
                className="bg-[#1C6BA0] hover:bg-[#2b9ae4] text-white rounded-lg shadow-md transition-all duration-300 flex items-center space-x-2 px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3"
              >
                <AiOutlineAppstoreAdd className="text-sm sm:text-base md:text-lg" />
                <span className="hidden sm:inline text-sm sm:text-base md:text-lg">
                  Add Integration{" "}
                </span>
              </button>
            </div>

            {/* breadcrumbs static */}
            <nav className="hidden sm:flex mb-4" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse select-none">
                <li className="inline-flex items-center">
                  <span
                    className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white hover:cursor-pointer"
                    onClick={() => router.push("/dashboardMain")}
                  >
                    <AiFillHome />
                    <span className="ml-3">Home</span>
                  </span>
                </li>
                <li>
                  <div className="flex items-center">
                    <IoIosArrowForward />
                    <span className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white hover:cursor-pointer">
                      Data Integration
                    </span>
                  </div>
                </li>
              </ol>
            </nav>

            {/* cards static */}
            <div className="w-full h-px bg-gray-200 dark:bg-gray-600 mb-2"></div>
            <div className="mb-4 sm:mb-6">
              <div className="p-3 sm:p-4 md:p-6">
                <Carousel 
                  cardData={cardData} 
                  totalUsersPieData={totalUsersPieData} 
                  activeUsersPieData={activeUsersPieData} 
                />
              </div>
            </div>

            {/* integration modal */}
            {modalOpen && (
              <Modal
                title="Select Integrations"
                onClose={() => setModalOpen(false)}
                isOpen={modalOpen}
              >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 p-4">
                  {integrationOptions.map((option, index) => (
                    <div
                      key={index}
                      className="flex flex-col items-center justify-center p-6 bg-white dark:bg-gray-700 rounded-lg 
           shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 hover:scale-105"
                      onClick={option.onclick}
                    >
                      <option.Icon
                        className="text-7xl mb-4"
                        style={{ color: option.color }}
                      />
                      <span className="text-gray-700 dark:text-gray-200 font-medium text-lg">
                        {option.name}
                      </span>
                    </div>
                  ))}
                </div>
              </Modal>
            )}

            {/* integration tables*/}
            {integrations.map((integration) => (
              <IntegrationSection
                key={integration.label}
                integrationLabel={integration.label}
                data={integration.data}
                activeTable={integration.activeTable}
                setActiveTable={integration.setActiveTable}
                searchTerm={integration.searchTerm}
                setSearchTerm={integration.setSearchTerm}
                fetchUserData={integration.fetchUserData}
                filteredAccountsData={filteredAccountsData}
              />
            ))}
          </div>
        </div>
      </div>
    </ResponsiveContainer>
  );
};

export default DataIntegration;