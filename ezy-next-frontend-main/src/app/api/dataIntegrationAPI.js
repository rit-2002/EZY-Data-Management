import { axiosAPI } from "./axiosInstance";

// All integrations data fetch
export const fetchHubspot = async () => {
  const accountData = await axiosAPI.get('/api/v1/integrations/hubspot_credentials');
  return accountData.data.accounts_data
};

export const fetchMailChimp = async () => {
  const mailChimpData = await axiosAPI.get('/api/v1/mailchimp/mailchimp/credentials');
  return mailChimpData.data.accounts_data
};

export const fetchSalesForce = async () => {
  const salesforceData = await axiosAPI.get('/api/v1/salesforce/salesforce_credentials');
  return salesforceData.data.accounts_data
};

export const fetchGoogleAnlaytics = async () => {
  const googleAnalyticsData = await axiosAPI.get('/api/v1/analytics/google-analytics/credentials');
  return googleAnalyticsData.data.accounts_data
};

export const fetchGoogleWorkbook = async () => {
  const googleWorkbookData = await axiosAPI.get('/api/v1/google_workbook/google_workbook/credentials');
  return googleWorkbookData.data.accounts_data
};


// All integrations connections
export const connectHubspot = async (token, refreshToken) => {
  const response = await axiosAPI.post(
    `/api/v1/integrations/hubspot/connect?hubspot_token=${token}&hubspot_refresh_token=${refreshToken}`
  );
  return response.data;
};

export const connectGoogleWorkbook = async (token, refreshToken) => {
  const response = await axiosAPI.post(
    `/api/v1/google_workbook/google_workbook/connect?google_token=${token}&refresh_token=${refreshToken}`
  );
  return response.data;
};

export const connectGoogleAnalytics = async (token, refreshToken) => {
  const response = await axiosAPI.post(
    `/api/v1/analytics/google-analytics/connect?GoogleA_token=${token}&refresh_token=${refreshToken}`
  );
  return response.data;
};

export const connectMailchimp = async (token) => {
  const response = await axiosAPI.post(
    `/api/v1/mailchimp/mailchimp/connect?mailchimp_token=${token}`
  );
  return response.data;
};

export const connectSalesforce = async (token, accessUrl, refreshToken) => {
  const response = await axiosAPI.post(
    `/api/v1/salesforce/fetch-accounts?salesforce_token=${token}&instance_url=${accessUrl}&salesforce_refresh_token=${refreshToken}`
  );
  return response.data;
};

export const deleteIntegration = async (name, email) => {
  let response;

  switch (name) {
    case "hubspot":
      response = await axiosAPI.delete(
        `/api/v1/integrations/delete_hubspot_integration?email=${email}`
      );
      break;

    case "Mailchimp Integration":
      response = await axiosAPI.delete(
        `/api/v1/mailchimp/mailchimp/credentials?email=${email}`
      );
      break;

    case "salesforce":
      response = await axiosAPI.delete(
        `/api/v1/salesforce/delete_salesforce_records?email=${email}`
      );
      break;

    case "Google Analytics":
      response = await axiosAPI.delete(
        `/api/v1/analytics/google-analytics/delete?email=${email}`
      );
      break;

    case "google_workbook":
      response = await axiosAPI.delete(
        `/api/v1/google_workbook/google_workbook/credentials?email=${email}`
      );
      break;

    default:
      throw new Error("Invalid integration name");
  }

  return response;
};

// integration stats
export const fetchLastDisconnectedData = async () => {
  const response = await axiosAPI.get(
    "/api/v1/integrations_cards_data/last_disconnected"
  );
  return response.data;
};

export const fetchLastConnectedData = async () => {
  const response = await axiosAPI.get(
    "/api/v1/integrations_cards_data/last_connected"
  );
  return response.data;
};

export const fetchTotalUsersData = async () => {
  const response = await axiosAPI.get(
    "/api/v1/integrations_cards_data/total_Accounts"
  );
  return {
    total_accounts: response.data.total_accounts,
    percentage: response.data.percentage,
    integration_counts: response.data.integration_counts
  }
};

export const fetchActiveUsersData = async () => {
  const response = await axiosAPI.get(
    "/api/v1/integrations_cards_data/active_accounts"
  );
  return {
    total_active_accounts: response.data.total_active_accounts,
    active_integrations: response.data.active_integrations
  };
};