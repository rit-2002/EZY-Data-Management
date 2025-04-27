"use client";
import React, { useState } from 'react';


const StartChatComponent: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(true);

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <>
      {isChatOpen && (
        <main className="relative flex flex-col pt-96 text-xl text-center text-white bg-white rounded-xl max-w-[363px] mx-auto">

          <button
            className="absolute top-2 left-2 text-black text-3xl font-bold cursor-pointer"
            onClick={handleCloseChat}
            aria-label="Close chat"
          >
            ✖
          </button>

          <button className="overflow-hidden px-16 py-6 w-full bg-blue-600 rounded-none">
            Start Chat
          </button>
        </main>
      )}
    </>
  );
};

export default StartChatComponent;
