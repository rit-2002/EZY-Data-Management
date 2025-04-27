"use client";
import React, { useState } from "react";
import Image from "next/image";
import { AiOutlineUp } from "react-icons/ai";
import bgImage from "../ai_generated/aiImg.png";
import EzyGPT from "../ai_generated/EZYGPT.png";
import AiNavbar from "../ai_nav";
import AiSidebar from "../AiSidebar";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Dashboard() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const buttonTexts = ["Lead", "Opportunity", "Sales cycle", "Web analytics"];

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <ProtectedRoute>
    <div className="main">
      
      <AiNavbar />

    
      <AiSidebar toggleSidebar={toggleSidebar} isCollapsed={isCollapsed} />

   
      <div
        className={`transition-all duration-300 ${
          isCollapsed ? "ml-10" : "ml-20"
        }`}
      >
        <div
          className="flex min-h-screen items-center justify-center"
          style={{
            backgroundImage: `url(${bgImage.src})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            position: "fixed",
            top: 30,
            left: 25,
            right: 0,
            bottom: 0,
            zIndex: -1,
          }}
        />

        <div className="flex flex-col flex-grow justify-center mt-10 items-center px-4 md:px-8">
       
          <div className="w-64 md:w-80 lg:w-96 h-auto mb-8">
            <Image
              src={EzyGPT}
              alt="EZY GPT Logo"
              layout="responsive"
              objectFit="contain"
            />
          </div>

          <div className="mt-6">
          <p className="text-white text-sm md:text-base text-center mb-4">
            Your Personalized AI-powered Business Growth Assistant
          </p>
          <p className="text-white text-2xl md:text-4xl font-bold text-center mb-10">
            How can I help you today?
          </p>
          </div>

         
          <div className="flex flex-wrap gap-4 justify-center mt-6">
            {buttonTexts.map((text) => (
              <button
                key={text}
                className="bg-transparent text-white px-4 md:px-6 py-2 rounded-md border border-blue-700 shadow-md hover:shadow-lg hover:bg-blue-700 transition"
              >
                {text}
              </button>
            ))}
          </div>

         
          <div className="mt-4 pr-8 flex items-center shadow-md rounded-xl px-6 py-2 w-full max-w-3xl relative bg-white/20">
            <input
              type="text"
              placeholder="Ask Me Anything............"
              className="flex-grow outline-none text-white px-4 bg-transparent placeholder-white text-sm md:text-base"
            />
            <button className="absolute right-4 text-white text-xl hover:text-blue-400 transition">
              <AiOutlineUp />
            </button>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  );
}
