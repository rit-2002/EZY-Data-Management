'use client';
import React, { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';
import Script from 'next/script'; 
const GlobalChat = () => {
  const { isDarkMode } = useTheme();
  const [isMounted, setIsMounted] = useState(false);  
  useEffect(() => {
    setIsMounted(true);
  }, []);

 
  if (!isMounted) {
    return null;
  }
  

  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 `}  
    >
     
      <Script
        src="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/df-messenger.js"
        strategy="afterInteractive"  
      />

      
      <link
        rel="stylesheet"
        href="https://www.gstatic.com/dialogflow-console/fast/df-messenger/prod/v1/themes/df-messenger-default.css"
      />

    
      <df-messenger
        project-id="starxi-26576"
        agent-id="5b6f71f9-ea34-4229-b850-36859bfd0168"
        language-code="en"
        max-query-length="-1"
      >
        <df-messenger-chat-bubble chat-title="EZY-BOT"></df-messenger-chat-bubble>
      </df-messenger>

      
      <style>
        {`
          df-messenger {
            z-index: 999;
            position: fixed;
            --df-messenger-font-color: ${isDarkMode ? '#e0e0e0' : '#000'}; /* Font color */
            --df-messenger-font-family: 'Google Sans';
            --df-messenger-chat-background: ${isDarkMode ? '#2d3748' : '#FFFFFF'}; /* bg-gray-800 equivalent */
            --df-messenger-message-user-background: ${isDarkMode ? '#1E293B' : '#dbeafe'}; /* Dark: bg-slate-800, Light: bg-blue-100 */
            --df-messenger-message-bot-background: ${isDarkMode ? '#334155' : '#f8fafc'}; /* Dark: bg-slate-700, Light: bg-gray-50 */
            --df-messenger-input-box-background: ${isDarkMode ? '#2d3748' : '#FFFFFF'}; /* Dark: custom, Light: bg-gray-200 */
            
            bottom: 16px;
            right: 16px;
          }
        `}
      </style>
    </div>
  );
};

export default GlobalChat;
