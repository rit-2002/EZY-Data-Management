"use client";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import ProtectedRoute from "../components/ProtectedRoute";
import ResponsiveContainer from "../components/ResponsiveContainer";
import Sidebar from "../components/Sidebar"; 

const Notifications = () => {
  const [clickedButton, setClickedButton] = useState("all");
  const [filterText, setFilterText] = useState("");
  const [groupBy, setGroupBy] = useState("weekly");
  const [selectedContent, setSelectedContent] = useState("all");
  const [notifications, setNotifications] = useState([]);
  const { isDarkMode } = useTheme();
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await fetch(
          `https://ezy-api-service-dev-498807929429.us-central1.run.app/api/v1/notifications/user_notifications`,
          {
            method: "GET",
            headers: {
              accept: "application/json",
            },
            credentials: "include", 
          }
        );

        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data)) {
            setNotifications(data);
            const unreadNotifications = data.filter(notification => !notification.read);
            setUnreadCount(unreadNotifications.length);
          } else {
            console.error("Unexpected response format:", data);
            setNotifications([]);
          }
        } else {
          console.error(`Error: ${response.status} ${response.statusText}`);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

 
  const markAsRead = async (notificationId) => {
    try {
      await fetch(
        `https://ezy-api-service-dev-498807929429.us-central1.run.app/api/v1/notifications/read/${notificationId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", 
        }
      );

      setNotifications((prevNotifications) =>
        prevNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, read: true }
            : notification
        )
      );

      setUnreadCount((prevCount) => prevCount - 1);
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const response = await fetch(
        `https://ezy-api-service-dev-498807929429.us-central1.run.app/api/v1/notifications/read-all`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) => ({
            ...notification,
            read: true,
          }))
        );
        setUnreadCount(0);
      } else {
        console.error(`Error: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    }
  };

  const filteredNotifications = Array.isArray(notifications)
    ? notifications
        .filter((notification) => {
          const matchesText = notification.message
            .toLowerCase()
            .includes(filterText.toLowerCase());
          const matchesType =
            clickedButton === "all" ||
            (clickedButton === "unread" && !notification.read);
          return matchesText && matchesType;
        })
        .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)) 
    : [];

  const handleClick = (button) => {
    setClickedButton(button);
    setSelectedContent(button);
  };

  const handleFilterChange = (event) => {
    setFilterText(event.target.value);
  };

  const handleGroupByChange = (event) => {
    setGroupBy(event.target.value);
  };

  return (
    <ProtectedRoute>
      <Sidebar unreadCount={unreadCount} /> {/* Pass unreadCount as a prop */}
      <ResponsiveContainer>
       
        <div className="flex flex-wrap gap-4 mb-6 items-center">
          <button
            className={`${
              clickedButton === "all"
                ? "bg-[#808486] text-white"
                : "bg-[#F6F8FA] text-gray-800"
            } hover:bg-[#1E6BA1] font-bold py-2 px-4 rounded border border-gray-400 w-full md:w-auto`}
            onClick={() => handleClick("all")}
          >
            All
          </button>
          <button
            className={`${
              clickedButton === "unread"
                ? "bg-[#808486] text-white"
                : "bg-[#F6F8FA] text-gray-800"
            } hover:bg-[#1E6BA1] font-bold py-2 px-4 rounded border border-gray-400 w-full md:w-auto`}
            onClick={() => handleClick("unread")}
          >
            Unread
          </button>
          <button
            className="bg-[#F6F8FA] text-gray-800 hover:bg-[#1E6BA1] font-bold py-2 px-4 rounded border border-gray-400 w-full md:w-auto"
            onClick={markAllAsRead}
          >
            Mark All as Read
          </button>

          <input
            type="text"
            placeholder="Filter notifications"
            value={filterText}
            onChange={handleFilterChange}
            className="flex-1 min-w-[200px] md:w-auto py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-[#1E6BA1] transition"
          />

          <div className="flex items-center ml-5">
            <label
              htmlFor="groupBy"
              className={`font-bold ${
                isDarkMode ? "text-gray-300" : "text-gray-700"
              } mr-2`}
            >
              Group by:
            </label>
            <select
              id="groupBy"
              value={groupBy}
              onChange={handleGroupByChange}
              className="py-2 px-4 border border-gray-300 rounded focus:outline-none focus:border-[#1E6BA1] transition"
            >
              <option value="weekly">Weekly</option>
              <option value="last10days">Last 10 days</option>
            </select>
          </div>
        </div>

       
        <div
          className={`border ${
            isDarkMode
              ? "border-gray-700 bg-gray-800"
              : "border-gray-300 bg-white"
          } rounded p-6 shadow-lg`}
        >
          <h2
            className={`text-xl font-bold mb-2 ${
              isDarkMode ? "text-white" : "text-gray-800"
            }`}
          >
            {clickedButton === "all"
              ? "All Notifications"
              : "Unread Notifications"}
          </h2>
          {filteredNotifications.length > 0 ? (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`mb-4 pt-4 border-t ${
                  isDarkMode ? "border-gray-700" : "border-gray-300"
                }`}
              >
                <p
                  className={`${isDarkMode ? "text-white" : "text-gray-800"} ${
                    notification.read ? "" : "font-bold"
                  }`}
                >
                  {notification.message}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(notification.timestamp).toLocaleString()}
                </p>
                {!notification.read && (
                  <button
                    className="text-blue-500 hover:underline text-sm"
                    onClick={() => markAsRead(notification.id)}
                  >
                    Mark as read
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className={`${isDarkMode ? "text-gray-400" : "text-gray-600"}`}>
              No notifications found.
            </p>
          )}
        </div>
      </ResponsiveContainer>
    </ProtectedRoute>
  );
};

export default Notifications;
