import React, { useState, useRef, useEffect } from 'react';

const SideCard = ({ interactionState }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);

  // Parallax effect on mouse move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  // Determine character expression based on state
  const getEyeStyle = () => {
    switch (interactionState) {
      case 'email':
        return 'h-4 w-4 bg-[#A7EBF2] shadow-[0_0_10px_#A7EBF2] scale-110';
      case 'password':
        return 'h-1 w-4 bg-[#A7EBF2] rotate-12 opacity-80';
      case 'typing':
        return 'h-3 w-3 bg-[#A7EBF2] animate-pulse';
      case 'submit':
        return 'h-4 w-4 bg-[#A7EBF2] shadow-[0_0_15px_#A7EBF2] scale-125';
      default:
        return 'h-3 w-3 bg-[#A7EBF2] opacity-80';
    }
  };

  const getMouthStyle = () => {
    switch (interactionState) {
      case 'email':
        return 'w-6 h-3 rounded-b-full bg-[#A7EBF2]/50 mt-1';
      case 'password':
        return 'w-4 h-4 rounded-full border-2 border-[#A7EBF2]/50 bg-transparent mt-1';
      case 'submit':
        return 'w-8 h-4 rounded-b-full bg-[#A7EBF2] mt-0 animate-bounce';
      default:
        return 'w-4 h-1 rounded-full bg-[#26658C]/50 mt-2';
    }
  };

  // Body animation classes
  const getBodyAnimation = () => {
    if (interactionState === 'submit') return 'animate-spin duration-700';
    if (interactionState === 'typing') return 'scale-105 transition-transform duration-100';
    return 'animate-float';
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="hidden md:flex relative w-[350px] h-full min-h-[500px] rounded-2xl bg-[#023859]/5 backdrop-blur-xl border border-[#26658C] items-center justify-center overflow-hidden transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(167,235,242,0.2)]"
    >
      {/* Glow Effects */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 bg-[#26658C]/30 blur-[80px] rounded-full transition-all duration-700
        ${interactionState === 'email' ? 'bg-[#A7EBF2]/50 scale-125' : ''}
        ${interactionState === 'password' ? 'bg-[#26658C]/30 scale-90' : ''}
        ${interactionState === 'submit' ? 'bg-[#A7EBF2]/40 scale-150' : ''}
      `}></div>

      {/* Interactive Character */}
      <div 
        className={`relative w-32 h-32 bg-gradient-to-br from-[#54ACBF]/20 to-[#26658C]/20 rounded-full border border-[#26658C]/40 backdrop-blur-md flex flex-col items-center justify-center shadow-lg transition-all duration-500 ease-out ${getBodyAnimation()}`}
        style={{
          transform: `translate(${mousePos.x}px, ${mousePos.y}px)`
        }}
      >
        {/* Eyes Container */}
        <div className="flex gap-4 mb-1" style={{ transform: `translate(${mousePos.x * 1.5}px, ${mousePos.y * 1.5}px)` }}>
          <div className={`rounded-full transition-all duration-300 ${getEyeStyle()}`}></div>
          <div className={`rounded-full transition-all duration-300 ${getEyeStyle()}`}></div>
        </div>

        {/* Mouth */}
        <div className={`transition-all duration-300 ${getMouthStyle()}`} style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }}></div>
      </div>

      {/* Minimal Text */}
      <div className="absolute bottom-12 text-center w-full px-6">
        <p className="text-[#54ACBF] text-sm font-light tracking-widest uppercase opacity-80">
          Your Money Journey Starts Here
        </p>
      </div>
    </div>
  );
};

export default SideCard;
