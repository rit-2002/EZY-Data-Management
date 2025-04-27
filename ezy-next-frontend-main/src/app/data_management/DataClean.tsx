
import { FaEllipsisH, FaEdit, FaTrash, FaFileImport } from "react-icons/fa";
import SpinLoader from "../components/SpinLoader";
import { useState, useEffect, useCallback } from "react";
import { SearchBar } from "./SearchBar";
import { toast } from "react-toastify";
import { FcKindle } from "react-icons/fc";
import {
  fetchAllDataApi,
  fetchNullRecordsApi,
  getCleaningFileApi,
  setCleaningFlagApi,
  fetchDuplicatesApi,
  removeDuplicatesApi,
  handleSaveApi,
  handleDeleteRowApi,
} from "../api/datacleanAPI.js";

export const DataClean = ({ isDarkMode }) => {
  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showActionPopup, setShowActionPopup] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [duplicates, setDuplicates] = useState([]);
  const [nullRecords, setNullRecords] = useState([]);
  const [loadingDuplicates, setLoadingDuplicates] = useState(false);
  const [loadingNullRecords, setLoadingNullRecords] = useState(false);
  const [showDuplicatesPopup, setShowDuplicatesPopup] = useState(false);
  const [showNullRecordsPopup, setShowNullRecordsPopup] = useState(false);
  const [fileData, setFileData] = useState(null);
  const [isImportPopup, setIsImportPopup] = useState(false);
  const [cleaningFiles, setCleaningFiles] = useState([]);
  const [remainingFiles, setRemainingFiles] = useState([])
  const [isEditPopup, setIsEditPopup] = useState(false);
  const [editedRecords, setEditedRecords] = useState([]);

  const notifySuccess = (message) => toast.success(message);
  const notifyInfo = (message) => toast.info(message);

  // for fetching all uploaded files
  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchAllDataApi();
      if (response) {
        setAllData(response.files);
      }
    } catch (error) {
      notifyInfo("No files uploaded");
    } finally {
      setLoading(false);
    }
  }, []);

  // for fetching files only from data clean section
  const getCleaningFile = async () => {
    setLoading(true);

    try {
      const response = await getCleaningFileApi();
      setCleaningFiles(response);
      setFilteredData(response);
    } catch {
      notifyInfo("No files imported for data cleaning.");
    } finally {
      setLoading(false);
    }
  };

  // for filtering search records
  const handleSearch = (searchValue) => {
    if (searchValue.trim() !== "") {
      const filtered = cleaningFiles.filter(item => item.filename?.toLowerCase().includes(searchValue.toLowerCase()))
      setFilteredData(filtered);
      return;
    }
    setFilteredData(cleaningFiles);
  };

  const setCleaningFlag = async (file) => {
    if (!file?.filename) return;

    if (cleaningFiles.some((cleanedFile) => cleanedFile.filename === file.filename)) {
      notifyInfo(`File "${file.filename}" is already present in the table.`);
      return;
    }

    try {
      const response = await setCleaningFlagApi(file);

      if (response.status === 200) {
        notifySuccess(`File imported successfully: ${file.filename}`);
        getCleaningFile();
      }
    } catch (error) {
      notifyInfo("Failed to set file for cleaning.");
    }
  };

  const fetchDuplicates = async () => {
    if (currentFile) {
      setLoadingDuplicates(true);
      try {
        const response = await fetchDuplicatesApi(currentFile);

        if (response) {
          const duplicates = response;

          if (duplicates.length > 0) {
            setDuplicates(duplicates);
            setShowDuplicatesPopup(true);
            notifySuccess(`Fetched duplicates for: ${currentFile.filename}`);
          } else {
            setDuplicates([]);
            notifyInfo(`No duplicates found for: ${currentFile.filename}`);
          }
        } else {
          notifyInfo("Error fetching duplicates.");
        }
      } catch (error) {
        notifyInfo("Error fetching duplicates.");
      } finally {
        setLoadingDuplicates(false);
      }
    }
    closeActionPopup();
  };

  const fetchNullRecords = async () => {
    if (currentFile) {
      setLoadingNullRecords(true);
      try {
        const response = await fetchNullRecordsApi(currentFile);
        console.log(response);


        const nullRows = response;
        setNullRecords(nullRows);
        setFileData(response.file_data);

        if (nullRows.length > 0) {
          setShowNullRecordsPopup(true);
          notifySuccess(`Fetched null records for: ${currentFile.filename}`);
        } else {
          notifyInfo(`No null records found for: ${currentFile.filename}`);
        }

      } catch (error) {
        notifyInfo("Error fetching null records in fetch null record .");
        console.log(error);
      } finally {
        setLoadingNullRecords(false);
      }
    }
    closeActionPopup();
  };

  const removeDuplicates = async () => {
    if (!currentFile || !currentFile.filename) {
      notifyInfo(
        "No file selected. Please select a file to remove duplicates."
      );
      return;
    }

    setLoadingDuplicates(true);
    try {
      const response = await removeDuplicatesApi(currentFile)

      if (response === 200) {
        notifySuccess(
          `Successfully removed duplicates from: ${currentFile.filename}`
        );

        await fetchAllData();

        closeDuplicatesPopup();
      }
    } catch (error) {
      notifyInfo(
        "An error occurred while removing duplicates. Please try again."
      );
    } finally {
      setLoadingDuplicates(false);
    }
  };

  const handleEditChange = (rowId, key, value) => {
    setEditedRecords((prevRecords) => {
      const existingRecordIndex = prevRecords.findIndex(
        (r) => r.row_id === rowId
      );

      if (existingRecordIndex >= 0) {
        const updatedRecords = [...prevRecords];
        updatedRecords[existingRecordIndex].row_data[key] = value;

        if (
          Object.values(updatedRecords[existingRecordIndex].row_data).every(
            (v) => v === "" || v === null
          )
        ) {
          updatedRecords.splice(existingRecordIndex, 1);
        }

        return updatedRecords;
      } else {
        if (value) {
          return [
            ...prevRecords,
            {
              row_id: rowId,
              row_data: { [key]: value },
            },
          ];
        }
      }
      return prevRecords;
    });
  };

  const handleSave = async () => {

    if (!editedRecords || editedRecords.length === 0) {
      notifyInfo("No records to save.");
      return;
    }

    try {
      const response = await handleSaveApi(currentFile, editedRecords);

      if (response === 200) {
        notifySuccess("Data saved successfully!");
        setEditedRecords([]);
        setIsEditPopup(false);
        setShowNullRecordsPopup(false);
      }
    } catch (error) {
      notifyInfo("Error saving the records.");
    }
  };

  const handleDeleteRow = async (record) => {
    const rowId = record.row_id;

    if (!rowId) {
      notifyInfo("Invalid row ID.");
      return;
    }

    try {
      const response = await handleDeleteRowApi(currentFile, rowId);

      if (response === 200) {
        notifySuccess("Selected records deleted successfully.");
        await fetchNullRecords();
      } else {
        notifyInfo("Error delete records else.");
      }
    } catch (error) {
      notifyInfo("Error deleting the records.");
    }
  };

  const openActionPopup = (file) => {
    setCurrentFile(file);

    setShowActionPopup(true);
  };

  const closeActionPopup = () => {
    setShowActionPopup(false);
  };

  const closeDuplicatesPopup = () => {
    setShowDuplicatesPopup(false);
    setCurrentFile(null);
  };

  const closeNullRecordsPopup = () => {
    setShowNullRecordsPopup(false);
    setCurrentFile(null);
  };

  const hideScrollbar: React.CSSProperties = {
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  };

  useEffect(() => {
    fetchAllData()
    getCleaningFile();
  }, []);

  useEffect(() => {
    if (allData?.length > 0) {
      const updatedClean = cleaningFiles?.map(file => file.filename)
      const remaining = (allData.filter(file => !updatedClean.includes(file.filename)))
      setRemainingFiles(remaining)
    }
  }, [allData, cleaningFiles])

  return (
    <>
      <div className="flex gap-5 sm:justify-end md:justify-end mt-4 mr-5 mb-3">
        <SearchBar onSearch={handleSearch} isDarkMode={isDarkMode} />
      </div>

      <div className="container mx-auto px-4 mb-12">
        <div className="rounded-xl shadow-lg overflow-hidden">
          <div
            className={`p-4 ${isDarkMode
              ? "bg-gradient-to-r from-gray-800 to-gray-700"
              : "bg-gradient-to-r from-[#1E6BA1] to-[#2E8BC0]"
              }`}
          >
            <div className="flex  sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="inline-flex items-center gap-1 sm:gap-2">
                <FcKindle className="text-3xl flex-shrink-0" />
                <h2 className="text-white text-base sm:text-xl font-semibold">
                  Cleaning Files
                </h2>
              </div>

              <button
                className={`bg-[#1E6BA1] hover:bg-[#135a87] text-white px-3 py-2 rounded-lg flex items-center justify-center sm:ml-4`}
                onClick={() => setIsImportPopup(true)}
              >
                <FaFileImport className="mr-2" />
                <span className="hidden sm:block ml-2">Import</span>
              </button>
            </div>
          </div>

          <div
            className={`rounded-b-xl ${isDarkMode ? "bg-gray-900" : "bg-white"
              } overflow-x-auto`}
          >
            {loading ? (
              <div className="flex items-center justify-center h-40">
                <SpinLoader size="12" color="blue-500" />
              </div>
            ) : (
              <table
                className={`w-full border-collapse text-sm md:text-base ${isDarkMode}`}
                style={{ tableLayout: "auto" }}
              >
                <thead>
                  <tr
                    className={`${isDarkMode
                      ? "bg-gradient-to-r from-gray-800 to-gray-700 text-gray"
                      : "bg-[#1E6BA1] text-white"
                      }`}
                  >
                    <th className="border p-2 md:p-3 text-left">Sr. No.</th>
                    <th className="border p-2 md:p-3 text-left">File Name</th>
                    <th className="border p-2 md:p-3 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData?.map((file, index) => (
                    <tr
                      key={file?.id || `${file.filename}-${index}`}
                      className={`${isDarkMode ? "text-gray-200" : "text-gray-700"
                        }`}
                    >
                      <td className="border p-2 md:p-3">{index + 1}</td>
                      <td className="border p-2 md:p-3">
                        {file?.filename || "Unnamed File"}
                      </td>
                      <td className="border p-2 md:p-3 text-center">
                        <div className="flex items-center justify-center gap-2 md:gap-4">
                          <button
                            onClick={() => openActionPopup(file)}
                            className={`p-2 text-sm rounded-full transition duration-200 ${isDarkMode
                              ? "text-white hover:bg-gray-700"
                              : "text-gray-500 hover:bg-gray-200"
                              }`}
                          >
                            <FaEllipsisH />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {showActionPopup && currentFile && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className={`relative p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-lg ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              } max-h-[90vh] overflow-y-auto`}
          >
            <button
              onClick={closeActionPopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            >
              ✖
            </button>

            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-center sm:text-left">
              Actions for {currentFile.filename}
            </h3>

            <div className="space-y-3">
              <button
                onClick={fetchDuplicates}
                className="w-full bg-[#1E6BA1] hover:bg-[#135a87] text-white py-2 rounded-lg"
                disabled={loadingDuplicates}
              >
                {loadingDuplicates ? "Loading..." : "Fetch Duplicates"}
              </button>

              <button
                onClick={fetchNullRecords}
                className="w-full bg-[#1E6BA1] hover:bg-[#135a87] text-white py-2 rounded-lg"
              >
                Fetch Null Records
              </button>
            </div>
          </div>
        </div>
      )}

      {isImportPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div
            className={`relative p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-sm sm:max-w-lg ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              } max-h-[80vh] overflow-y-auto`}
          >
            <button
              onClick={() => setIsImportPopup(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            >
              ✖
            </button>

            <h3 className="text-lg sm:text-xl ml-4 font-semibold mb-8 text-center sm:text-left">
              Import
            </h3>

            {loading ? (
              <div className="flex justify-center items-center h-20">
                <SpinLoader size="12" color="blue-500" />
              </div>
            ) : remainingFiles.length > 0 ? (
              <ul
                className="space-y-3 max-h-[60vh] overflow-y-auto px-2"
                style={hideScrollbar}
              >
                {
                  remainingFiles.length === 0 ? (
                    <div>
                      No new files to import.
                    </div>
                  ) : remainingFiles.map((file, index) => {
                    return (
                      <li
                        key={index}
                        onClick={() => setCleaningFlag(file)}
                        className={`p-3 border rounded cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700 text-center sm:text-left`}
                      >
                        <div className="flex items-center justify-between">
                          <span>{file?.filename || "Unnamed File"}</span>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            ) : (
              <p className="text-center text-gray-500">
                No uploaded files available.
              </p>
            )}
          </div>
        </div>
      )}

      {showNullRecordsPopup && (
        <div className="fixed inset-0 pl-20 pr-6 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`relative p-4 md:p-6 rounded-lg shadow-lg max-w-4xl w-full ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg sm:text-xl font-semibold">Null Records</h3>
              <div className="flex gap-2">
                <button
                  className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 px-4 rounded-lg"
                  onClick={() => {
                    setIsEditPopup(true);
                  }}
                >
                  <FaEdit className="text-lg" />
                </button>
                <button
                  onClick={closeNullRecordsPopup}
                  className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  ✖
                </button>
              </div>
            </div>

            {nullRecords.length > 0 ? (
              <div className="overflow-x-auto">
                <table
                  className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-sm sm:text-base"
                  style={{ tableLayout: "auto" }}
                >
                  <thead>
                    <tr>
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2 sm:px-4 sm:py-3">
                        Sr. No.
                      </th>
                      {Object.keys(nullRecords[0]?.row_data || {}).map(
                        (key, idx) => (
                          <th
                            key={idx}
                            className="border border-gray-300 dark:border-gray-700 px-3 py-2 sm:px-4 sm:py-3"
                          >
                            {key}
                          </th>
                        )
                      )}
                      <th className="border border-gray-300 dark:border-gray-700 px-3 py-2 sm:px-4 sm:py-3">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {nullRecords.map((record, index) => (
                      <tr
                        key={index}
                        className={`${isDarkMode
                          ? "text-gray-200 bg-gray-700 hover:bg-gray-600"
                          : "text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        <td className="border border-gray-300 dark:border-gray-700 px-3 py-2 sm:px-4 sm:py-3">
                          {index + 1}
                        </td>
                        {Object.entries(record.row_data || {}).map(
                          ([key, value], idx) => (
                            <td
                              key={idx}
                              className="border border-gray-300 dark:border-gray-700 px-3 py-2 sm:px-4 sm:py-3"
                            >
                              {value !== null ? String(value) : "N/A"}
                            </td>
                          )
                        )}
                        <td className="border  border-gray-300 dark:border-gray-700  justify-center px-3 py-2 sm:px-4 sm:py-3 text-center">
                          <div className="inline-block">
                            <button
                              onClick={() => handleDeleteRow(record)}
                              className="bg-red-500 text-white w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 flex items-center justify-center rounded-full hover:bg-red-700 transition-all duration-200"
                            >
                              <FaTrash className="w-3 h-3 sm:w-3 sm:h-3 md:w-4 md:h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No records with null values found.
              </p>
            )}
          </div>
        </div>
      )}

      {isEditPopup && (
        <div className="fixed inset-0 pl-20 pr-6  flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`relative p-6 rounded-lg shadow-lg max-w-4xl w-full ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xl font-semibold">Edit Records</h3>
              <button
                onClick={() => {
                  setIsEditPopup(false);
                }}
                className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
              >
                ✖
              </button>
            </div>

            {nullRecords.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-sm">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                        Sr. No.
                      </th>
                      {Object.keys(nullRecords[0]?.row_data || {}).map(
                        (key, idx) => (
                          <th
                            key={idx}
                            className="border border-gray-300 dark:border-gray-700 px-4 py-2"
                          >
                            {key}
                          </th>
                        )
                      )}
                    </tr>
                  </thead>
                  <tbody>
                    {nullRecords.map((record, index) => (
                      <tr
                        key={index}
                        className={`${isDarkMode
                          ? "text-gray-200 bg-gray-700 hover:bg-gray-600"
                          : "text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                          {index + 1}
                        </td>
                        {Object.entries(record.row_data || {}).map(
                          ([key, value], idx) => (
                            <td
                              key={idx}
                              className="border border-gray-300 dark:border-gray-700 px-4 py-2"
                            >
                              {value === null ? (
                                <input
                                  type="text"
                                  value={
                                    editedRecords.find(
                                      (r) => r.row_id === record.row_id
                                    )?.row_data[key] || ""
                                  }
                                  onChange={(e) =>
                                    handleEditChange(
                                      record.row_id,
                                      key,
                                      e.target.value
                                    )
                                  }
                                  className="border rounded px-2 py-1 w-full dark:bg-white dark:text-black"
                                />
                              ) : (
                                String(value)
                              )}
                            </td>
                          )
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-end mt-6 gap-4">
                  <button
                    className={`px-3 py-1 text-white rounded ${editedRecords.length > 0
                      ? "bg-[#1E6BA1] hover:bg-[#135a87]"
                      : "bg-[#1E6BA1] cursor-not-allowed"
                      }`}
                    onClick={handleSave}
                    disabled={editedRecords.length === 0}
                  >
                    Save
                  </button>

                  <button
                    className="px-3 py-1 text-gray-800 dark:text-gray-300 rounded bg-gray-400 hover:bg-gray-500"
                    onClick={() => {
                      setIsEditPopup(false);
                    }}
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No records with null values found.
              </p>
            )}
          </div>
        </div>
      )}

      {showDuplicatesPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div
            className={`relative p-6 rounded-lg shadow-lg max-w-4xl w-full ${isDarkMode ? "bg-gray-800 text-white" : "bg-white text-gray-800"
              }`}
          >
            <button
              onClick={closeDuplicatesPopup}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 dark:hover:text-gray-200"
            >
              ✖
            </button>

            <h3 className="text-xl font-semibold mb-4">Duplicate Records</h3>

            {duplicates.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse border border-gray-300 dark:border-gray-700 text-sm">
                  <thead>
                    <tr>
                      <th className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                        Sr. No.
                      </th>
                      {Object.keys(duplicates[0] || {}).map((key, idx) => (
                        <th
                          key={idx}
                          className="border border-gray-300 dark:border-gray-700 px-4 py-2"
                        >
                          {key}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {duplicates.map((duplicate, index) => (
                      <tr
                        key={index}
                        className={`${isDarkMode
                          ? "text-gray-200 bg-gray-700 hover:bg-gray-600"
                          : "text-gray-700 hover:bg-gray-100"
                          }`}
                      >
                        <td className="border border-gray-300 dark:border-gray-700 px-4 py-2">
                          {index + 1}
                        </td>
                        {Object.values(duplicate).map((value, idx) => (
                          <td
                            key={idx}
                            className="border border-gray-300 dark:border-gray-700 px-4 py-2"
                          >
                            {String(value) || "N/A"}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="flex justify-center items-center mt-3 ">
                  <button
                    onClick={removeDuplicates}
                    className=" bg-[#1E6BA1] hover:bg-blue-600 text-white py-2 px-3 rounded-lg"
                  >
                    Remove Duplicates
                  </button>
                </div>
              </div>
            ) : (
              <p className="text-gray-500 dark:text-gray-400">
                No duplicates found.
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
};
