import { memo, useEffect, useState } from "react";
import { FaWifi } from "react-icons/fa";
import { FaHubspot, FaSalesforce } from "react-icons/fa";
import { MdOutlineDelete } from "react-icons/md";
import {
  SiGooglesheets,
  SiQuickbooks,
  SiMailchimp,
  SiGoogleanalytics,
} from "react-icons/si";
import { toast } from "react-toastify";
import { deleteIntegration } from "../api/dataIntegrationAPI";

interface DataTableProps {
  activeTable: string;
  searchTerm: string;
  accountsData: any[];
  fetchUserData: () => void;
}

const DataTableComponent = ({
  activeTable,
  searchTerm,
  fetchUserData,
  accountsData,
}: DataTableProps) => {
  const [deleteModalOpen, setModalDeleteOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState(null);

  const IntegrationIcons = {
    salesforce: {
      icon: <FaSalesforce style={{ color: "#00A1E0", fontSize: "24px", marginLeft: "5px" }} />,
      label: "Salesforce",
    },
    hubspot: {
      icon: <FaHubspot style={{ color: "#FF7A59", fontSize: "24px" }} />,
      label: "Hubspot",
    },
    quickbooks: {
      icon: <SiQuickbooks style={{ color: "#2CA01C", fontSize: "24px" }} />,
      label: "Quickbooks",
    },
    "Google Analytics": {
      icon: <SiGoogleanalytics style={{ color: "#F9AB00", fontSize: "24px" }} />,
      label: "Google Analytics",
    },
    "Mailchimp Integration": {
      icon: <SiMailchimp style={{ color: "#FFE01B", fontSize: "24px" }} />,
      label: "Mailchimp Integration",
    },
    google_workbook: {
      icon: <SiGooglesheets style={{ color: "#0F9D58", fontSize: "24px" }} />,
      label: "Google Workbook",
    },
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const openDeleteModal = (item: any) => {
    setSelectedFileName(item);
    setModalDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setModalDeleteOpen(false);
    setSelectedFileName(null);
  };

  const handleDelete = async () => {
    if (selectedFileName) {
      try {
        const email = selectedFileName.email;
        await deleteIntegration(selectedFileName.integration_name, email);

        toast.success("Deleted successfully");
        fetchUserData();
        closeDeleteModal();
      } catch (error) {
        toast.error("Error deleting the integration");
      }
    }
  };

  return (
    <div className="w-full overflow-x-auto">
      {activeTable === "table1" && (
        <div
          className={`transition-opacity duration-500 ${activeTable === "table1"
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
            }`}
        >
          <div className="rounded-lg overflow-x-auto shadow-lg">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead className="bg-[#1C6BA0] dark:bg-gray-950">
                <tr className="text-white dark:text-gray-200">
                  <th className="py-3 px-4 font-semibold whitespace-nowrap left-0">
                    Platform
                  </th>
                  <th className="py-3 px-4 font-semibold whitespace-nowrap">
                    Account Id
                  </th>
                  <th className="py-3 px-4 font-semibold whitespace-nowrap">
                    Email
                  </th>
                  <th className="py-3 px-4 font-semibold whitespace-nowrap">
                    Status
                  </th>
                  <th className="py-3 px-4 font-semibold whitespace-nowrap">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {accountsData?.length > 0 ? (
                  accountsData.map((item, idx) => (
                    <tr
                      key={item._id || idx}
                      className="even:bg-gray-200 odd:bg-gray-100 dark:even:bg-gray-950 dark:odd:bg-gray-900 hover:bg-gray-300 dark:hover:bg-opacity-60 transition-colors"
                    >
                      <td className="px-6 py-3 whitespace-nowrap flex items-center space-x-2">
                        {IntegrationIcons[item.integration_name]?.icon && (
                          <div className="flex gap-2 items-center">
                            {IntegrationIcons[item.integration_name].icon}
                            <span>
                              {IntegrationIcons[item.integration_name].label ||
                                (item.integration_name.charAt(0).toUpperCase() +
                                  item.integration_name.slice(1))}
                            </span>
                          </div>
                        )}
                      </td>

                      <td className="px-4 py-3 whitespace-nowrap">{item.account_id}</td>

                      <td className="px-4 py-3 whitespace-nowrap">{item.email}</td>

                      <td className="px-4 py-3 whitespace-nowrap flex items-center">
                        {item.status === "Connected" ? (
                          <FaWifi className="text-green-400 mr-2 h-7 w-7 ml-3" />
                        ) : (
                          <FaWifi className="text-red-400 mr-2 h-7 w-7 ml-3" />
                        )}
                      </td>

                      <td className="px-6 py-2 w-7 h-6 whitespace-nowrap">
                        <div className="relative group flex items-center justify-center w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 bg-red-200 hover:bg-red-500 text-red-500 hover:text-red-100 rounded-full cursor-pointer transition-all duration-500">
                          <MdOutlineDelete
                            className="h-6 w-6"
                            onClick={() => openDeleteModal(item)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                    >
                      {`No results found for "${searchTerm}"`}
                    </td>
                  </tr>
                )}
              </tbody>

            </table>
          </div>
        </div>
      )}

      {activeTable === "table2" && (
        <div
          className={`transition-opacity duration-500 ${activeTable === "table2"
            ? "opacity-100"
            : "opacity-0 pointer-events-none"
            }`}
        >
          <div className="rounded-lg overflow-x-auto shadow-lg">
            <table className="w-full text-left border-collapse min-w-[700px] ">
              <thead className="bg-[#1C6BA0] dark:bg-gray-950">
                <tr className="text-white dark:text-gray-200">
                  <th className="py-3 px-6 font-semibold whitespace-nowrap left-0">
                    Sr.no
                  </th>
                  <th className="py-3 px-6 font-semibold whitespace-nowrap">
                    Integration
                  </th>
                  <th className="py-3 px-6 font-semibold whitespace-nowrap">
                    Status
                  </th>
                  <th className="py-3 px-6 font-semibold whitespace-nowrap">
                    Guide
                  </th>
                </tr>
              </thead>
              <tbody>
                {accountsData?.length > 0 ? (
                  accountsData.map((item, idx) => (
                    <tr
                      key={item._id || idx}
                      className="even:bg-gray-200 odd:bg-gray-100 dark:even:bg-gray-700 dark:odd:bg-gray-900 hover:bg-gray-300 dark:hover:bg-opacity-60 transition-colors"
                    >
                      <td className="px-6 py-3 whitespace-nowrap z-30">
                        {idx + 1}
                      </td>

                      <td className="px-6 py-3 whitespace-nowrap flex items-center space-x-2">
                        {IntegrationIcons[item.integration_name]?.icon && (
                          <div className="flex gap-2 items-center">
                            {IntegrationIcons[item.integration_name].icon}
                            <span>
                              {IntegrationIcons[item.integration_name].label ||
                                (item.integration_name.charAt(0).toUpperCase() +
                                  item.integration_name.slice(1))}
                            </span>
                          </div>
                        )}
                      </td>

                      <td className="px-6 py-3 whitespace-nowrap">
                        <span>
                          {item.status === "Connected" ? (
                            <>
                              <FaWifi className="text-green-400 mr-2 w-7 h-7 ml-3" />
                            </>
                          ) : (
                            <>
                              <FaWifi className="text-red-400 mr-2 h-6 w-7 ml-3" />
                            </>
                          )}
                        </span>
                      </td>

                      <td className="px-6 py-3 whitespace-nowrap hover:cursor-pointer">
                        <a
                          href={item.guide}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-500 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          View Guide
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-8 text-center text-gray-500 dark:text-gray-400"
                    >
                      {`No results found for "${searchTerm}"`}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {deleteModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white dark:bg-gray-800 w-full max-w-md p-6 rounded-2xl shadow-lg transform transition-all">
            <div className="flex flex-col items-center justify-center text-center">
              {/* Warning Icon */}
              <div className="bg-red-100 dark:bg-red-900 p-4 rounded-full mb-4">
                <MdOutlineDelete className="h-10 w-10 text-red-600 dark:text-red-400" />
              </div>

              {/* Modal Title */}
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                Confirm Deletion
              </h2>

              {/* Modal Description */}
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete this item? This action cannot be undone.
              </p>

              {/* Action Buttons */}
              <div className="flex space-x-4">
                {/* Cancel Button */}
                <button
                  onClick={closeDeleteModal}
                  className="px-4 py-2 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 focus:ring focus:ring-gray-500 focus:outline-none transition"
                >
                  Cancel
                </button>

                {/* Delete Button */}
                <button
                  onClick={handleDelete}
                  className="px-4 py-2 rounded-md bg-red-600 hover:bg-red-500 text-white focus:ring focus:ring-red-400 focus:outline-none transition"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export const DataTable = memo(DataTableComponent);