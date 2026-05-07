import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { Flower2, Upload, BookOpen, Quote, Calendar, Star, CheckCircle2, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function AddBook() {
  const location = useLocation();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [status, setStatus] = useState("to-read");
  const [notes, setNotes] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rating, setRating] = useState(0);
  const [cover, setCover] = useState("");
  
  const [isSaving, setIsSaving] = useState(false);
  const [showSaved, setShowSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (location.state) {
      if (location.state.title) setTitle(location.state.title);
      if (location.state.author) setAuthor(location.state.author);
      if (location.state.cover) setCover(location.state.cover);
    }
  }, [location.state]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) {
      setError("El título es obligatorio");
      return;
    }

    try {
      setIsSaving(true);
      setError(null);

      const { error: insertError } = await supabase
        .from('books')
        .insert([
          {
            title,
            author,
            genre,
            status,
            notes,
            rating,
            start_date: startDate || null,
            end_date: endDate || null,
            cover: cover || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=800&auto=format&fit=crop"
          }
        ]);

      if (insertError) throw insertError;

      setShowSaved(true);
      setTimeout(() => {
        navigate("/library");
      }, 1500);
    } catch (err: any) {
      console.error("Error saving book:", err);
      setError(err.message || "Error al guardar el libro");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <main className="flex-1 md:ml-64 flex flex-col min-h-screen">
      {/* Mobile TopAppBar purely for padding/safe-area on mobile, assuming standard */}
      <header className="md:hidden w-full h-16 bg-transparent"></header>
      
      <div className="p-container-padding lg:p-section-margin max-w-4xl mx-auto w-full">
        {/* Page Header */}
        <div className="mb-section-margin text-center md:text-left">
          <Link to="/library" className="inline-block text-secondary hover:text-primary transition-colors mb-4 font-label-md italic text-[14px]">← Volver al estante</Link>
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h1 className="font-h1 text-[36px] font-bold text-primary mb-2">Añadir a mi diario</h1>
              <p className="font-body-md text-on-surface-variant italic">Plasma la esencia de tu nueva lectura.</p>
            </div>
            {showSaved && (
              <div className="bg-green-100 text-green-700 px-4 py-2 rounded-xl flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
                <CheckCircle2 className="w-5 h-5" />
                <span>¡Libro guardado con éxito!</span>
              </div>
            )}
            {error && (
              <div className="bg-red-100 text-red-700 px-4 py-2 rounded-xl flex items-center gap-2">
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8 pb-20">
          {/* Main Card */}
          <div className="bg-surface-container-lowest rounded-[24px] border border-primary-container p-6 md:p-10 shadow-[0_8px_30px_rgba(168,107,107,0.08)] relative overflow-hidden">
            {/* Decorative background element inside card */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-fixed-dim/20 rounded-bl-[100px] -z-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              
              {/* Left Column: Cover Image */}
              <div className="md:col-span-4 flex flex-col gap-4">
                <div className="w-full aspect-[2/3] bg-surface-container-low border-2 border-dashed border-primary-container rounded-2xl flex flex-col items-center justify-center text-on-surface-variant hover:bg-primary-container/10 transition-colors cursor-pointer group relative overflow-hidden">
                  {cover ? (
                    <img 
                      alt="Portada del libro" 
                      className="w-full h-full object-cover relative z-10" 
                      src={cover}
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 floral-texture opacity-30"></div>
                      <Upload className="w-8 h-8 mb-4 text-primary-container group-hover:text-primary transition-colors relative z-10" />
                      <span className="font-label-md text-center px-4 relative z-10">Sube la portada<br/><span className="text-[12px] font-normal italic">o elige una ilustración</span></span>
                    </>
                  )}
                </div>
                <div className="flex justify-center gap-2">
                  <button type="button" className="w-10 h-10 rounded-full bg-primary-container/30 hover:bg-primary-container text-primary flex items-center justify-center transition-colors"><Flower2 className="w-5 h-5"/></button>
                  <button type="button" className="w-10 h-10 rounded-full bg-secondary-container/30 hover:bg-secondary-container text-secondary flex items-center justify-center transition-colors"><BookOpen className="w-5 h-5"/></button>
                </div>
              </div>

              {/* Right Column: Book Details */}
              <div className="md:col-span-8 flex flex-col gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block font-label-md text-on-surface-variant mb-1 ml-1" htmlFor="title">Título del libro</label>
                    <input 
                      className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-h3 text-[22px] text-on-surface placeholder:text-outline-variant transition-all outline-none" 
                      id="title" 
                      placeholder="Ej. El Jardín Secreto" 
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block font-label-md text-on-surface-variant mb-1 ml-1" htmlFor="author">Autor/a</label>
                    <input 
                      className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-on-surface placeholder:text-outline-variant italic transition-all outline-none" 
                      id="author" 
                      placeholder="Ej. Frances Hodgson Burnett" 
                      type="text"
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-md text-on-surface-variant mb-1 ml-1" htmlFor="genre">Género</label>
                    <div className="relative">
                      <select 
                        id="genre" 
                        className="w-full appearance-none bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-md py-3 px-4 rounded-xl focus:outline-none focus:border-primary focus:ring-0 italic text-stone-500"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                      >
                        <option value="">Selecciona...</option>
                        <option value="romance">Romance</option>
                        <option value="fantasia">Fantasía</option>
                        <option value="poesia">Poesía</option>
                        <option value="clasico">Clásico</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block font-label-md text-on-surface-variant mb-1 ml-1" htmlFor="status">Estado</label>
                    <div className="relative">
                      <select 
                        id="status" 
                        className="w-full appearance-none bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-md py-3 px-4 rounded-xl focus:outline-none focus:border-primary focus:ring-0 italic text-stone-500"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                      >
                        <option value="to-read">Por leer</option>
                        <option value="reading">Leyendo</option>
                        <option value="read">Leído</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="pt-2">
                  <label className="block font-label-md text-on-surface-variant mb-2 ml-1">Tu valoración</label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star}
                        type="button" 
                        onClick={(e) => {
                          e.preventDefault();
                          setRating(star);
                        }}
                        className={`transition-all duration-200 transform hover:scale-110 active:scale-90 ${star <= rating ? "text-tertiary" : "text-outline-variant hover:text-tertiary/50"}`}
                        aria-label={`Valorar con ${star} estrellas`}
                      >
                        <Star className={`w-8 h-8 ${star <= rating ? "fill-tertiary" : ""}`} />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Personal Notes Section */}
          <div className="bg-surface-container-low rounded-[24px] border border-outline-variant/30 p-6 md:p-10 relative overflow-hidden">
             {/* Journal paper styling overlay */}
             <div className="absolute inset-0 diary-lines opacity-50 pointer-events-none"></div>
             
             <div className="relative z-10 flex gap-4">
               <div className="hidden sm:flex flex-col items-center pt-2">
                 <Quote className="text-primary-container w-8 h-8 rotate-180" />
               </div>
               <div className="flex-1 space-y-4">
                  <label className="block font-h3 text-[22px] font-bold text-on-surface" htmlFor="notes">Mis pensamientos y notas</label>
                  <textarea 
                    id="notes"
                    className="w-full bg-transparent border-none focus:ring-0 p-0 font-body-md text-on-surface placeholder:text-outline-variant italic resize-y min-h-[150px] leading-[32px] outline-none"
                    placeholder="¿Qué te hizo sentir esta historia? Escribe aquí tus citas favoritas o reflexiones..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  ></textarea>
               </div>
             </div>
          </div>

          {/* Dates */}
          <div className="flex flex-wrap gap-6 items-center bg-white/40 p-4 rounded-xl border border-outline-variant/20">
            <div className="flex items-center gap-3">
              <Calendar className="text-secondary w-5 h-5" />
              <div className="flex flex-col">
                <label className="font-caption text-[12px] text-on-surface-variant uppercase tracking-wider" htmlFor="startDate">Inicio de lectura</label>
                <input 
                  id="startDate" 
                  type="date" 
                  className="bg-transparent border-none font-label-md text-on-surface p-0 focus:ring-0 outline-none" 
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
            </div>
            <div className="h-8 w-px bg-outline-variant/50 hidden sm:block"></div>
            <div className="flex items-center gap-3">
              <Calendar className="text-stone-300 w-5 h-5" />
              <div className="flex flex-col">
                <label className="font-caption text-[12px] text-on-surface-variant uppercase tracking-wider" htmlFor="endDate">Fin de lectura</label>
                <input 
                  id="endDate" 
                  type="date" 
                  className="bg-transparent border-none font-label-md text-on-surface p-0 focus:ring-0 outline-none" 
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 mt-8 border-t border-primary-container/20">
            <Link to="/library" className="px-6 py-3 rounded-full font-label-md text-[14px] font-bold text-secondary hover:bg-secondary-container/20 transition-colors">
              Cancelar
            </Link>
            <button 
              type="submit" 
              disabled={isSaving}
              className="flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full hover:bg-secondary transition-colors shadow-[0_4px_14px_rgba(123,84,85,0.4)] active:scale-95 disabled:opacity-50"
            >
              {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Flower2 className="w-4 h-4" />}
              <span className="font-label-md text-[14px] font-bold">
                {isSaving ? "Guardando..." : "Guardar en mi diario"}
              </span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
