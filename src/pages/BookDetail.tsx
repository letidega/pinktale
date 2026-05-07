import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Edit, Share2, MoreVertical, Heart, Star, Calendar, Loader2, BookOpen } from "lucide-react";
import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import BackgroundDecorations from "../components/BackgroundDecorations";

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [source, setSource] = useState<'supabase' | 'google'>('supabase');

  useEffect(() => {
    const fetchBook = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        
        // Try Supabase first (if it's a UUID-like string)
        const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(id);
        
        if (isUuid) {
          const { data, error } = await supabase
            .from('books')
            .select('*')
            .eq('id', id)
            .single();
            
          if (data) {
            setBook(data);
            setSource('supabase');
            setIsLoading(false);
            return;
          }
        }

        // Fallback to Google Books
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
        if(res.ok) {
           const data = await res.json();
           setBook(data);
           setSource('google');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (isLoading) {
    return (
       <div className="min-h-screen flex items-center justify-center bg-background watercolor-bg">
         <BackgroundDecorations />
         <Loader2 className="w-8 h-8 text-primary animate-spin" />
       </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background watercolor-bg p-6">
        <BackgroundDecorations />
        <BookOpen className="w-16 h-16 text-primary-container mb-4" />
        <h1 className="text-2xl font-bold text-primary mb-2">Libro no encontrado</h1>
        <p className="text-on-surface-variant mb-6 text-center">No pudimos encontrar la historia que buscas en tu estante.</p>
        <Link to="/library" className="bg-primary text-on-primary px-6 py-2 rounded-full font-bold">Volver al estante</Link>
      </div>
    );
  }

  // Normalize data between Supabase and Google Books
  const isSupabase = source === 'supabase';
  const volumeInfo = book?.volumeInfo || {};
  
  const title = isSupabase ? book.title : volumeInfo.title;
  const author = isSupabase ? book.author : (volumeInfo.authors?.join(", ") || "Autor desconocido");
  const cover = isSupabase 
    ? book.cover 
    : (volumeInfo.imageLinks?.thumbnail ? volumeInfo.imageLinks.thumbnail.replace('zoom=1', 'zoom=3') : null);
  const pageCount = isSupabase ? (book.pages || "?") : (volumeInfo.pageCount || "?");
  const publishedDate = isSupabase 
    ? (book.published_year || "?") 
    : (volumeInfo.publishedDate?.split('-')[0] || "?");
  const synopsis = isSupabase 
    ? book.notes 
    : (volumeInfo.description?.replace(/<[^>]+>/g, '') || "Sin sinopsis disponible.");
  const rating = isSupabase ? (book.rating || 0) : 0;
  const startDate = isSupabase ? book.start_date : null;
  const endDate = isSupabase ? book.end_date : null;

  return (
    <div className="bg-background font-body-md text-on-background min-h-screen relative watercolor-bg">
      <BackgroundDecorations />
      {/* Top Navigation */}
      <header className="fixed top-0 z-40 w-full bg-white/40 backdrop-blur-md border-b border-[#A86B6B]/10 shadow-sm flex justify-between items-center px-4 md:px-8 py-4">
        <Link to="/library" className="flex items-center gap-2 text-secondary hover:text-primary transition-colors font-label-md">
          <ArrowLeft className="w-5 h-5" />
          <span>Volver al estante</span>
        </Link>
        <div className="flex gap-2">
          <button 
            onClick={() => alert("Compartir esta lectura con tus amigas")}
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors"
          >
            <Share2 className="w-5 h-5" />
          </button>
          <button 
            onClick={() => alert("Más opciones: Marcar como leído, Archivar, Eliminar")}
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors"
          >
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>
      </header>

      <main className="pt-24 pb-section-margin px-container-padding max-w-5xl mx-auto w-full relative z-10">
        
        {/* Decorative Background specifically for this page */}
        <div className="absolute top-0 right-0 w-full md:w-1/2 h-96 opacity-10 pointer-events-none -z-10">
          <div className="w-full h-full bg-gradient-to-br from-primary/20 to-transparent blur-3xl"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
          {/* Left Column: Cover & Quick Actions */}
          <div className="md:col-span-4 lg:col-span-3 flex flex-col items-center md:items-start gap-6">
            <div className="w-full max-w-[240px] md:max-w-full aspect-[2/3] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(168,107,107,0.2)] border-2 border-white relative group bg-stone-100 flex items-center justify-center">
              {cover ? (
                <img 
                  alt={title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                  src={cover}
                />
              ) : (
                <BookOpen className="w-20 h-20 text-stone-300" />
              )}
              {/* Reading Status Badge */}
              {isSupabase && (
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-primary px-3 py-1 rounded-full font-label-md text-[12px] font-bold shadow-sm uppercase tracking-wider">
                  {book.status === 'read' ? 'Leído' : book.status === 'reading' ? 'Leyendo' : 'Por leer'}
                </div>
              )}
            </div>

            <Link to={`/edit/${id}`} className="w-full max-w-[240px] md:max-w-full flex items-center justify-center gap-2 bg-primary-container text-on-primary-container px-4 py-3 rounded-xl font-label-md hover:bg-secondary-container transition-colors shadow-sm active:scale-95">
              <Edit className="w-4 h-4" />
              Editar lectura
            </Link>

            {/* Quick Stats */}
            <div className="bg-surface-container-low rounded-xl p-4 w-full max-w-[240px] md:max-w-full border border-outline-variant/30 flex justify-around">
               <div className="text-center">
                 <p className="font-caption text-[11px] uppercase tracking-widest text-outline mb-1">Páginas</p>
                 <p className="font-h3 text-[18px] font-bold text-on-surface">{pageCount}</p>
               </div>
               <div className="w-px bg-outline-variant/50"></div>
               <div className="text-center">
                 <p className="font-caption text-[11px] uppercase tracking-widest text-outline mb-1">Publicado</p>
                 <p className="font-h3 text-[18px] font-bold text-on-surface">{publishedDate}</p>
               </div>
            </div>
          </div>

          {/* Right Column: Title, Metadata, Notes */}
          <div className="md:col-span-8 lg:col-span-9 flex flex-col">
            <div className="mb-8 text-center md:text-left">
              <h1 className="font-h1 text-[40px] md:text-[56px] font-bold text-primary mb-2 leading-tight">{title}</h1>
              <p className="font-body-lg text-[22px] text-on-surface-variant italic font-serif opacity-80 mb-6">{author}</p>

              <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-6">
                <div className="flex items-center gap-1 bg-surface-container-highest px-3 py-1.5 rounded-full">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <Star key={s} className={`w-4 h-4 ${s <= rating ? "fill-tertiary text-tertiary" : "text-outline-variant"}`} />
                  ))}
                </div>
                {isSupabase && book.favorite && (
                  <div className="flex items-center gap-2">
                     <Heart className="w-5 h-5 text-secondary fill-secondary" />
                     <span className="font-label-md text-secondary">Favorito</span>
                  </div>
                )}
              </div>

              {/* Tags */}
              {isSupabase && book.genre && (
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-8">
                  <span className="bg-surface-container-low border border-outline-variant/30 text-on-surface px-4 py-1.5 rounded-full font-label-md text-[13px]">{book.genre}</span>
                </div>
              )}
            </div>

            {/* Synopsis / Notes */}
            <h2 className="font-h2 text-[24px] font-bold text-on-surface mb-4 flex items-center gap-2 border-b border-primary-container/30 pb-4">
               {isSupabase ? "Mis pensamientos" : "Sinopsis"}
            </h2>
            <div className="bg-surface-container-lowest/50 rounded-2xl p-6 mb-8 text-on-surface-variant font-body-md leading-relaxed">
              <p>{synopsis || "No hay notas aún."}</p>
            </div>

            {/* Reading Journey */}
            {isSupabase && (startDate || endDate) && (
              <>
                <h2 className="font-h2 text-[24px] font-bold text-on-surface mb-6 flex items-center gap-2 border-b border-primary-container/30 pb-4">
                   Mi viaje por estas páginas
                </h2>

                <div className="bg-white/60 backdrop-blur-sm rounded-[24px] p-6 md:p-8 shadow-[0_8px_30px_rgba(168,107,107,0.05)] border border-primary-container/20 mb-8">
                  <div className="flex items-center gap-6">
                     {startDate && (
                       <div className="flex bg-surface-container rounded-lg p-3 gap-3 items-center">
                          <Calendar className="w-5 h-5 text-secondary" />
                          <div>
                            <p className="font-caption text-[11px] uppercase tracking-wider text-outline mb-0.5">Inicio</p>
                            <p className="font-label-md text-[14px]">{new Date(startDate).toLocaleDateString()}</p>
                          </div>
                       </div>
                     )}
                     {endDate && (
                       <div className="flex bg-surface-container rounded-lg p-3 gap-3 items-center">
                          <Calendar className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-caption text-[11px] uppercase tracking-wider text-outline mb-0.5">Fin</p>
                            <p className="font-label-md text-[14px]">{new Date(endDate).toLocaleDateString()}</p>
                          </div>
                       </div>
                     )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
