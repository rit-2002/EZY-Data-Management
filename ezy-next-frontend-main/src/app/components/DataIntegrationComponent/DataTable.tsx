"use client";
import { useState } from "react";
import { AiOutlineExclamationCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { MdWifi, MdWifiOff, MdErrorOutline } from "react-icons/md";
import Image from 'next/image';

const Companies = () => {
  const companies = [

    { srNo: 1, companyName: 'AMAZON', companyLogo: 'AMAZON', guide: 'guide4' },
  ];

  return (
    <div className="container mx-auto">
      <h1 className="text-2xl font-semibold text-center my-4 text-gray-900 dark:text-white">Integration</h1>
      <table className="w-full table-auto text-sm text-left text-gray-500 dark:text-gray-300">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            <th className="px-4 py-2">Sr.No</th>
            <th className="px-4 py-2">Company Name</th>
            <th className="px-4 py-2">Company Logo</th>
            <th className="px-4 py-2">Guide</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((company) => (
            <tr key={company.srNo} className="border-t dark:border-gray-700">

              <td className="px-4 py-2">{company.srNo}</td>
              <td className="px-4 py-2">{company.companyName}</td>
              <td className="px-4 py-2">
                <Image
                  src={`/images/${company.companyLogo}.png`}
                  alt={company.companyName}
                  width={32}
                  height={32}
                  className="h-8 w-auto"
                />
              </td>

              <td className="px-4 py-2">

                <a href={company.guide} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline dark:text-blue-400">

                  Guide
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const SquareComponent = () => {
  const [productionData] = useState({ value: 8, percentage: 25 });
  const [dataSourceData] = useState({ value: 20, percentage: 75 });

  const [lastIncident] = useState({ date: 'Jun 10, 2024', time: '9:41 AM', ago: '34 min ago' });
  const [lastChecked] = useState({ date: 'Jun 10, 2024', time: '9:41 AM', ago: '34 min ago' });
  const [data] = useState([
    { srNo: 1, name: "Accountxyz-10101", connectionStatus: "Live", lastSyncTimestamp: "Now" },
    { srNo: 2, name: "Accountxyz-1020", connectionStatus: "off", lastSyncTimestamp: "5 min" },
    { srNo: 3, name: "Accountxyz-1030", connectionStatus: "off", lastSyncTimestamp: "2hr" },
    { srNo: 4, name: "Accountxyz-1010341", connectionStatus: "Failed", lastSyncTimestamp: "20 min" },
    { srNo: 5, name: "Accountxyz-104561", connectionStatus: "Live", lastSyncTimestamp: "Now" },
  ]);
  const [showCompanies, setShowCompanies] = useState(false);

  const handleAddIntegrationClick = () => setShowCompanies((prev) => !prev);

  const CircularProgress = ({ percentage, color }) => {
    const circleCircumference = 2 * Math.PI * 40;
    const offset = circleCircumference - (percentage / 100) * circleCircumference;
    return (
      <svg width="80" height="80" viewBox="0 0 100 100" className="relative">
        <circle cx="50" cy="50" r="40" stroke="lightgray" strokeWidth="10" fill="none" />
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke={color}
          strokeWidth="10"
          fill="none"
          strokeDasharray={circleCircumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />

        <text x="50" y="55" textAnchor="middle" className="text-xl font-bold fill-gray-700 dark:fill-gray-200">{percentage}%</text>
      </svg>
    );
  };

  const liveIconStyle = "animate-pulse text-green-500 text-2xl";
  const offIconStyle = "text-red-500 text-2xl";
  const failedIconStyle = "text-yellow-500 text-2xl";

  const getConnectionStatusIcon = (status) => {
    switch (status) {
      case "Live":
        return <MdWifi className={liveIconStyle} />;
      case "off":
        return <MdWifiOff className={offIconStyle} />;
      case "Failed":
        return <MdErrorOutline className={failedIconStyle} />;
      default:
        return null;
    }

  };

  return (

    <div className="container  p-2 sm:p-4  bg-gray-50 dark:bg-gray-900 md:pl-4 overflow-x-hidden max-w-full"> {/* Ensure max width is full */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="bg-white dark:bg-gray-800  rounded-lg shadow-md  p-4">
          <div className="font-bold text-lg text-blue-500 dark:text-blue-400  mb-2">Production</div>

          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{productionData.value}</div>
            <CircularProgress percentage={productionData.percentage} color="red" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="font-bold text-lg text-blue-500 dark:text-blue-400 mb-2">Data Source</div>
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-900 dark:text-white">{dataSourceData.value}</div>
            <CircularProgress percentage={dataSourceData.percentage} color="blue" />
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center">
          <AiOutlineExclamationCircle className="text-red-500 text-3xl " />
          <div>
            <div className="font-bold text-lg text-blue-500 dark:text-blue-400 mb-2">Last Incident</div>
            <div className="flex justify-between items-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">{lastIncident.date}</div>
              <div className="text-lg font-bold ml-4 text-gray-900 dark:text-white">{lastIncident.time}</div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{lastIncident.ago}</div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex items-center">
          <AiOutlineCheckCircle className="text-green-500 text-3xl mr-4" />
          <div>
            <div className="font-bold text-lg text-blue-500 dark:text-blue-400 mb-2">Last Checked</div>
            <div className="flex justify-between items-center">
              <div className="text-lg font-bold text-gray-900 dark:text-white">{lastChecked.date}</div>
              <div className="text-lg font-bold ml-4 text-gray-900 dark:text-white">{lastChecked.time}</div>
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">{lastChecked.ago}</div>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto mb-4 text-left">
        <table className="min-w-full table-auto text-sm text-left text-gray-500 dark:text-gray-300">
          <thead className="bg-gray-100 dark:bg-gray-800">
            <tr>
              <th className="px-2 py-2 w-1/12 md:w-1/6">Sr.No</th>
              <th className="px-2 py-2 w-3/12 md:w-1/4">Account</th>
              <th className="px-2 py-2 w-2/12 md:w-1/6">Status</th>
              <th className="px-2 py-2 w-2/12 md:w-1/4">Last Sync</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item.srNo} className="border-t dark:border-gray-700">
                <td className="px-2 py-2 truncate">{item.srNo}</td>
                <td className="px-2 py-2 truncate">{item.name}</td>
                <td className="px-2 py-2 truncate">{getConnectionStatusIcon(item.connectionStatus)}</td>
                <td className="px-2 py-2 truncate">{item.lastSyncTimestamp}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center">
        <button
          className="w-full sm:w-auto mt-4 py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white rounded-lg focus:outline-none"
          onClick={handleAddIntegrationClick}
        >
          {showCompanies ? 'Hide Integration' : 'Add Integration'}
        </button>
      </div>



      {showCompanies && <Companies />}
    </div>
  );
};


export default SquareComponent;

