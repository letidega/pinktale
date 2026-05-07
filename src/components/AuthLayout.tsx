import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col watercolor-bg relative">
      {/* Decorative SVG Flowers in background */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 overflow-hidden opacity-5">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute -top-10 -left-10 w-96 h-96 text-primary fill-current transform -rotate-45">
          <path d="M 100 0 C 120 40, 160 80, 200 100 C 160 120, 120 160, 100 200 C 80 160, 40 120, 0 100 C 40 80, 80 40, 100 0 Z" />
          <circle cx="100" cy="100" r="20" fill="white" opacity="0.5" />
        </svg>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] text-tertiary fill-current transform rotate-12">
          <path d="M 100 0 C 120 40, 160 80, 200 100 C 160 120, 120 160, 100 200 C 80 160, 40 120, 0 100 C 40 80, 80 40, 100 0 Z" />
          <circle cx="100" cy="100" r="30" fill="white" opacity="0.3" />
        </svg>
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="absolute top-[40%] right-[10%] w-64 h-64 text-secondary fill-current transform rotate-45">
          <path d="M 100 0 C 120 40, 160 80, 200 100 C 160 120, 120 160, 100 200 C 80 160, 40 120, 0 100 C 40 80, 80 40, 100 0 Z" />
        </svg>
      </div>
      <Outlet />
    </div>
  );
}
