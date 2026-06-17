import React from 'react';

export const BormmLogo = ({ className = "" }: { className?: string }) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* 
        This uses the uploaded WhatsApp image
      */}
      <div className="w-48 h-24 md:w-64 md:h-32 relative">
        <img 
          src="/logo.jpeg" 
          alt="BORMM Logo" 
          className="w-full h-full object-contain"
        />
      </div>
    </div>
  );
}
