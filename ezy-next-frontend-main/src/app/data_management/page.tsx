"use client";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import {
  fetchAllDataAPI,
  handleApiCallAPI,
  uploadFileTo,
  handleDeleteAPI,
  handleViewAPI,
  openEditModalAPI,
  handleSaveEditsAPI
} from "../api/datamanagementAPI.js";
import { useTheme } from "../context/ThemeContext";
import ProtectedRoute from "../components/ProtectedRoute";

import { FaEdit, FaEye, FaTrash } from "react-icons/fa";
import React from "react";
import Modal from "../components/Modal";
import Papa from "papaparse";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";
import SpinLoader from "../components/SpinLoader";
import ResponsiveContainer from "../components/ResponsiveContainer";
import { ActionButton } from "./ActionButton";
import { ResponsiveTable } from "./ResponsiveTable";
import { EditableTable } from "./EditableTable";
import { UploadSection } from "./UploadSection";
import { SearchBar } from "./SearchBar";
import { DataClean } from "./DataClean";

const DataManagement = () => {
  const { isDarkMode } = useTheme();
  const [activeSection, setActiveSection] = useState("table");
  const notifySuccess = (message) => toast.success(message);
  const notifyError = (message) => toast.error(message);
  const notifyInfo = (message) => toast.info(message);
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [viewData, setViewData] = useState([]);
  const [editedData, setEditedData] = useState([]);
  const [fileName, setFileName] = useState("");
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
  const [deleteModalOpen, setModalDeleteOpen] = useState(false);
  const [checkFileExist, setCheckFileExist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [customFileName, setCustomFileName] = useState(fileName);
  const [fileNamePopupOpen, setFileNamePopupOpen] = useState(false);
  const [filteredViewData, setFilteredViewData] = useState([]);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc" | null>(
    null
  );
  const inputRefs = useRef([]);
  const hasFetchedData = useRef(false);

  const fetchAllData = useCallback(async () => {

    setLoading(true);
    try {
      const response = await fetchAllDataAPI();
      if (response ) {
        setAllData(response);
        setCheckFileExist(response.map((file) => file.filename));
      } else {
        setAllData([]);
        notifyInfo("No files found.");
      }
    } finally {
      setLoading(false);
    }
  }, [fetchAllDataAPI]);

  useEffect(() => {
    if (!hasFetchedData.current) {
      fetchAllData();
      hasFetchedData.current = true;
    }
  }, [fetchAllData]);

  const closeEditModal = () => setEditModalOpen(false);

  const handleFileUpload = async (event, setActiveSection) => {
    const files = event.dataTransfer
      ? event.dataTransfer.files
      : event.target.files;

    if (!files || files.length === 0) {
      notifyError("No files selected for upload.");
      return;
    }

    const validFiles = [];
    const duplicateFiles = [];
    const invalidFiles = [];

    Array.from(files as FileList).forEach((file) => {
      const validFileTypes = [
        "text/csv",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];

      if (!validFileTypes.includes(file.type)) {
        invalidFiles.push(file.name);
      } else if (checkFileExist.includes(file.name)) {
        duplicateFiles.push(file.name);
      } else {
        validFiles.push(file);
      }
    });

    if (invalidFiles.length > 0) {
      notifyError(
        `Invalid file types: ${invalidFiles.join(
          ", "
        )}. Only CSV and Excel files are allowed.`
      );
    }

    if (duplicateFiles.length > 0) {
      notifyError(
        `Duplicate files: ${duplicateFiles.join(
          ", "
        )}. Please upload a new file.`
      );
    }

    if (validFiles.length === 0) return;

    validFiles.forEach((file) => {
      const reader = new FileReader();
      setLoading(true);

      reader.onload = async () => {
        try {
          let parsedData;
          if (file.type === "text/csv") {
            parsedData = Papa.parse(reader.result, {
              header: true,
              skipEmptyLines: true,
            }).data;
          } else {
            const data = new Uint8Array(reader.result as ArrayBuffer);
            const workbook = XLSX.read(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            parsedData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
          }

          const sanitizedData = sanitizeHeaders(parsedData);
          await uploadFileToAPI(file, sanitizedData);
        } catch (error) {
          notifyError("Error processing file.");
        } finally {
          setLoading(false);
        }
      };

      file.type === "text/csv"
        ? reader.readAsText(file)
        : reader.readAsArrayBuffer(file);
    });
  };

  const sanitizeHeaders = (data) => {
    const sanitizedData = data.map((row) => {
      const sanitizedRow = {};
      Object.keys(row).forEach((key) => {
        const sanitizedKey = key.replace(/[^a-zA-Z0-9_]/g, "_").toLowerCase();
        sanitizedRow[sanitizedKey] = row[key];
      });
      return sanitizedRow;
    });
    return sanitizedData;
  };

  const uploadFileToAPI = async (file, parsedData = null) => {
    const formData = new FormData();
    formData.append("file", file);

    if (parsedData) {
      formData.append("data", JSON.stringify(sanitizeHeaders(parsedData)));
    }

    try {
      const response = await handleApiCallAPI("post", "upload", formData);
      if (response?.status === 200) {
        notifySuccess(`${file.name} uploaded successfully.`);
        await fetchAllData();
        setActiveSection("table");
      }
    } catch (error) {
      notifyError("Failed to upload the file.");
    }
  };

  const handleDelete = async () => {
    if (!selectedFileName) {
      notifyError("No file selected for deletion.");
      return;
    }

    try {
      const response = await handleDeleteAPI(selectedFileName);
      if (response?.status === 200) {
        notifySuccess(`File ${selectedFileName} deleted successfully!`);

        setAllData((prevData) =>
          prevData.filter((file) => file.filename !== selectedFileName)
        );
        setCheckFileExist((prevFiles) =>
          prevFiles.filter((filename) => filename !== selectedFileName)
        );

        closeDeleteModal();
      }
    } catch (error) {
      notifyError(`Failed to delete file ${selectedFileName}.`);
    }
  };

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: "ascending",
  });

  const handleSort = (direction: "asc" | "desc") => {
    const sortedData = [...filteredViewData].sort((a, b) => {
      const key = Object.keys(a)[0];
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredViewData(sortedData);
    setSortDirection(direction);
  };
  const handleSearch = (searchTerm) => {
    if (!searchTerm.trim()) {
      setFilteredViewData(viewData);
      return;
    }

    const filtered = viewData.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    setFilteredViewData(filtered);
  };

  const handleView = async (fileName) => {
    try {
      const response = await handleViewAPI(fileName);
      if (response?.status === 200) {
        setFileName(response.data.filename);
        const data = response.data.content || [];
        setViewData(data);
        setFilteredViewData(data);
        setViewModalOpen(true);
      }
    } catch (error) {
      notifyError(`Failed to fetch data for ${fileName}.`);
    }
  };

  const openEditModalAPI = (rowIndex, key, value) => {
    const updatedData = [...editedData];
    updatedData[rowIndex] = { ...updatedData[rowIndex], [key]: value };
    setEditedData(updatedData);
  };

  const convertToCSV = (data) => Papa.unparse(data);

  const openEditModal = async (fileName) => {
    try {
      const response = await handleApiCallAPI("get", `get-file/${fileName}`);
      if (response?.status === 200) {
        const fileData = response.data;
        setFileName(fileData.filename);
        setEditedData(fileData.content || []);
        setEditModalOpen(true);
        notifySuccess(`File ${fileData.filename} data retrieved successfully!`);
      }
    } catch (error) {
      notifyError(`Failed to fetch data for ${fileName}.`);
    }
  };

  const openDeleteModal = (fileName: string) => {
    setSelectedFileName(fileName);
    setModalDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setModalDeleteOpen(false);
    setSelectedFileName(null);
  };

  const handleSaveEdits = async () => {
    if (!fileName || !editedData) {
      notifyError("Filename or edited data is missing!");
      return;
    }

    const formData = new FormData();
    try {
      const isExcelFile =
        fileName.endsWith(".xlsx") || fileName.endsWith(".xls");
      if (isExcelFile) {
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(editedData);
        XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

        const excelBlob = new Blob(
          [XLSX.write(wb, { bookType: "xlsx", type: "array" })],
          {
            type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          }
        );

        formData.append("file", excelBlob, fileName);
      } else {
        const csvBlob = new Blob([convertToCSV(editedData)], {
          type: "text/csv",
        });
        formData.append("file", csvBlob, fileName);
      }

      const response = await handleApiCallAPI("post", "upload", formData);
      if (response?.status === 200) {
        notifySuccess("File saved successfully!");
        setEditModalOpen(false);
      }
    } catch (error) {
      notifyError("Failed to save the edited file.");
    }
  };

  const handleDownload = () => {
    if (!filteredViewData || filteredViewData.length === 0) {
      alert("No data available to download.");
      return;
    }

    const isExcelFile = fileName.endsWith(".xlsx") || fileName.endsWith(".xls");
    let blob, url, filename;

    if (isExcelFile) {
      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(filteredViewData);
      XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

      const excelBlob = new Blob(
        [XLSX.write(wb, { bookType: "xlsx", type: "array" })],
        {
          type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        }
      );
      

      blob = excelBlob;
      filename = fileName.trim();
    } else {
      const csvContent = convertToCSVForDownload(filteredViewData);
      blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      filename = fileName.trim();
    }

    url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
  };

  const convertToCSVForDownload = (data: any[]) => {
    const headers = Object.keys(data[0]);
    const rows = data.map((row) =>
      headers.map((header) => `"${row[header] || ""}"`).join(",")
    );

    return [headers.join(","), ...rows].join("\n");
  };

  useEffect(() => {
    setFilteredData(allData);
  }, [allData]);


  const renderContent = () => {
    switch (activeSection) {
      case "table":
        return (
          <div>
            <SearchBar
              onSearch={(term) => {
                if (!term.trim()) {
                  setFilteredData(allData);
                  return;
                }
                const filtered = allData.filter((row) =>
                  row.filename.toLowerCase().includes(term.toLowerCase())
                );
                setFilteredData(filtered);
              }}
              isDarkMode={isDarkMode}
            />
            <div
              className={`overflow-x-auto shadow-lg rounded-lg mb-12 ${isDarkMode ? "bg-gray-900" : "bg-gray-100"
                }`}
            >
              <table
                className={`w-full border-collapse text-sm md:text-base ${isDarkMode
                    ? "bg-gray-900 text-white"
                    : "bg-gray-100 text-gray-800"
                  }`}
                style={{ tableLayout: 'auto' }}
              >
                <thead>
                  <tr
                    className={`${isDarkMode
                        ? "bg-gradient-to-r  from-gray-800 to-gray-700 text-gray"
                        : "bg-[#1E6BA1] text-white"
                      }`}
                  >
                    <th className="border p-2 md:p-3 text-left">Sr.No</th>
                    <th className="border p-2 md:p-3 text-left">Name</th>
                    <th className="border p-2 md:p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    <tr>
                      <td
                        colSpan={3}
                        className="flex justify-center items-center h-40"
                      >
                        <SpinLoader size="12" color="blue-500" />
                      </td>
                    </tr>
                  ) : filteredData.length > 0 ? (
                    filteredData.map((row, index) => (
                      <tr
                        key={row.id || `${row.filename}-${index}`}
                        className={`odd:bg-transparent even:${isDarkMode ? "bg-gray-700" : "bg-gray-50"
                          } hover:${isDarkMode ? "bg-gray-600" : "bg-gray-200"
                          } transition-all`}
                      >
                        <td className="border p-2 md:p-3">{index + 1}</td>
                        <td className="border p-2 md:p-3">{row.filename}</td>
                        <td className="border p-2 md:p-3 whitespace-normal text-center  gap-1 lg:gap-4 md:">
                          <div className="flex items-center justify-center gap-3 lg:gap-6 md:gap-4">

                            <ActionButton
                              icon={<FaEye className="w-3 h-3 md:w-3 md:h-3 lg:w-4 lg:h-4" />}
                              color="blue"
                              label="View"
                              onClick={() => handleView(row.filename)}
                            />
                            <ActionButton
                              icon={<FaEdit className="w-3 h-3 md:w-3 md:h-3 lg:w-4 lg:h-4" />}
                              color="green"
                              label="Edit"
                              onClick={() => openEditModal(row.filename)}
                            />
                            <ActionButton
                              icon={<FaTrash className="w-3 h-3 md:w-3 md:h-3 lg:w-4 lg:h-4" />}
                              color="red"
                              label="Delete"
                              onClick={() => openDeleteModal(row.filename)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : allData.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="text-center py-4">
                        No data available.
                      </td>
                    </tr>
                  ) : (
                    <tr>
                      <td colSpan={3} className="text-center py-4">
                        No results found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {viewModalOpen && (
              <Modal
                title={fileName}
                isOpen={viewModalOpen}
                onClose={() => setViewModalOpen(false)}
                primaryAction={handleDownload}
                primaryColor="bg-green-700 hover:bg-green-400"
                primaryLabel="Download"
                secondaryAction={() => setViewModalOpen(false)}
                secondaryColor="bg-gray-400 hover:bg-gray-500"
                secondaryLabel="Close"
                onSearch={handleSearch}
                onSort={handleSort}
                showSearch={true}
                showSort={true}
              >
                <ResponsiveTable
                  data={filteredViewData}
                  sortConfig={sortConfig}
                />
              </Modal>
            )}

            {editModalOpen && (
              <Modal
                title="Edit CSV Data"
                isOpen={editModalOpen}
                onClose={closeEditModal}
                primaryAction={handleSaveEdits}
                primaryColor="bg-blue-400 hover:bg-blue-500"
                primaryLabel="Save"
                secondaryAction={closeEditModal}
                secondaryColor="bg-gray-400 hover:bg-gray-500"
                secondaryLabel="Close"
                showSearch={false}
              >
                <EditableTable data={editedData} onChange={openEditModalAPI} />
              </Modal>
            )}

            {deleteModalOpen && (
              <Modal
                title="Delete Confirmation"
                isOpen={deleteModalOpen}
                onClose={closeDeleteModal}
                primaryAction={handleDelete}
                primaryColor="bg-red-600 hover:bg-red-400"
                primaryLabel="Delete"
                secondaryAction={closeDeleteModal}
                secondaryColor="bg-gray-400 hover:bg-gray-500"
                secondaryLabel="Cancel"
                showSearch={false}
              >
                <div className="flex flex-col items-center justify-center text-center">
                  <p className="text-lg font-medium text-gray-800 dark:text-gray-200 mb-4">
                    Are you sure you want to delete this data?
                  </p>
                </div>
              </Modal>
            )}

            {fileNamePopupOpen && (
              <Modal
                title="Enter File Name"
                isOpen={fileNamePopupOpen}
                onClose={() => setFileNamePopupOpen(false)}
                primaryAction={handleDownload}
                primaryColor="bg-green-700 hover:bg-green-400"
                primaryLabel="Download"
                secondaryAction={() => setFileNamePopupOpen(false)}
                secondaryColor="bg-gray-400 hover:bg-gray-500"
                secondaryLabel="Cancel"
              >
                <div className="mb-4">
                  <label
                    htmlFor="filename"
                    className="block mb-2 text-sm font-medium "
                  >
                    File Name (without extension):
                  </label>
                  <input
                    type="text"
                    id="filename"
                    value={customFileName}
                    onChange={(e) => setCustomFileName(e.target.value)}
                    className="w-full px-2 py-1 border rounded dark:text-gray-900"
                    placeholder="Enter filename"
                  />
                </div>
              </Modal>
            )}
          </div>
        );
      case "clean":
        return (
          <DataClean isDarkMode={isDarkMode} />
        );
      case "upload":
        return (
          <UploadSection
            isDarkMode={isDarkMode}
            onFileUpload={(event) => handleFileUpload(event, setActiveSection)}
            setActiveSection={setActiveSection}
          />
        );
      default:
        return null;
    }
  };

  return (
    <ProtectedRoute>
      <ResponsiveContainer>
        <div
          className={`max-w-[1400px] mx-auto ${isDarkMode ? "text-white" : "text-black"
            }`}
        >
          <div className="flex flex-wrap justify-center gap-6 mb-12 py-6">
            {["table", "clean", "upload"].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`${activeSection === section
                    ? "bg-[#1E6BA1] text-white"
                    : "bg-gray-300 text-black"
                  } hover:bg-[#135a87] hover:text-white font-bold py-2 px-6 rounded shadow transition-colors relative`}
              >
                {`Data ${section.charAt(0).toUpperCase() + section.slice(1)}`}
                {section === 'table' && allData.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-blue-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center badge-blink">
                    {allData.length}
                  </span>
                )}
              </button>
            ))}

          </div>
          {renderContent()}
        </div>
      </ResponsiveContainer>
    </ProtectedRoute>
  );
};

export default DataManagement;