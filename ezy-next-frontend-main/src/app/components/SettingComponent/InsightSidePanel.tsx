import React from 'react';
import Link from 'next/link';

const SidePanel1 = () => {
  return (
    <div className="bg-white w-[300px] h-screen fixed top-[116px] left-0">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="bg-gray-300 rounded-full h-10 w-10 flex items-center justify-center text-gray-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 0114 0H0z"
                />
              </svg>
            </span>
            <span className="ml-3 text-lg font-medium text-gray-900">CMO</span>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 cursor-pointer"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </div>

        <nav className="mt-6">
          <Link href="#">
            <span className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
              CMO Dashboard
            </span>
          </Link>
          <Link href="#">
            <span className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
              Performance Report
            </span>
          </Link>
          <Link href="#">
            <span className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
              Channel Performance
            </span>
          </Link>
          <Link href="#">
            <span className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
              Sales Cycle
            </span>
          </Link>
          <Link href="#">
            <span className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
              Break-Event Cohort
            </span>
          </Link>

          <div>
            <span className="flex items-center justify-between w-full py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
              <span>Marketing Ops</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </span>
            <ul className="pl-6">
              <li>
                <Link href="#">
                  <span className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
                    Marketing Ops Item 1
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <span className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
                    Marketing Ops Item 2
                  </span>
                </Link>
              </li>
              <li>
                <Link href="#">
                  <span className="block py-2 px-4 text-gray-700 hover:bg-gray-200 rounded">
                    Marketing Ops Item 3
                  </span>
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SidePanel1;