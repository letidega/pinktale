import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Flower2, ChevronDown, MoreVertical, Heart, BookOpen, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

type BookStatus = "reading" | "read" | "to-read";

interface Book {
  id: string;
  title: string;
  author: string;
  cover?: string;
  status: BookStatus;
  rating: number;
  progress?: string;
  timeLabel?: string;
}

export default function Library() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<BookStatus | "all">("all");

  useEffect(() => {
    fetchBooks();
  }, []);

  async function fetchBooks() {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('books')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setBooks(data || []);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  }

  const filteredBooks = books.filter(book => 
    filter === "all" ? true : book.status === filter
  );

  return (
    <>
      <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* TopAppBar (MOBILE ONLY) */}
        <header className="md:hidden flex justify-between items-center w-full px-6 py-3 bg-primary-container/30 backdrop-blur-md dark:bg-background/40 docked full-width top-0 z-40 border-b border-primary-container/10 shadow-[0_8px_30px_rgba(168,107,107,0.05)] sticky">
          <div className="text-2xl font-serif font-bold text-primary dark:text-on-primary-container">Pinktale</div>
          <div className="flex items-center gap-4">
            <img 
              alt="Avatar de usuaria" 
              className="w-8 h-8 rounded-full object-cover border border-primary-container" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBVl4QED0uRoDuaTjnwOaP4TSW9tn3Ma_XRUgcT2s-uy9rUBYEOpFpvOeulzgkWoqewWb3mAn1tiB2yW9UAdejmIp_cMhfkf-itXeHPM0t9IDg7sl_K25gjaKw63wkDNq70KBOpbc7RrdvRvpeHztdO5tyNbhqH-g-tZktHltDL5GuCKx2wr_EZrqU9ykiQKyhZ7DHtc_61lE1WFD8i0QhlGV9i28J_0KbDPTAK_FCYLyBd5-ukzcOsnI5S_cL_mudCVk1mj534GaLt"
            />
          </div>
        </header>

        <div className="p-container-padding lg:p-section-margin max-w-7xl mx-auto w-full flex-1">
          {/* Page Header */}
          <div className="mb-section-margin flex justify-between items-end flex-wrap gap-4">
            <div>
              <h1 className="font-h1 text-[36px] font-bold text-primary mb-2">Mi estante</h1>
              <p className="font-body-md text-on-surface-variant italic">Un santuario para tus historias.</p>
            </div>
            <Link to="/add" className="flex items-center gap-2 bg-primary-container text-on-primary-container px-6 py-3 rounded-full hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(244,194,194,0.4)]">
              <Flower2 className="w-4 h-4" />
              <span className="font-label-md text-[14px] font-bold">Añadir nuevo libro</span>
            </Link>
          </div>

          {/* Filters Section */}
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 mb-section-margin bg-surface/40 p-4 rounded-xl border border-outline-variant/30 backdrop-blur-sm">
            {/* Status Filters */}
            <div className="flex items-center gap-2 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 hide-scrollbar">
              <button 
                onClick={() => setFilter("all")}
                className={`px-4 py-2 rounded-full font-label-md text-[14px] font-bold whitespace-nowrap shadow-sm transition-colors ${filter === "all" ? "bg-tertiary-container text-on-tertiary-container" : "text-on-surface-variant hover:bg-surface-variant/50"}`}
              >
                Todos
              </button>
              <button 
                onClick={() => setFilter("reading")}
                className={`px-4 py-2 rounded-full font-label-md text-[14px] font-bold whitespace-nowrap transition-colors border border-transparent ${filter === "reading" ? "bg-tertiary-container text-on-tertiary-container" : "text-on-surface-variant hover:bg-surface-variant/50 hover:border-outline-variant/50"}`}
              >
                Leyendo
              </button>
              <button 
                onClick={() => setFilter("read")}
                className={`px-4 py-2 rounded-full font-label-md text-[14px] font-bold whitespace-nowrap transition-colors border border-transparent ${filter === "read" ? "bg-tertiary-container text-on-tertiary-container" : "text-on-surface-variant hover:bg-surface-variant/50 hover:border-outline-variant/50"}`}
              >
                Leídos
              </button>
              <button 
                onClick={() => setFilter("to-read")}
                className={`px-4 py-2 rounded-full font-label-md text-[14px] font-bold whitespace-nowrap transition-colors border border-transparent ${filter === "to-read" ? "bg-tertiary-container text-on-tertiary-container" : "text-on-surface-variant hover:bg-surface-variant/50 hover:border-outline-variant/50"}`}
              >
                Por leer
              </button>
            </div>

            {/* Dropdown Filters */}
            <div className="flex items-center gap-4 w-full lg:w-auto">
              <div className="relative w-full lg:w-48">
                <select className="w-full appearance-none bg-surface-container-low border-b border-primary-container/50 text-on-surface font-body-md py-2 pl-4 pr-8 rounded-t-md focus:outline-none focus:border-primary focus:ring-0 italic text-stone-500">
                  <option value="">Género...</option>
                  <option value="romance">Romance</option>
                  <option value="fantasia">Fantasía</option>
                  <option value="poesia">Poesía</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none w-5 h-5" />
              </div>
              <div className="relative w-full lg:w-48">
                <select className="w-full appearance-none bg-surface-container-low border-b border-primary-container/50 text-on-surface font-body-md py-2 pl-4 pr-8 rounded-t-md focus:outline-none focus:border-primary focus:ring-0 italic text-stone-500">
                  <option value="">Autor...</option>
                  {/* We could dynamically populate this later */}
                  <option value="austen">Jane Austen</option>
                  <option value="bronte">Emily Brontë</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Bento Grid of Books */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 text-primary animate-spin" />
              <p className="text-on-surface-variant italic font-body-md">Abriendo tu santuario...</p>
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-card-gap">
              {filteredBooks.map((book) => (
                <div key={book.id} className="bg-surface-container-lowest rounded-[24px] border border-primary-container/30 overflow-hidden shadow-[0_8px_30px_rgba(168,107,107,0.05)] hover:-translate-y-1 transition-transform duration-300 relative group flex p-4 gap-4">
                  <Link to={`/book/${book.id}`} className="w-1/3 aspect-[2/3] rounded-lg overflow-hidden shrink-0 relative bg-surface-container flex items-center justify-center cursor-pointer block">
                    {book.cover ? (
                      <img 
                        alt={book.title} 
                        className="w-full h-full object-cover" 
                        src={book.cover}
                      />
                    ) : (
                      <BookOpen className="text-outline-variant w-10 h-10" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                  </Link>
                  <div className="flex flex-col flex-1 py-2 justify-between">
                    <div>
                      <div className="flex justify-between items-start mb-1">
                        <Link to={`/book/${book.id}`} className="font-h3 text-[22px] font-bold text-on-surface line-clamp-2 hover:text-primary transition-colors">{book.title}</Link>
                        <button 
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            alert("Opciones del libro: Editar, Archivar o Eliminar");
                          }}
                          className="text-outline-variant hover:text-primary transition-colors focus:outline-none"
                        >
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                      <p className="font-body-md text-on-surface-variant italic mb-3">{book.author}</p>
                    </div>
                    <div>
                      <div className="flex items-center gap-1 mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Heart 
                            key={star} 
                            className={`w-4 h-4 ${star <= (book.rating || 0) ? "fill-tertiary-fixed text-tertiary-fixed" : "text-primary-fixed-dim"}`} 
                          />
                        ))}
                      </div>
                      {book.status === "reading" && book.progress && (
                        <div className="w-full bg-surface-variant h-1.5 rounded-full mb-1">
                          <div className="bg-secondary-container h-1.5 rounded-full" style={{ width: book.progress }}></div>
                        </div>
                      )}
                      <div className="flex items-center justify-between">
                        <span className={`text-[12px] font-caption ${book.status === "reading" ? "text-primary" : book.status === "read" ? "text-secondary" : "text-outline-variant"}`}>
                          {book.status === "read" ? "Terminado" : book.status === "reading" ? "Leyendo" : "Por leer"}
                        </span>
                        {book.timeLabel && <span className="text-[12px] font-caption text-outline">{book.timeLabel}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-20 gap-4 bg-white/20 rounded-3xl border border-dashed border-primary-container/40">
              <BookOpen className="w-16 h-16 text-primary-container/50" />
              <div className="text-center">
                <p className="text-on-surface-variant font-h3 mb-2">Tu estante está esperando su primera historia</p>
                <Link to="/add" className="text-primary hover:underline font-label-md">Añadir mi primer libro ahora →</Link>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <footer className="flex flex-col items-center gap-4 w-full mt-auto bg-transparent py-8 border-t border-dashed border-[#A86B6B]/20">
          <div className="flex gap-6">
            <Link to="#" className="font-serif italic text-xs text-stone-400 hover:text-[#A86B6B] hover:underline decoration-[#F4C2C2] transition-opacity duration-500">Privacidad</Link>
            <Link to="#" className="font-serif italic text-xs text-stone-400 hover:text-[#A86B6B] hover:underline decoration-[#F4C2C2] transition-opacity duration-500">Términos de uso</Link>
            <Link to="#" className="font-serif italic text-xs text-stone-400 hover:text-[#A86B6B] hover:underline decoration-[#F4C2C2] transition-opacity duration-500">Contacto</Link>
          </div>
          <p className="font-serif italic text-xs text-stone-400">© 2024 Pinktale — Un santuario para tus historias</p>
        </footer>
      </main>
    </>
  );
}
