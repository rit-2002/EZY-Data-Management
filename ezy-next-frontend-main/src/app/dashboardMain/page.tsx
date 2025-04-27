'use client';
import React from 'react';
import { useTheme } from "../context/ThemeContext";
import ProtectedRoute from '../components/ProtectedRoute';
import ResponsiveContainer from "../components/ResponsiveContainer";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  RadialLinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import UploadedFiles from './UploadedFiles';
import TotalIntegrations from './TotalIntegrations';
import NotificationsCard from './NotificationsCard';

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  RadialLinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const DashboardMain = () => {
  const { isDarkMode } = useTheme();

  return (
    <ProtectedRoute>
      <ResponsiveContainer>
        <div className={`min-h-dvh max-w-[1400px] mx-auto px-4 ${isDarkMode ? "text-white" : "text-black"}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-5">

            <div className="col-span-1 lg:col-span-2">
              <UploadedFiles />
            </div>

            <div className="col-span-1 lg:col-span-3">
              <TotalIntegrations />
            </div>

            <div className="col-span-1 md:col-span-2 lg:col-span-5">
              <NotificationsCard />
            </div>

          </div>
        </div>
      </ResponsiveContainer>
    </ProtectedRoute>
  );
};

export default DashboardMain;
