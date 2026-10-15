import React from "react";
import { Outlet } from "react-router-dom";
import TopBar from "@/components/site/TopBar";
import Navbar from "@/components/site/Navbar";
import Footer from "@/components/site/Footer";

export default function SiteLayout() {
  return (
    <div className="bg-white min-h-screen flex flex-col">
      <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-[60] focus:bg-yellow focus:px-4 focus:py-2">Skip to content</a>
      <TopBar />
      <Navbar />
      <div id="main" className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
}