import React, { useCallback, useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { fetchAllDataAPI } from "../api/datamanagementAPI";
import { PiFileCsvDuotone } from "react-icons/pi";
import { PiFileXlsDuotone } from "react-icons/pi";
import { BsFiletypeXlsx } from "react-icons/bs";
import { FiDownload } from "react-icons/fi";
import { CiFileOn } from "react-icons/ci";
import Link from "next/link";
import { getCleaningFileApi } from "../api/datacleanAPI";

const UploadedFiles = () => {
  const { isDarkMode } = useTheme();

  const [loading, setLoading] = useState(false);
  const [allData, setAllData] = useState([])
  const [cleaningFiles, setCleaningFiles] = useState([]);

  const fetchAllData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await fetchAllDataAPI();
      setAllData(response);
    } catch {
      setAllData([]);
    } finally {
      setLoading(false);
    }
  }, [fetchAllDataAPI]);

  const getCleaningFile = async () => {
    setLoading(true);

    try {
      const response = await getCleaningFileApi();
      setCleaningFiles(response);
    } catch {
      setCleaningFiles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDataConcurrently = async () => {
      await Promise.all([
        fetchAllData(),
        getCleaningFile()
      ])
    }

    fetchDataConcurrently()
  }, [])

  const recentUploadedFiles = allData
    .slice()
    .sort((a, b) => new Date(b.Last_updated).getTime() - new Date(a.Last_updated).getTime())
    .slice(0, 3)

  const recentCleanedFiles = cleaningFiles
    .slice()
    .sort((a, b) => new Date(b.Last_updated).getTime() - new Date(a.Last_updated).getTime())
    .slice(0, 3)

  const getFileName = (filename) => {
    const dotIndex = filename.lastIndexOf(".")
    return dotIndex !== -1 ? filename.substring(0, dotIndex) : filename
  }

  const getFileExtension = (filename) => {
    const dotIndex = filename.lastIndexOf(".")
    return dotIndex !== -1 ? filename.substring(dotIndex + 1) : ""
  }

  return (
    <div className="flex flex-col gap-5">
      <div
        className={`${isDarkMode ? "bg-gray-950 text-white border-gray-800" : "bg-white"} border border-gray-300 rounded-lg shadow p-5 w-full`}
      >
        <div className="space-y-4">
          <div className="bg-[#166BA0] dark:bg-[#0a1b42] py-3 w-full rounded-2xl">
            <Link href='/data_management'>
              <h1 className="text-white text-center text-xl">Uploaded Files</h1>
            </Link>
          </div>

          {loading ? (
            <p className="text-center">Loading files...</p>
          ) : recentUploadedFiles.length > 0 ? (
            recentUploadedFiles.map((file) => (
              <div
                key={file.filename}
                className={`${isDarkMode ? "bg-gray-900" : "bg-white"
                  } shadow-xl w-full rounded-xl flex justify-between items-center p-4 cursor-pointer transition-colors duration-200`}
              >
                <div className="flex gap-3 items-center">
                  <div className="text-4xl">
                    {
                      getFileExtension(file.filename) === 'csv' ? (
                        <PiFileCsvDuotone />
                      ) : getFileExtension(file.filename) === 'xls' ? (
                        <PiFileXlsDuotone />
                      ) : getFileExtension(file.filename) === 'xlsx' ? (
                        <BsFiletypeXlsx />
                      ) : <CiFileOn />
                    }
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">{getFileName(file.filename)}</h2>
                    <p className="text-sm opacity-60">
                      {new Date(file.Last_updated).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className={`${isDarkMode ? " hover:bg-gray-800 hover:text-yellow-300" : " hover:bg-gray-100 hover:text-blue-500"
                  } hover:translate-y-1 rounded-xl p-3 text-3xl cursor-pointer transition-all duration-500`}>
                  <a
                    href={file.file_url}
                    target="_self"
                    rel="noopener noreferrer"
                    className=""
                  >
                    <FiDownload />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No files found.</p>
          )}
        </div>
      </div>

      <div
        className={`${isDarkMode ? "bg-gray-950 text-white border-gray-800" : "bg-white"} border border-gray-300 rounded-lg shadow p-5 w-full`}      >
        <div className="space-y-4">
          <div className="bg-[#166BA0] dark:bg-[#0a1b42] py-3 w-full rounded-2xl">
            <Link href='/data_management'>
              <h1 className="text-white text-center text-xl">Cleaned Files</h1>
            </Link>
          </div>

          {loading ? (
            <p className="text-center">Loading files...</p>
          ) : recentCleanedFiles.length > 0 ? (
            recentCleanedFiles.map((file) => (
              <div
                key={file.filename}
                className={`${isDarkMode ? "bg-gray-900" : "bg-white"
                  } shadow-xl w-full rounded-xl flex justify-between items-center p-4 cursor-pointer transition-colors duration-200`}
              >
                <div className="flex gap-3 items-center">
                  <div className="text-4xl">
                    {
                      getFileExtension(file.filename) === 'csv' ? (
                        <PiFileCsvDuotone />
                      ) : getFileExtension(file.filename) === 'xls' ? (
                        <PiFileXlsDuotone />
                      ) : getFileExtension(file.filename) === 'xlsx' ? (
                        <BsFiletypeXlsx />
                      ) : <CiFileOn />
                    }
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">{getFileName(file.filename)}</h2>
                    <p className="text-sm opacity-60">
                      {new Date(file.Last_updated).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className={`${isDarkMode ? " hover:bg-gray-800 hover:text-yellow-300" : " hover:bg-gray-100 hover:text-blue-500"
                  } hover:translate-y-1 rounded-xl p-3 text-3xl cursor-pointer transition-all duration-500`}>
                  <a
                    href={file.file_url}
                    target="_self"
                    rel="noopener noreferrer"
                    className=""
                  >
                    <FiDownload />
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">No files found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadedFiles;