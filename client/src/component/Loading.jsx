import React from "react";
import { CarFront } from "lucide-react";

const Loading = ({ small = false, message = "", fullPage = false }) => {
  // Small version for buttons or inline text
  if (small) {
    return (
      <div className="flex items-center justify-center gap-2">
        <span className="loading loading-spinner loading-sm"></span>
        {message && <span className="text-sm font-medium">{message}</span>}
      </div>
    );
  }

  // Full screen or section loader
  const containerClasses = fullPage
    ? "fixed inset-0 z-[9999] bg-white/90 backdrop-blur-md"
    : "w-full min-h-[400px] flex-1";

  return (
    <div className={`${containerClasses} flex flex-col justify-center items-center gap-6`}>
      <div className="relative flex flex-col items-center">
        {/* Animated Background Ring */}
        <div className="absolute -inset-4 animate-spin-slow opacity-20 border-t-4 border-primary rounded-full"></div>
        
        {/* Main Icon Container */}
        <div className="relative p-6 bg-white rounded-full shadow-2xl border border-gray-50 flex items-center justify-center">
          <CarFront className="size-16 primary-color animate-pulse" />
        </div>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-1">
          <span className="loading loading-dots loading-md text-primary"></span>
        </div>
        <p className="text-xl font-black tracking-[0.2em] primary-color uppercase animate-pulse">
          Safe Wheels
        </p>
        {message && (
          <p className="text-gray-500 font-medium animate-bounce mt-2">{message}</p>
        )}
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}} />
    </div>
  );
};

export default Loading;
