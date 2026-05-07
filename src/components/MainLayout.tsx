import { Link, Outlet, useLocation } from "react-router-dom";
import { Home, LayoutDashboard, BookOpen, Search, User } from "lucide-react";
import clsx from "clsx";
import BackgroundDecorations from "./BackgroundDecorations";

export default function MainLayout() {
  const location = useLocation();

  const navItems = [
    { name: "Inicio", path: "/", icon: Home },
    { name: "Biblioteca", path: "/library", icon: BookOpen },
    { name: "Buscar", path: "/search", icon: Search },
    { name: "Perfil", path: "/profile", icon: User },
  ];

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex watercolor-bg relative">
      <BackgroundDecorations />

      {/* SideNavBar (Desktop) */}
      <nav className="bg-white/60 backdrop-blur-lg dark:bg-surface/60 h-screen w-64 border-r rounded-r-lg border-[#A86B6B]/10 shadow-sm fixed left-0 top-0 z-50 flex-col py-6 hidden md:flex">
        <div className="px-6 mb-8 flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-primary-container flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
            <img 
              alt="Avatar de usuaria" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBGYNBl5mFcGDmyXcoI_EeMrFOFXqYTyKfA1USrP7d87ppwMWtzBay5T3thqy-Qc55LkZrOn9R8FD9fo5KgsCv9_z9_BGx6HUCoV06CdC9E3b9vt4ctVqn7Y4_G_pPJnKgss8p5dcir_iRTVvGZCNdCwJUZ-9Qg_riDdKiZppvvJM3f2K12rBtmaML2FcI3-VFVruS9hYpdcdYaq6sMvlPIW_cM2bOdkM50_jfC0J8AtH2c_OLGboXRWfPPqIniDVibrF4s4trhCMtH"
            />
          </div>
          <div className="text-center">
            <h1 className="text-xl font-serif font-bold italic text-amber-600">Pinktale</h1>
            <p className="font-caption text-[12px] tracking-wide text-on-surface-variant">Mi refugio de historias</p>
          </div>
        </div>

        <div className="flex flex-col gap-2 px-2 flex-grow">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path !== "/" && location.pathname.startsWith(item.path));
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={clsx(
                  "flex items-center gap-3 px-4 py-3 rounded-lg font-serif text-sm tracking-wide transition-all",
                  isActive 
                    ? "bg-[#F4C2C2]/20 text-[#A86B6B] font-semibold" 
                    : "text-stone-500 dark:text-stone-400 hover:bg-[#F4C2C2]/10 hover:translate-x-1"
                )}
              >
                <Icon className={clsx("w-5 h-5", isActive && "fill-[#A86B6B]/20")} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Main Content Area */}
      <Outlet />
      
    </div>
  );
}
