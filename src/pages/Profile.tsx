import React, { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDarkMode } from "../lib/DarkModeContext";
import { supabase } from "../lib/supabase";
import { 
  Camera, 
  Moon, 
  LogOut, 
  Sun, 
  CheckCircle2, 
  Heart, 
  Book, 
  Trophy, 
  MessageSquare,
  ChevronRight,
  Edit2,
  Sparkles,
  X,
  Plus,
  Flower2
} from "lucide-react";

export default function Profile() {
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }
  const [showSavedMessage, setShowSavedMessage] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: "Lectora",
    bio: "\"Lectora apasionada de clásicos y soñadora empedernida\"",
    email: "usuario@diario.com",
    avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6_13S3z25cw9V6hXrshBz3gJGozf68VFijPPj71uz1COWXItL5UvZu8EI_sKriSLvkz-rBVxZo1W11RgOaRodNXqDGTSAXvhGXTP1EJvorq0ZES9xKWDjY7y0oupF2M9OnEq-x7Kcr0kyyDaucruyzVeCXcBhRJvgmoGGR5kxLtcGMZbhSDLcktXqPkvlgJcgeDQ2jjXDChq_dramfkyUhRGfzayPe7gIhWGlbiNHm-1nFW8Q2TthMBnZn3drHw6IJevFpHqLsd-4"
  });

  React.useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      if (user) {
        setProfileData(prev => ({
          ...prev,
          email: user.email || prev.email,
          name: user.user_metadata?.full_name || prev.name
        }));
      }
    });
  }, []);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setProfileData(prev => ({ ...prev, avatar: url }));
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    setShowSavedMessage(true);
    setTimeout(() => setShowSavedMessage(false), 3000);
  };

  return (
    <main className={`flex-1 md:ml-64 flex flex-col min-h-screen transition-colors duration-500 ${isDarkMode ? 'bg-background text-on-background' : 'bg-background text-[#5C4033]'} pb-20`}>
      <header className="md:hidden w-full h-16 bg-transparent"></header>
      
      <div className="p-container-padding lg:p-section-margin max-w-7xl mx-auto w-full flex-1">
        
        {/* Profile Hero Card */}
        <section className={`rounded-[32px] p-8 md:p-12 shadow-[0_10px_40px_rgba(168,107,107,0.06)] border relative mb-12 overflow-hidden transition-all duration-500 ${isDarkMode ? 'bg-[#251F1C] border-[#3D342F] shadow-none' : 'bg-white border-primary-container/20'}`}>
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8 md:gap-12">
            
            {/* Avatar Section */}
            <div className="relative group shrink-0">
              <div 
                onClick={handleAvatarClick}
                className={`w-48 h-48 md:w-56 md:h-56 rounded-full p-2 bg-gradient-to-tr shadow-xl cursor-pointer hover:scale-[1.02] transition-transform duration-500 ${isDarkMode ? 'from-primary via-[#4A3B2F] to-primary' : 'from-[#DEB887] via-primary-container to-[#DEB887]'}`}
              >
                <div className={`w-full h-full rounded-full overflow-hidden relative ${isDarkMode ? 'bg-[#1A1614]' : 'bg-white'}`}>
                  <img 
                    alt="Perfil" 
                    className="w-full h-full object-cover" 
                    src={profileData.avatar}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={handleFileChange}
              />
            </div>

            {/* Profile Info Section */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <h1 className={`font-h1 text-[42px] font-bold ${isDarkMode ? 'text-white' : 'text-[#5C4033]'}`}>{profileData.name}</h1>
                <button 
                  onClick={() => setIsEditing(!isEditing)}
                  className={`inline-flex items-center gap-2 px-6 py-2 border rounded-full text-[14px] font-label-md transition-colors self-center md:self-start shadow-sm ${isDarkMode ? 'bg-[#2D2622] border-[#4A3B2F] text-primary hover:bg-[#3D342F]' : 'bg-white border-primary-container text-primary hover:bg-primary-container/20'}`}
                >
                  {isEditing ? <X className="w-4 h-4" /> : <Edit2 className="w-4 h-4" />}
                  {isEditing ? "Cancelar" : "Editar perfil"}
                </button>
              </div>
              
              <p className={`font-body-md italic text-[18px] mb-8 max-w-lg leading-relaxed ${isDarkMode ? 'text-[#BFAF9F]' : 'text-[#8B735B]'}`}>
                {profileData.bio}
              </p>

              {/* Stats row */}
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
                <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-colors ${isDarkMode ? 'bg-[#2D2622] border-[#4A3B2F]' : 'bg-[#F9F6F3] border-primary-container/10'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-primary/20 text-primary' : 'bg-primary-container/30 text-primary'}`}>
                    <Book className="w-4 h-4" />
                  </div>
                  <div>
                    <span className={`block font-bold ${isDarkMode ? 'text-white' : 'text-[#5C4033]'}`}>142</span>
                    <span className={`text-[11px] uppercase tracking-wider ${isDarkMode ? 'text-[#8B735B]' : 'text-[#A89078]'}`}>Libros leídos</span>
                  </div>
                </div>
                <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-colors ${isDarkMode ? 'bg-[#2D2622] border-[#4A3B2F]' : 'bg-[#F9F6F3] border-primary-container/10'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-pink-900/40 text-pink-300' : 'bg-pink-100 text-pink-400'}`}>
                    <Trophy className="w-4 h-4" />
                  </div>
                  <div>
                    <span className={`block font-bold ${isDarkMode ? 'text-white' : 'text-[#5C4033]'}`}>12</span>
                    <span className={`text-[11px] uppercase tracking-wider ${isDarkMode ? 'text-[#8B735B]' : 'text-[#A89078]'}`}>Desafíos</span>
                  </div>
                </div>
                <div className={`flex items-center gap-3 px-6 py-3 rounded-2xl border transition-colors ${isDarkMode ? 'bg-[#2D2622] border-[#4A3B2F]' : 'bg-[#F9F6F3] border-primary-container/10'}`}>
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isDarkMode ? 'bg-amber-900/40 text-amber-300' : 'bg-amber-50 text-amber-500'}`}>
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <div>
                    <span className={`block font-bold ${isDarkMode ? 'text-white' : 'text-[#5C4033]'}`}>58</span>
                    <span className={`text-[11px] uppercase tracking-wider ${isDarkMode ? 'text-[#8B735B]' : 'text-[#A89078]'}`}>Reseñas escritas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Edit form overlay (if editing) */}
          {isEditing && (
            <div className="absolute inset-0 z-20 bg-white/95 backdrop-blur-md p-8 flex flex-col justify-center animate-in fade-in duration-300">
              <div className="max-w-2xl mx-auto w-full">
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-label-md text-primary mb-2 ml-1" htmlFor="edit-name">Nombre</label>
                      <input 
                        className="w-full bg-[#FDFCFB] border border-primary-container/30 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all"
                        id="edit-name"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className="block font-label-md text-primary mb-2 ml-1" htmlFor="edit-email">Email</label>
                      <input 
                        className="w-full bg-[#FDFCFB] border border-primary-container/30 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all opacity-60"
                        id="edit-email"
                        value={profileData.email}
                        readOnly
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-label-md text-primary mb-2 ml-1" htmlFor="edit-bio">Biografía</label>
                    <textarea 
                      className="w-full bg-[#FDFCFB] border border-primary-container/30 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-primary/20 transition-all h-24 resize-none"
                      id="edit-bio"
                      value={profileData.bio}
                      onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <button 
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-2.5 rounded-full border border-outline-variant font-label-md text-stone-500 hover:bg-stone-50 transition-colors"
                    >
                      Cancelar
                    </button>
                    <button 
                      type="submit"
                      className="px-8 py-2.5 rounded-full bg-primary text-on-primary font-label-md hover:bg-secondary transition-colors shadow-sm"
                    >
                      Guardar cambios
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Success feedback */}
          {showSavedMessage && (
            <div className="absolute top-6 right-6 z-30 bg-green-50 text-green-600 px-4 py-2 rounded-full font-label-md text-[14px] flex items-center gap-2 border border-green-100 animate-in slide-in-from-top-4">
              <CheckCircle2 className="w-4 h-4" />
              ¡Perfil actualizado!
            </div>
          )}
        </section>

        {/* Custom Separator */}
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px bg-primary-container/30 flex-1"></div>
          <Flower2 className="w-6 h-6 text-primary/30" />
          <div className="h-px bg-primary-container/30 flex-1"></div>
        </div>

        {/* Favorite Books Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className={`font-h1 text-[32px] font-bold flex items-center gap-3 transition-colors ${isDarkMode ? 'text-white' : 'text-[#5C4033]'}`}>
              Mis Libros Favoritos
              <Heart className="w-6 h-6 text-primary fill-primary" />
            </h2>
            <Link to="/library" className="text-primary font-label-md hover:underline flex items-center gap-1 group">
              Ver estante completo 
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Highlighted Favorite */}
            <div className={`lg:col-span-2 rounded-[32px] p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center border transition-all duration-500 ${isDarkMode ? 'bg-[#251F1C] border-[#3D342F]' : 'bg-[#F9F6F3]/50 border-primary-container/10'}`}>
              <div className="w-full md:w-1/2 aspect-[3/4] relative perspective-1000 group">
                <div className="w-full h-full bg-white rounded-2xl shadow-2xl relative overflow-hidden transform group-hover:rotate-y-[-5deg] transition-transform duration-500">
                   <img 
                    alt="Cover" 
                    className="w-full h-full object-cover" 
                    src="https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg"
                   />
                </div>
              </div>
              <div className="flex-1 py-4 relative">
                <div className="flex justify-between items-start mb-4">
                  <div className={`inline-block px-3 py-1 rounded-full text-[11px] font-bold tracking-[0.1em] uppercase ${isDarkMode ? 'bg-amber-900/30 text-amber-200' : 'bg-amber-50 text-amber-700'}`}>
                    Clásico indispensable
                  </div>
                  <Link 
                    to="/add" 
                    state={{ title: "Orgullo y Prejuicio", author: "Jane Austen" }}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${isDarkMode ? 'bg-[#2D2622] text-primary hover:bg-[#3D342F]' : 'bg-white text-primary hover:bg-primary-container/20 shadow-sm'}`}
                  >
                    <Sparkles className="w-5 h-5" />
                  </Link>
                </div>
                <h3 className={`font-h1 text-[36px] font-bold mb-2 leading-tight ${isDarkMode ? 'text-white' : 'text-[#5C4033]'}`}>Orgullo y Prejuicio</h3>
                <p className={`font-body-md italic text-[18px] mb-6 line-clamp-4 leading-relaxed ${isDarkMode ? 'text-[#BFAF9F]' : 'text-[#8B735B]'}`}>
                  "Mis afectos y deseos no han cambiado, pero una palabra suya me silenciará para siempre..."
                </p>
                <div className={`flex items-center justify-between border-t pt-6 ${isDarkMode ? 'border-[#3D342F]' : 'border-primary-container/20'}`}>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(i => <Heart key={i} className="w-5 h-5 text-primary fill-primary" />)}
                  </div>
                  <span className={`px-4 py-1.5 rounded-full font-label-md text-[13px] ${isDarkMode ? 'bg-primary/20 text-primary' : 'bg-primary-container/20 text-primary'}`}>
                    Releído 4 veces
                  </span>
                </div>
              </div>
            </div>

            {/* Other Favorites List */}
            <div className="space-y-6">
              <div className={`p-5 rounded-[24px] border shadow-sm flex gap-4 hover:shadow-md transition-all ${isDarkMode ? 'bg-[#251F1C] border-[#3D342F]' : 'bg-white border-primary-container/20'}`}>
                <div className="w-20 h-28 rounded-lg overflow-hidden shrink-0 bg-stone-100">
                   <img src="https://covers.openlibrary.org/b/isbn/9780141441146-L.jpg" alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 py-1">
                   <h4 className={`font-bold text-[18px] mb-0.5 ${isDarkMode ? 'text-white' : 'text-[#5C4033]'}`}>Jane Eyre</h4>
                   <p className={`text-[14px] italic mb-2 ${isDarkMode ? 'text-[#8B735B]' : 'text-[#8B735B]'}`}>Charlotte Brontë</p>
                   <div className="flex gap-0.5">
                     {[1, 2, 3, 4].map(i => <Heart key={i} className="w-4 h-4 text-primary fill-primary" />)}
                     <Heart className="w-4 h-4 text-primary" />
                   </div>
                </div>
              </div>

              <div className={`p-5 rounded-[24px] border shadow-sm flex gap-4 hover:shadow-md transition-all ${isDarkMode ? 'bg-[#251F1C] border-[#3D342F]' : 'bg-white border-primary-container/20'}`}>
                <div className="w-20 h-28 rounded-lg overflow-hidden shrink-0 bg-stone-100 flex items-center justify-center">
                   <img src="https://covers.openlibrary.org/b/isbn/9780147514011-L.jpg" alt="Mujercitas" className="w-full h-full object-cover"/>
                </div>
                <div className="flex-1 py-1">
                   <h4 className={`font-bold text-[18px] mb-0.5 ${isDarkMode ? 'text-white' : 'text-[#5C4033]'}`}>Mujercitas</h4>
                   <p className={`text-[14px] italic mb-2 ${isDarkMode ? 'text-[#8B735B]' : 'text-[#8B735B]'}`}>Louisa May Alcott</p>
                   <div className="flex gap-0.5">
                     {[1, 2, 3, 4, 5].map(i => <Heart key={i} className="w-4 h-4 text-primary fill-primary" />)}
                   </div>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* Custom Lists Section */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className={`font-h1 text-[32px] font-bold transition-colors ${isDarkMode ? 'text-white' : 'text-[#5C4033]'}`}>Listas Personalizadas</h2>
            <button 
              onClick={() => alert("Función para añadir una nueva lista personalizada")}
              className={`w-10 h-10 rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all shadow-sm ${isDarkMode ? 'bg-[#2D2622] text-primary' : 'bg-primary-container/30 text-primary'}`}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="relative h-48 rounded-[28px] overflow-hidden group cursor-pointer shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=600" 
                alt="List" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <span className="text-white font-bold text-[20px]">Lecturas de Invierno</span>
                <p className="text-white/80 text-[13px]">12 libros</p>
              </div>
            </div>

            <div className="relative h-48 rounded-[28px] overflow-hidden group cursor-pointer shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=600" 
                alt="Clásicos" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <span className="text-white font-bold text-[20px]">Clásicos del Mundo</span>
                <p className="text-white/80 text-[13px]">25 libros</p>
              </div>
            </div>

            <div className="relative h-48 rounded-[28px] overflow-hidden group cursor-pointer shadow-md">
              <img 
                src="https://images.unsplash.com/photo-1516724562728-afc824a36e84?auto=format&fit=crop&q=80&w=600" 
                alt="List" 
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6">
                <span className="text-white font-bold text-[20px]">Para Recomendar</span>
                <p className="text-white/80 text-[13px]">8 libros</p>
              </div>
            </div>
          </div>
        </section>

        {/* Settings/Bottom Area */}
        <div className={`mt-20 border-t pt-12 flex flex-col md:flex-row items-center justify-between gap-8 ${isDarkMode ? 'border-[#3D342F]' : 'border-primary-container/20'}`}>
           <div className="flex items-center gap-6">
              <button 
                onClick={toggleDarkMode}
                className={`flex items-center gap-3 px-6 py-3 border rounded-full shadow-sm transition-all duration-300 ${isDarkMode ? 'bg-[#2D2622] border-[#4A3B2F] hover:bg-[#3D342F]' : 'bg-white border-primary-container/30 hover:bg-stone-50'}`}
              >
                {isDarkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5 text-indigo-400" />}
                <span className={`font-label-md transition-colors ${isDarkMode ? 'text-[#BFAF9F]' : 'text-on-surface-variant'}`}>{isDarkMode ? "Modo Claro" : "Modo Oscuro"}</span>
              </button>
              
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-red-400 font-label-md hover:text-red-500 transition-colors"
              >
                <LogOut className="w-5 h-5" />
                Cerrar sesión
              </button>
           </div>
           
           <div className="flex items-center gap-2 text-primary/40 font-body-md italic">
              <Sparkles className="w-4 h-4" />
              Tu refugio de historias
           </div>
        </div>

      </div>
    </main>
  );
}
