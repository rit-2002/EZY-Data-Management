import React from 'react';
import Link from 'next/link';
import { FaChartBar, FaList, FaSearchPlus, FaBroom, FaCheckCircle } from 'react-icons/fa';

const menuItems = [
  { label: 'Data Quality Score', href: '/data-quality-score', icon: FaChartBar },
  { label: 'Data Quality Rules', href: '/data-quality-rules', icon: FaList },
  { label: 'Data Profiling', href: '/data-profiling', icon: FaSearchPlus },
  { label: 'Data Cleansing', href: '/data-cleansing', icon: FaBroom },
  { label: 'Data Validation', href: '/data-validation', icon: FaCheckCircle },
];

const DataQualitySidePanel: React.FC = () => {
  return (
    <div className="py-2 px-2 bg-white rounded-md shadow-sm">
      <ul className="space-y-1">
        {menuItems.map((item, index) => (
          <li key={index}>
            <Link 
              href={item.href}
              className="flex items-center py-2 px-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-md transition-colors duration-150 ease-in-out"
            >
              <item.icon className="w-4 h-4 mr-2" />
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DataQualitySidePanel;
