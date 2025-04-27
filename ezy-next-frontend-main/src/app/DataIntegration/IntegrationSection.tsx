import React, { memo } from "react";
import { DataTable } from "./DataTable";
import { SearchBar } from "./SearchBar";

interface IntegrationSectionProps {
    integrationLabel: string;
    data: any[];
    activeTable: string;
    setActiveTable: (table: "table1" | "table2") => void;
    searchTerm: string;
    setSearchTerm: (value: string) => void;
    fetchUserData: () => void;
    filteredAccountsData: (integration: string) => any[];
}

const IntegrationSectionComponent: React.FC<IntegrationSectionProps> = ({
    integrationLabel,
    data,
    activeTable,
    setActiveTable,
    searchTerm,
    setSearchTerm,
    fetchUserData,
    filteredAccountsData,
}) => {
    if (!data || data.length === 0) return null;

    return (
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            {/* Tabs */}
            <div className="flex justify-center items-center">
                <div className="flex flex-wrap justify-center gap-2 sm:gap-4 md:space-x-6">
                    <button
                        onClick={() => setActiveTable("table1")}
                        className={`px-6 py-2 rounded-t-lg font-semibold text-sm transition-all duration-300 ${activeTable === "table1"
                            ? "text-[#1C6BA0] dark:text-blue-400 border-b-4 border-[#1C6BA0]"
                            : "text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                            }`}
                    >
                        Accounts
                    </button>
                    <button
                        onClick={() => setActiveTable("table2")}
                        className={`px-6 py-2 rounded-t-lg font-semibold text-sm transition-all duration-300 ${activeTable === "table2"
                            ? "text-[#1C6BA0] dark:text-blue-400 border-b-4 border-[#1C6BA0]"
                            : "text-gray-600 dark:text-gray-400 hover:text-blue-500 dark:hover:text-blue-400"
                            }`}
                    >
                        Integrations
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="relative border-t border-gray-200 dark:border-gray-700 pt-6">
                <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {activeTable === "table1"
                            ? ` ${integrationLabel} Accounts Details`
                            : ` ${integrationLabel} Integration Details`}
                    </h2>
                    <SearchBar
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        activeTable={activeTable}
                    />
                </div>
                <DataTable
                    activeTable={activeTable}
                    searchTerm={searchTerm}
                    fetchUserData={fetchUserData}
                    accountsData={filteredAccountsData(integrationLabel)}
                />
            </div>
        </div>
    );
};

export const IntegrationSection = memo(IntegrationSectionComponent);