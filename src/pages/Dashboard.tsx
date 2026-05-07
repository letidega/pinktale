import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { BookOpen, Menu, Search, LayoutDashboard, Bookmark, Edit, Heart, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Dashboard() {
  const [stats, setStats] = useState({ read: 0, reading: 0, toRead: 0 });
  const [recentBooks, setRecentBooks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  async function fetchDashboardData() {
    try {
      setLoading(true);
      
      // Fetch books for stats and recent list
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      if (data) {
        const read = data.filter(b => b.status === 'read').length;
        const reading = data.filter(b => b.status === 'reading').length;
        const toRead = data.filter(b => b.status === 'to-read').length;
        
        setStats({ read, reading, toRead });
        setRecentBooks(data.slice(0, 5));
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* TopAppBar (Dashboard specific) */}
      <header className="fixed top-0 z-40 w-full bg-[#F4C2C2]/30 backdrop-blur-md border-b border-[#A86B6B]/10 shadow-[0_8px_30px_rgba(168,107,107,0.05)] flex justify-between items-center px-6 py-3">
        <div className="flex items-center gap-4">
          <Menu className="md:hidden text-primary cursor-pointer w-6 h-6" />
          <span className="text-2xl font-serif font-bold text-[#A86B6B]">Pinktale</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/search" className="flex items-center bg-white/40 rounded-full px-4 py-1.5 gap-2 border border-[#A86B6B]/10 hover:bg-white/60 transition-colors">
            <Search className="text-[#A86B6B] w-4 h-4" />
            <span className="text-sm italic text-stone-400 w-32 md:w-48">Buscar tesoros...</span>
          </Link>
          <Link to="/profile" className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary-container hover:border-primary transition-colors">
            <img 
              alt="Avatar de usuaria" 
              className="w-full h-full object-cover" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVl4QED0uRoDuaTjnwOaP4TSW9tn3Ma_XRUgcT2s-uy9rUBYEOpFpvOeulzgkWoqewWb3mAn1tiB2yW9UAdejmIp_cMhfkf-itXeHPM0t9IDg7sl_K25gjaKw63wkDNq70KBOpbc7RrdvRvpeHztdO5tyNbhqH-g-tZktHltDL5GuCKx2wr_EZrqU9ykiQKyhZ7DHtc_61lE1WFD8i0QhlGV9i28J_0KbDPTAK_FCYLyBd5-ukzcOsnI5S_cL_mudCVk1mj534GaLt"
            />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="pt-24 pb-20 md:ml-64 lg:ml-64 px-6 w-full max-w-6xl">
        <header className="mb-section-margin">
          <h1 className="font-h1 text-[36px] font-bold text-primary italic mb-2">¡Hola de nuevo!</h1>
          <p className="font-body-lg text-[18px] text-on-surface-variant">Tu estante de historias está floreciendo bellamente hoy.</p>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <Loader2 className="w-10 h-10 text-primary animate-spin" />
            <p className="text-on-surface-variant italic font-body-md">Preparando tu diario...</p>
          </div>
        ) : (
          <>
            {/* Stats Bento Grid */}
            <section className="grid grid-cols-1 md:grid-cols-3 gap-card-gap mb-section-margin">
              <div className="bg-surface/70 backdrop-blur shadow-[0_8px_30px_rgba(168,107,107,0.08)] rounded-[24px] p-6 border border-primary-container/30 flex items-center gap-5">
                <div className="w-14 h-14 bg-primary-container/40 rounded-full flex items-center justify-center text-primary">
                  <BookOpen className="w-8 h-8 fill-primary/20" />
                </div>
                <div>
                  <p className="text-caption text-[12px] text-stone-400 uppercase tracking-widest">Leídos</p>
                  <p className="text-h2 text-[28px] font-bold text-on-primary-container">{stats.read}</p>
                </div>
              </div>
              <div className="bg-surface/70 backdrop-blur shadow-[0_8px_30px_rgba(168,107,107,0.08)] rounded-[24px] p-6 border border-primary-container/30 flex items-center gap-5">
                <div className="w-14 h-14 bg-tertiary-container/40 rounded-full flex items-center justify-center text-tertiary">
                  <BookOpen className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-caption text-[12px] text-stone-400 uppercase tracking-widest">En progreso</p>
                  <p className="text-h2 text-[28px] font-bold text-on-tertiary-container">{stats.reading}</p>
                </div>
              </div>
              <div className="bg-surface/70 backdrop-blur shadow-[0_8px_30px_rgba(168,107,107,0.08)] rounded-[24px] p-6 border border-primary-container/30 flex items-center gap-5">
                <div className="w-14 h-14 bg-secondary-container/40 rounded-full flex items-center justify-center text-secondary">
                  <Bookmark className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-caption text-[12px] text-stone-400 uppercase tracking-widest">Pendientes</p>
                  <p className="text-h2 text-[28px] font-bold text-on-secondary-container">{stats.toRead}</p>
                </div>
              </div>
            </section>

            {/* Annual Goal & Featured */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-card-gap mb-section-margin">
              {/* Goal Card */}
              <div className="lg:col-span-4 bg-surface/80 rounded-[24px] p-8 border border-primary-container/40 shadow-sm flex flex-col items-center justify-center text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary-container/10 rounded-full -mr-12 -mt-12"></div>
                <h3 className="font-h3 text-[22px] font-bold text-primary mb-6">Objetivo Anual</h3>
                <div className="relative w-40 h-40 flex items-center justify-center mb-6">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle className="text-stone-100" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeWidth="12"></circle>
                    <circle className="text-primary-container rounded-full" cx="80" cy="80" fill="transparent" r="70" stroke="currentColor" strokeDasharray="440" strokeDashoffset="176" strokeWidth="12"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-h2 text-[28px] font-bold text-on-primary-container">{stats.read}</span>
                    <span className="text-caption text-[12px] text-stone-400">de 20 libros</span>
                  </div>
                </div>
                <p className="italic text-stone-500 font-serif text-sm">"Un paso a la vez, cada página cuenta."</p>
              </div>

              {/* Reading Now Card */}
              <div className="lg:col-span-8 bg-surface/40 backdrop-blur-md rounded-[24px] p-8 border border-dashed border-primary-container/40 flex flex-col md:flex-row gap-8 items-center">
                <div className="w-48 h-64 rounded-xl shadow-xl overflow-hidden rotate-[-2deg] hover:rotate-0 transition-transform duration-500 flex-shrink-0">
                  <img 
                    alt="Lectura actual" 
                    className="w-full h-full object-cover" 
                    src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-primary-container/40 text-primary text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full">Lectura destacada</span>
                  </div>
                  <h2 className="font-h2 text-[28px] font-bold text-on-primary-container mb-2">Explora tus historias</h2>
                  <p className="text-stone-500 italic font-serif mb-4">Sigue sumando tesoros a tu estante.</p>
                  
                  <Link 
                    id="btn-note-progress"
                    to="/library" 
                    className="inline-flex w-fit bg-primary-container text-on-primary-container px-6 py-2.5 rounded-full items-center gap-2 font-label-md text-[14px] hover:bg-secondary-container transition-all active:scale-95 shadow-sm"
                  >
                    <BookOpen className="w-4 h-4" />
                    Ir a mi estante
                  </Link>
                </div>
              </div>
            </section>

            {/* Actividad Reciente */}
            <section className="mb-section-margin">
              <div className="flex items-baseline justify-between mb-6">
                <h2 className="font-h2 text-[28px] text-primary italic">Añadidos recientemente</h2>
                <Link to="/library" className="text-sm font-body-md text-stone-400 hover:text-primary transition-colors cursor-pointer">Ver todo →</Link>
              </div>
              
              {recentBooks.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-card-gap">
                  {recentBooks.map((book) => (
                    <Link key={book.id} to={`/book/${book.id}`} className="group flex flex-col gap-3">
                      <div className="w-full aspect-[2/3] rounded-xl overflow-hidden shadow-sm group-hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-1 bg-stone-100 flex items-center justify-center">
                        {book.cover ? (
                          <img className="w-full h-full object-cover" src={book.cover} alt={book.title} />
                        ) : (
                          <BookOpen className="w-10 h-10 text-stone-300" />
                        )}
                      </div>
                      <div>
                        <p className="font-label-md text-on-surface line-clamp-1 group-hover:text-primary transition-colors">{book.title}</p>
                        <div className="flex gap-0.5 mt-1">
                           {[1, 2, 3, 4, 5].map((star) => (
                             <Heart key={star} className={`w-3 h-3 ${star <= (book.rating || 0) ? "text-secondary fill-secondary" : "text-outline-variant"}`} />
                           ))}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="py-10 text-center bg-white/30 rounded-3xl border border-dashed border-primary-container/30">
                  <p className="text-stone-400 italic">No hay actividad reciente aún.</p>
                </div>
              )}
            </section>
          </>
        )}

        {/* Footer inside main content area */}
        <footer className="flex flex-col items-center gap-4 w-full mt-auto py-8 border-t border-dashed border-[#A86B6B]/20">
          <div className="flex gap-6">
            <Link to="#" className="font-serif italic text-xs text-stone-400 hover:text-[#A86B6B] hover:underline decoration-[#F4C2C2] transition-opacity duration-500">Privacidad</Link>
            <Link to="#" className="font-serif italic text-xs text-stone-400 hover:text-[#A86B6B] hover:underline decoration-[#F4C2C2] transition-opacity duration-500">Términos de uso</Link>
            <Link to="#" className="font-serif italic text-xs text-stone-400 hover:text-[#A86B6B] hover:underline decoration-[#F4C2C2] transition-opacity duration-500">Contacto</Link>
          </div>
          <p className="font-serif italic text-xs text-stone-400 text-[#A86B6B]">© 2024 Pinktale — Un santuario para tus historias</p>
        </footer>
      </main>
    </>
  );
}
