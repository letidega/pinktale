import React from 'react';

export default function BackgroundDecorations() {
  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden opacity-[0.03]">
      {/* Top Left Flower */}
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute -top-20 -left-20 w-[500px] h-[500px] text-primary fill-current transform rotate-12">
        <path d="M100,20 Q110,60 150,70 Q110,80 100,120 Q90,80 50,70 Q90,60 100,20 Z M100,40 Q105,70 130,75 Q105,80 100,110 Q95,80 70,75 Q95,70 100,40 Z" />
        <path d="M40,150 Q70,140 80,100 Q90,140 120,150 Q90,160 80,200 Q70,160 40,150 Z" />
        <circle cx="160" cy="40" r="15" />
        <circle cx="180" cy="160" r="10" />
      </svg>
      
      {/* Bottom Right Branch */}
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] text-secondary fill-current transform -rotate-12">
        <path d="M20,180 Q60,160 80,100 T160,20 M80,100 Q110,120 140,110 M60,140 Q40,120 20,130" stroke="currentColor" strokeWidth="2" fill="none" />
        <path d="M160,20 Q170,10 180,20 Q170,30 160,20 Z" />
        <path d="M140,110 Q150,100 160,110 Q150,120 140,110 Z" />
        <path d="M20,130 Q10,120 0,130 Q10,140 20,130 Z" />
      </svg>

      {/* Center-ish Floating Leaves */}
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute top-[30%] right-[15%] w-64 h-64 text-tertiary fill-current">
        <path d="M50,50 Q70,40 90,50 Q70,60 50,50 Z" />
        <path d="M110,80 Q130,70 150,80 Q130,90 110,80 Z" transform="rotate(20, 130, 80)" />
      </svg>
    </div>
  );
}
