"use client";
import React, { useState } from "react";
import { FaTwitter, FaReddit, FaDiscord } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "../components/ProtectedRoute";
import Icon from "../components/ThemeComponent/Icon";
import ResponsiveContainer from "../components/ResponsiveContainer";
import SearchBar from "../HelpSupport/SearchBar";
import ContactUsButton from "../HelpSupport/ContactUs";
import ViewMoreButton from "../HelpSupport/ViewMoreButton";

const SupportPage: React.FC = () => {
  const { isDarkMode } = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItem, setSelectedItem] = useState<SupportCardProps | null>(null);

  const handleViewMore = (item: SupportCardProps) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  // Filtered items based on the search term
  const filteredItems = supportItems.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <ResponsiveContainer>
        <section className="px-4 sm:px-6 md:px-8 lg:px-10">
          <h1
            className={`text-3xl font-semibold mb-6 ${isDarkMode ? "text-gray-100" : "text-gray-900"} text-center`}
          >
            How can we help you?
          </h1>

          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <ContactUsButton />

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
            {filteredItems.map((item) => (
              <SupportCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                detailedDescription={item.detailedDescription}
                onViewMore={() => handleViewMore(item)}
              />
            ))}
          </div>
        </section>

        {selectedItem && (
          <div
            className="fixed z-50 inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10"
            aria-hidden={!selectedItem}
            style={{ overflow: "hidden" }}
          >
            <div
              className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 w-full max-w-md mx-4 sm:mx-6 md:mx-8 lg:mx-10"
              style={{
                maxHeight: "90vh",
                overflowY: "scroll",
                scrollbarWidth: "none",
                msOverflowStyle: "none",
              }}
            >
              <style>
                {`
                  ::-webkit-scrollbar {
                    display: none;
                  }
                `}
              </style>
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedItem.title}
                </h3>
                <button onClick={handleCloseModal}>
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <p className="text-gray-700 dark:text-gray-300 mt-4 mb-6 text-justify">
                {selectedItem.detailedDescription.split('\n').map((line, index) => (
                  <span key={index}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
              <div className="flex justify-center">
                <button
                  onClick={handleCloseModal}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        <footer className="mt-8 text-center text-gray-500">
          <p>Other ways to find help:</p>
          <div className="flex justify-center gap-4 mt-2">
            <FaTwitter className="text-xl text-blue-400 hover:text-blue-500" />
            <FaReddit className="text-xl text-orange-500 hover:text-orange-600" />
            <FaDiscord className="text-xl text-indigo-600 hover:text-indigo-700" />
          </div>
        </footer>
      </ResponsiveContainer>
    </ProtectedRoute>
  );
};

const supportItems = [
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 100 100"
        className="size-12"
      >
        <path d="M39,32h22c1.1,0,2-0.9,2-2v-4c0-3.3-2.7-6-6-6H43c-3.3,0-6,2.7-6,6v4C37,31.1,37.9,32,39,32z" />
        <path d="M72,25h-2c-0.6,0-1,0.4-1,1v4c0,4.4-3.6,8-8,8H39c-4.4,0-8-3.6-8-8v-4c0-0.6-0.4-1-1-1h-2c-3.3,0-6,2.7-6,6 v43c0,3.3,2.7,6,6,6h44c3.3,0,6-2.7,6-6V31C78,27.7,75.3,25,72,25z M64.3,72.6l-1.3,1.3c-0.3,0.3-0.9,0.3-1.3,0l-8.1-8.1 c-2.3,1.6-5.2,2.5-8.4,2.1c-5.2-0.7-9.4-5.1-9.9-10.3c-0.7-7.2,5.4-13.4,12.6-12.6c5.3,0.5,9.6,4.6,10.3,9.9 c0.4,3.1-0.4,6.1-2.1,8.4l8.1,8.1C64.7,71.6,64.7,72.2,64.3,72.6z" />
        <path d="M46.9,48.5c-4.4,0-7.9,3.6-7.9,7.9c0,4.4,3.5,7.9,7.9,7.9c4.4,0,7.9-3.5,7.9-7.9 C54.8,52,51.3,48.5,46.9,48.5z" />
      </svg>
    )
    ,
    title: "Documentation",
    description: "Search and view customer profiles, transaction history, and associated data records.",
    detailedDescription: `
    Search and view customer profiles, transaction history, and associated data records.
    
    Getting Started
    1. Logging In: Go to your Confluence instance URL and log in with your credentials.
    2. Navigating the Interface: Familiarize yourself with the Confluence interface, including the dashboard, spaces, and pages.
    
    Creating and Editing Content
    1. Creating a Page: Click the "Create" button and select "Page" to create a new page.
    2. Editing a Page: Click the "Edit" button to edit an existing page.
    3. Adding Text and Media: Use the editor to add text, images, videos, and other media to your page.
    4. Formatting Text: Use the formatting options to change font, size, color, and alignment.
    
    Collaborating with Others
    1. Sharing a Page: Click the "Share" button to share a page with others.
    2. Adding Collaborators: Enter the names or email addresses of collaborators to add them to the page.
    3. Tracking Changes: Use the "Page History" feature to track changes made to the page.
    4. Commenting: Add comments to pages to discuss content with collaborators.
    
    Organizing Content
    1. Creating a Space: Click the "Create Space" button to create a new space.
    2. Adding Pages to a Space: Click the "Add Page" button to add a page to a space.
    3. Organizing Pages: Use labels, categories, and page trees to organize pages within a space.
    
    Advanced Features
    1. Using Macros: Use macros to add dynamic content, such as tables, charts, and images.
    2. Creating Templates: Create templates to standardize page layouts and content.
    3. Integrating with Other Tools: Integrate Confluence with other tools, such as Jira, Trello, and Slack.
    
    Troubleshooting
    1. Checking Page Permissions: Check page permissions to ensure collaborators have access.
    2. Resolving Conflicts: Resolve conflicts by merging changes or reverting to a previous version.
    3. Contacting Support: Contact Confluence support for assistance with technical issues.
    
    Best Practices
    1. Keep Pages Up-to-Date: Regularly review and update pages to ensure accuracy.
    2. Use Clear and Concise Language: Use clear and concise language to communicate effectively.
    3. Organize Content Logically: Organize content logically to make it easy to find.
    `.trim(),


    onViewMore: () => { }
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        viewBox="0 0 32 32"
        className="size-8"
      >
        <path d="M28,16v6H4V6H16V4H4A2,2,0,0,0,2,6V22a2,2,0,0,0,2,2h8v4H8v2H24V28H20V24h8a2,2,0,0,0,2-2V16ZM18,28H14V24h4Z" />
        <polygon points="21 15 16 10.04 17.59 8.47 21 11.85 28.41 4.5 30 6.08 21 15" />
      </svg>
    )
    ,
    title: "Tutorial",
    description: "Here's a sample step-by-step tutorial and documentation user guide",
    detailedDescription: `Getting Started
    Logging In: Go to your website's login page and enter your username and password.
    Navigating the Dashboard: Familiarize yourself with the dashboard, including the menu, widgets, and notifications.
    Creating and Editing Content
    Creating a New Page: Click the "Add New" button and select "Page" to create a new page.
    Editing a Page: Click the "Edit" button to edit an existing page.
    Adding Text and Media: Use the editor to add text, images, videos, and other media to your page.
    Customizing Your Website
    Changing the Theme: Go to the "Appearance" section and select a new theme.
    Customizing the Layout: Use the drag-and-drop layout builder to customize the layout of your pages.
    Adding Widgets: Add widgets to your sidebar or footer to display additional content.
    Managing Users and Settings
    Adding New Users: Go to the "Users" section and click the "Add New" button.
    Managing User Roles: Assign roles to users to control their access to different areas of the website.
    Configuring Settings: Go to the "Settings" section to configure general settings, such as the timezone and language.
    Troubleshooting
    Checking for Updates: Make sure your website and plugins are up-to-date.
    Clearing Cache: Clear the cache to resolve issues with page loading.
    Contacting Support: Contact support for further assistance.
    Frequently Asked Questions (FAQs)
    What is the difference between a page and a post?
    How do I add a new user?
    What are widgets and how do I use them?
    Glossary
    Theme: A pre-designed template that controls the layout and appearance of your website.
    Plugin: A software component that adds functionality to your website.
    Widget: A small block of content that can be added to a sidebar or footer.`.trim()

    ,
    onViewMore: () => { }
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        className="size-8"
      >
        <title>users</title>
        <path d="M16 21.416c-5.035 0.022-9.243 3.537-10.326 8.247l-0.014 0.072c-0.018 0.080-0.029 0.172-0.029 0.266 0 0.69 0.56 1.25 1.25 1.25 0.596 0 1.095-0.418 1.22-0.976l0.002-0.008c0.825-3.658 4.047-6.35 7.897-6.35s7.073 2.692 7.887 6.297l0.010 0.054c0.127 0.566 0.625 0.982 1.221 0.982 0.69 0 1.25-0.559 1.25-1.25 0-0.095-0.011-0.187-0.031-0.276l0.002 0.008c-1.098-4.78-5.305-8.295-10.337-8.316h-0.002zM9.164 11.102c0 0 0 0 0 0 2.858 0 5.176-2.317 5.176-5.176s-2.317-5.176-5.176-5.176c-2.858 0-5.176 2.317-5.176 5.176v0c0.004 2.857 2.319 5.172 5.175 5.176h0zM9.164 3.25c0 0 0 0 0 0 1.478 0 2.676 1.198 2.676 2.676s-1.198 2.676-2.676 2.676c-1.478 0-2.676-1.198-2.676-2.676v0c0.002-1.477 1.199-2.674 2.676-2.676h0zM22.926 11.102c2.858 0 5.176-2.317 5.176-5.176s-2.317-5.176-5.176-5.176c-2.858 0-5.176 2.317-5.176 5.176v0c0.004 2.857 2.319 5.172 5.175 5.176h0zM22.926 3.25c1.478 0 2.676 1.198 2.676 2.676s-1.198 2.676-2.676 2.676c-1.478 0-2.676-1.198-2.676-2.676v0c0.002-1.477 1.199-2.674 2.676-2.676h0zM31.311 19.734c-0.864-4.111-4.46-7.154-8.767-7.154-0.395 0-0.784 0.026-1.165 0.075l0.045-0.005c-0.93-2.116-3.007-3.568-5.424-3.568-2.414 0-4.49 1.448-5.407 3.524l-0.015 0.038c-0.266-0.034-0.58-0.057-0.898-0.063l-0.009-0c-4.33 0.019-7.948 3.041-8.881 7.090l-0.012 0.062c-0.018 0.080-0.029 0.173-0.029 0.268 0 0.691 0.56 1.251 1.251 1.251 0.596 0 1.094-0.417 1.22-0.975l0.002-0.008c0.684-2.981 3.309-5.174 6.448-5.186h0.001c0.144 0 0.282 0.020 0.423 0.029 0.056 3.218 2.679 5.805 5.905 5.805 3.224 0 5.845-2.584 5.905-5.794l0-0.006c0.171-0.013 0.339-0.035 0.514-0.035 3.14 0.012 5.765 2.204 6.442 5.14l0.009 0.045c0.126 0.567 0.625 0.984 1.221 0.984 0.69 0 1.249-0.559 1.249-1.249 0-0.094-0.010-0.186-0.030-0.274l0.002 0.008zM16 18.416c-0 0-0 0-0.001 0-1.887 0-3.417-1.53-3.417-3.417s1.53-3.417 3.417-3.417c1.887 0 3.417 1.53 3.417 3.417 0 0 0 0 0 0.001v-0c-0.003 1.886-1.53 3.413-3.416 3.416h-0z"></path>
      </svg>
    )

    ,
    title: "Manage Users",
    description: "Add, edit, and control user accounts and permissions for secure access.",
    detailedDescription: `For that type of information, please refer to Meta’s Privacy Center: https://www.facebook.com/privacy/center/`.trim()

    ,
    onViewMore: () => { }

  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="size-8"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M15.042 21.672 13.684 16.6m0 0-2.51 2.225.569-9.47 5.227 7.917-3.286-.672ZM12 2.25V4.5m5.834.166-1.591 1.591M20.25 10.5H18M7.757 14.743l-1.59 1.59M6 10.5H3.75m4.007-4.243-1.59-1.59"
        />
      </svg>
    ),
    title: "Open Issues",
    description: "Track and manage issues or system errors reported by users or detected by the system",
    detailedDescription: `Issue 1: Google Analytics Authentication
    - Description: Error authenticating with Google Analytics API
    - Reported By: John Doe
    - Date Reported: 2023-02-20
    - Status: In Progress
    - Assigned To: Jane Smith
    Issue 2: Data Retrieval Failure
    - Description: Failure to retrieve data from Google Analytics
    - Reported By: Bob Johnson
    - Date Reported: 2023-02-22
    - Status: Open
    - Assigned To: Unassigned
    Issue 3: MongoDB Connection Error
    - Description: Error connecting to MongoDB database
    - Reported By: Alice Brown
    - Date Reported: 2023-02-25
    - Status: In Progress
    - Assigned To: Mike Davis`.trim()

    ,
    onViewMore: () => { }
  },
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 32 32"
        fill="currentColor"
        className="size-8"
      >
        <path d="M24 0h-11c-1.104 0-2 0.895-2 2h11v8h8v16h-7v2h7c1.105 0 2-0.895 2-2v-18zM24 8v-5.172l5.171 5.172h-5.171zM2 4c-1.105 0-2 0.896-2 2v24c0 1.105 0.895 2 2 2h17c1.105 0 2-0.895 2-2v-18l-8-8.001h-11zM19 30h-17v-24h9v8h8v16zM13 12v-5.172l5.171 5.172h-5.171z"></path>
      </svg>
    )
    ,
    title: "Support Docs",
    description: " Quickly Access guides, FAQs, and video tutorials for all system features.",
    detailedDescription: "Detailed description for Manage Companies",
    onViewMore: () => { }
  }
  ,
  {
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 50 50"
        fill="currentColor"
        className="size-8"
      >
        <path d="M8 2L8 6L4 6L4 48L46 48L46 14L30 14L30 6L26 6L26 2 Z M 10 4L24 4L24 8L28 8L28 46L19 46L19 39L15 39L15 46L6 46L6 8L10 8 Z M 10 10L10 12L12 12L12 10 Z M 14 10L14 12L16 12L16 10 Z M 18 10L18 12L20 12L20 10 Z M 22 10L22 12L24 12L24 10 Z M 10 15L10 19L12 19L12 15 Z M 14 15L14 19L16 19L16 15 Z M 18 15L18 19L20 19L20 15 Z M 22 15L22 19L24 19L24 15 Z M 30 16L44 16L44 46L30 46 Z M 32 18L32 20L34 20L34 18 Z M 36 18L36 20L38 20L38 18 Z M 40 18L40 20L42 20L42 18 Z M 10 21L10 25L12 25L12 21 Z M 14 21L14 25L16 25L16 21 Z M 18 21L18 25L20 25L20 21 Z M 22 21L22 25L24 25L24 21 Z M 32 22L32 24L34 24L34 22 Z M 36 22L36 24L38 24L38 22 Z M 40 22L40 24L42 24L42 22 Z M 32 26L32 28L34 28L34 26 Z M 36 26L36 28L38 28L38 26 Z M 40 26L40 28L42 28L42 26 Z M 10 27L10 31L12 31L12 27 Z M 14 27L14 31L16 31L16 27 Z M 18 27L18 31L20 31L20 27 Z M 22 27L22 31L24 31L24 27 Z M 32 30L32 32L34 32L34 30 Z M 36 30L36 32L38 32L38 30 Z M 40 30L40 32L42 32L42 30 Z M 10 33L10 37L12 37L12 33 Z M 14 33L14 37L16 37L16 33 Z M 18 33L18 37L20 37L20 33 Z M 22 33L22 37L24 37L24 33 Z M 32 34L32 36L34 36L34 34 Z M 36 34L36 36L38 36L38 34 Z M 40 34L40 36L42 36L42 34 Z M 32 38L32 40L34 40L34 38 Z M 36 38L36 40L38 40L38 38 Z M 40 38L40 40L42 40L42 38 Z M 10 39L10 44L12 44L12 39 Z M 22 39L22 44L24 44L24 39 Z M 32 42L32 44L34 44L34 42 Z M 36 42L36 44L38 44L38 42 Z M 40 42L40 44L42 44L42 42Z"></path>
      </svg>
    )
    ,
    title: "Manage Companies",
    description: "Add, edit, and manage company profiles, settings, and associated data records.",
    detailedDescription: `| Company ID | Company Name | Industry | Status |
| --- | --- | --- | --- |
| 1 | ABC Inc. | Technology | Active |
| 2 | DEF Corp. | Finance | Inactive |
| 3 | GHI Ltd. | Healthcare | Active |

Company Details
- Company ID: 1
- Company Name: ABC Inc.
- Industry: Technology
- Status: Active
- Address: 123 Main St, Anytown, USA
- Phone: 555-555-5555
- Email: mailto:info@abcinc.com

Actions
- Edit Company: Update company information
- Delete Company: Remove company from list
- Add New Company: Create a new company entry

Filters
- Industry: Filter companies by industry
- Status: Filter companies by status
- Search: Search companies by name or ID`.trim()


    ,
    onViewMore: () => { }
  }
];


interface SupportCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  detailedDescription: string;
  onViewMore: () => void;
}

const SupportCard: React.FC<SupportCardProps> = ({
  icon,
  title,
  description,
  detailedDescription,
  onViewMore
}) => {
  const { isDarkMode } = useTheme();



  return (
    <div
      className={`${isDarkMode ? "bg-gray-700 text-gray-100 hover:bg-gray-800" : "bg-white  hover:bg-gray-200"
        } h-auto rounded-lg shadow-lg p-2 mx-2 flex flex-col items-center text-center 
  transition-transform transform hover:scale-110 hover:shadow-xl `}
    >

      <div
        className={`${isDarkMode ? "text-gray-100" : "text-gray-900"
          } text-4xl mb-4`}
      >
        {icon}
      </div>

      <div className="h-auto w-auto">
        <h3
          className={`${isDarkMode ? "text-gray-100" : "text-gray-900"
            } font-semibold text-lg`}
        >
          {title}
        </h3>
        <p className={`${isDarkMode ? "text-gray-400" : "text-gray-500"} mt-2`}>
          {description}
        </p>
      </div>


      <div className="mt-4">
        <button
          onClick={onViewMore}
          className="text-white bg-[#1C6BA0] hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-2xl text-sm px-3 py-1.5 text-center dark:bg-[#1C6BA0] dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          View More
        </button>
      </div>

    </div>
  );
};

export default SupportPage;
