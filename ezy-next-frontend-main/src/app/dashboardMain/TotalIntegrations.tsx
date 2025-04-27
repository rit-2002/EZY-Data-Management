import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import Link from "next/link";
import { fetchGoogleAnlaytics, fetchGoogleWorkbook, fetchHubspot, fetchMailChimp, fetchSalesForce } from "../api/dataIntegrationAPI";

const TotalIntegrations = () => {
  const { isDarkMode } = useTheme();

  // currently no api for fetching count of all integration, so just doing it manually for now by fetching all integration and taking their array size
  const [mailchimpData, setMailChimpData] = useState(0);
  const [salesforceData, setSalesforceData] = useState(0);
  const [googleAnalyticsData, setGoogleAnalyticsData] = useState(0);
  const [googleWorkbookData, setGoogleWorkbookData] = useState(0);
  const [hubspotData, setHubspotData] = useState(0);
  const [loading, setLoading] = useState(false);

  // data fetch apis
  const fetchHubspotData = async () => {
    try {
      const accountData = await fetchHubspot()
      setHubspotData(accountData.length);
    } catch (error) {
      toast.error("Error in fetching hubspot data");
    }
  };

  const fetchMailChimpData = async () => {
    try {
      const accountData = await fetchMailChimp()
      setMailChimpData(accountData.length);
    } catch (error) {
      toast.error("Error in fetching mailchimp data");
    }
  };

  const fetchSalesForceData = async () => {
    try {
      const accountData = await fetchSalesForce()
      setSalesforceData(accountData.length);
    } catch (error) {
      toast.error("Error in fetching salesforce data");
    }
  };

  const fetchGoogleAnlayticsData = async () => {
    try {
      const accountData = await fetchGoogleAnlaytics()
      setGoogleAnalyticsData(accountData.length);
    } catch (error) {
      toast.error("Error in fetching google analytics data");
    }
  };

  const fetchGoogleWorkbookDataData = async () => {
    try {
      const accountData = await fetchGoogleWorkbook()
      setGoogleWorkbookData(accountData.length);
    } catch (error) {
      toast.error("Error in fetching google workbook data");
    }
  };

  // fetch all integration data concurrently
  useEffect(() => {
    const fetchDataConcurrently = async () => {
      setLoading(true);
      await Promise.all([
        fetchHubspotData(),
        fetchMailChimpData(),
        fetchSalesForceData(),
        fetchGoogleAnlayticsData(),
        fetchGoogleWorkbookDataData(),
      ]);
      setLoading(false);
    };

    fetchDataConcurrently();
  }, []);

  const pieData = {
    labels: [
      "Hubspot",
      "MailChimp",
      "Salesforce",
      "Google Analytics",
      "Google Workbook",
    ],
    datasets: [
      {
        
        data: [
          hubspotData,
          mailchimpData,
          salesforceData,
          googleAnalyticsData,
          googleWorkbookData,
        ],
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ],
      },
    ],
  };


  return (
    <div
      className={`${isDarkMode ? "bg-gray-950 text-white border-gray-800" : "bg-white"} border border-gray-300 rounded-lg shadow p-5 w-full`}
    >
      <div className="space-y-3">
        <div className="bg-[#166BA0] dark:bg-[#0a1b42] py-3 w-full rounded-2xl">
          <Link href='/DataIntegration'>
            <h1 className="text-white text-center text-xl">Total Integrations</h1>
          </Link>
        </div>

        <div className="flex flex-wrap justify-center items-center gap-4 overflow-hidden">
          <div className="w-full h-96 mx-auto pb-1 flex flex-wrap justify-center items-center">
            {loading ? (
              <p>Loading data...</p>
            ) : (
              <Pie data={pieData} options={{ responsive: true, maintainAspectRatio: false }} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalIntegrations;
