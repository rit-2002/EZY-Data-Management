import React, { useEffect, useState } from "react";
import { useTheme } from "../context/ThemeContext";
import { toast } from "react-toastify";
import Link from "next/link";

const NotificationsCard = () => {
    const { isDarkMode } = useTheme();
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(false);

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
                setNotifications(data);
            } else {
                console.error(`Error: ${response.status} ${response.statusText}`);
            }
        } catch (error) {
            console.error("Error fetching notifications:", error);
        }
    };

    useEffect(() => {
        setLoading(true);
        fetchNotifications().finally(() => setLoading(false));
    }, []);

    return (
        <div
            className={`${isDarkMode ? "bg-gray-950 text-white border-gray-800" : "bg-white"} border border-gray-300 rounded-lg shadow p-5 w-full`}
        >
            <div className="space-y-3">
                <div className="bg-[#166BA0] dark:bg-[#0a1b42] py-3 w-full rounded-2xl">
                    <Link href='/notification'>
                        <h1 className="text-white text-center text-xl">Notifications</h1>
                    </Link>
                </div>

                <div className="flex flex-wrap justify-center items-center gap-4 overflow-hidden">
                    <div className="w-full mx-auto pb-1">
                        {loading ? (
                            <p>Loading notifications...</p>
                        ) : notifications.length > 0 ? (
                            notifications.slice(0, 5).map((notification) => (
                                <div
                                    key={notification.id}
                                    className={`${isDarkMode ? "bg-gray-900" : "bg-white"} shadow-xl w-full rounded-xl p-4 mb-4`}
                                >
                                    <p className="font-bold">{notification.message}</p>
                                    <p className="text-sm opacity-60">
                                        {new Date(notification.timestamp).toLocaleString()}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-center">No notifications found.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotificationsCard;
