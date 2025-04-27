import { axiosAPI } from "./axiosInstance";

export const sendContactForm = async (formBody) => {
  try {
    const response = await axiosAPI.post(
      "https://ezy-api-service-dev-498807929429.us-central1.run.app/api/v1/help-support/contact-form",
      formBody
    );
    return response.status;
  } catch (error) {
    return error.response?.status || "Network error";
  }
};
