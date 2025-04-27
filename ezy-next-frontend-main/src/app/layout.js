import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ActiveTabProvider } from './context/ActiveTabContext'
import { SidebarProvider } from './context/SidebarContext'
import Layout from "./components/Layout";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ezy-Metrics",
  description: "Next Generation Data Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider>
            <ActiveTabProvider>
              <SidebarProvider>
                <Layout>
                  {children}
                </Layout>
              </SidebarProvider>
            </ActiveTabProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
