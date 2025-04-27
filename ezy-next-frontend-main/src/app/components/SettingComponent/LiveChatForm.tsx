"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface LiveChatFormProps {
  title: string;
  formLabel: string;
}

const LiveChatForm: React.FC<LiveChatFormProps> = ({ title, formLabel }) => {
  const [isChatOpen, setIsChatOpen] = useState(true);
  const router = useRouter();

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  const navigateToContactForm = () => {
    router.push('/contact');
  };

  return (
    <>
      {isChatOpen && (
        <main className="relative flex overflow-hidden flex-col items-center px-10 py-12 text-black bg-white max-w-[403px] rounded-[50px] shadow-lg">

          <button
            className="absolute top-4 left-4 text-black text-3xl font-bold cursor-pointer"
            onClick={handleCloseChat}
            aria-label="Close chat"
          >
            ✖
          </button>

          <h1 className="text-3xl font-bold mb-8">{title}</h1>

          <div className="flex flex-col space-y-4 w-full">
            <button
              className="w-full px-8 py-5 text-xl font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 transition duration-300" // Increased padding and font size
              onClick={() => alert('Live Chat clicked!')}
            >
              Live Chat
            </button>


            <button
              className="w-full px-8 py-5 text-xl font-semibold text-black bg-gray-200 rounded-md hover:bg-gray-300 transition duration-300" // Increased padding and font size
              onClick={navigateToContactForm}
            >
              Form
            </button>
          </div>
        </main>
      )}
    </>
  );
};

export default LiveChatForm;
