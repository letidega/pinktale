import { Link, useParams } from "react-router-dom";
import React, { useState } from "react";
import { Flower2, Upload, BookOpen, Quote, Calendar, Star } from "lucide-react";
import BackgroundDecorations from "../components/BackgroundDecorations";

export default function EditBook() {
  const { id } = useParams();
  const [rating, setRating] = useState(5);

  return (
    <main className="flex-1 md:ml-64 flex flex-col min-h-screen relative">
      <BackgroundDecorations />
      <header className="md:hidden w-full h-16 bg-transparent"></header>
      
      <div className="p-container-padding lg:p-section-margin max-w-4xl mx-auto w-full">
        {/* Page Header */}
        <div className="mb-section-margin text-center md:text-left">
          <Link to={`/book/${id}`} className="inline-block text-secondary hover:text-primary transition-colors mb-4 font-label-md italic text-[14px]">← Cancelar edición</Link>
          <h1 className="font-h1 text-[36px] font-bold text-primary mb-2">Editar lectura</h1>
          <p className="font-body-md text-on-surface-variant italic">Refina los detalles de esta historia.</p>
        </div>

        <form className="space-y-8 pb-20">
          {/* Main Card */}
          <div className="bg-surface-container-lowest rounded-[24px] border border-primary-container p-6 md:p-10 shadow-[0_8px_30px_rgba(168,107,107,0.08)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary-fixed-dim/20 rounded-bl-[100px] -z-10"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
              
              {/* Left Column: Image */}
              <div className="md:col-span-4 flex flex-col gap-4">
                <div className="w-full aspect-[2/3] bg-surface-container rounded-2xl flex flex-col items-center justify-center overflow-hidden cursor-pointer group relative">
                  <img 
                    alt="Orgullo y Prejuicio" 
                    className="w-full h-full object-cover group-hover:blur-sm transition-all" 
                    src="https://covers.openlibrary.org/b/isbn/9780141439518-L.jpg"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/30 transition-opacity">
                    <Upload className="w-8 h-8 text-white" />
                  </div>
                </div>
              </div>

              {/* Right Column: Book Details */}
              <div className="md:col-span-8 flex flex-col gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block font-label-md text-on-surface-variant mb-1 ml-1" htmlFor="title">Título del libro</label>
                    <input 
                      className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-h3 text-[22px] text-on-surface transition-all outline-none" 
                      id="title" 
                      defaultValue="Orgullo y Prejuicio" 
                      type="text"
                    />
                  </div>
                  <div>
                    <label className="block font-label-md text-on-surface-variant mb-1 ml-1" htmlFor="author">Autor/a</label>
                    <input 
                      className="w-full bg-transparent border-0 border-b border-outline-variant focus:border-primary focus:ring-0 px-0 py-2 font-body-md text-on-surface italic transition-all outline-none" 
                      id="author" 
                      defaultValue="Jane Austen" 
                      type="text"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-label-md text-on-surface-variant mb-1 ml-1" htmlFor="genre">Género</label>
                    <div className="relative">
                      <select id="genre" defaultValue="clasico" className="w-full appearance-none bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-md py-3 px-4 rounded-xl focus:outline-none focus:border-primary focus:ring-0 italic">
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
                      <select id="status" defaultValue="leido" className="w-full appearance-none bg-surface-container-low border border-outline-variant/30 text-on-surface font-body-md py-3 px-4 rounded-xl focus:outline-none focus:border-primary focus:ring-0 italic">
                        <option value="por-leer">Por leer</option>
                        <option value="leyendo">Leyendo</option>
                        <option value="leido">Leído</option>
                      </select>
                    </div>
                  </div>
                </div>

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
             <div className="absolute inset-0 diary-lines opacity-50 pointer-events-none"></div>
             <div className="relative z-10 flex gap-4">
               <div className="hidden sm:flex flex-col items-center pt-2">
                 <Quote className="text-primary-container w-8 h-8 rotate-180" />
               </div>
               <div className="flex-1 space-y-4">
                  <label className="block font-h3 text-[22px] font-bold text-on-surface" htmlFor="notes">Mis pensamientos y notas</label>
                  <textarea 
                    id="notes"
                    className="w-full bg-transparent border-none focus:ring-0 p-0 font-body-md text-on-surface italic resize-y min-h-[150px] leading-[32px] outline-none"
                    defaultValue="Es una verdad mundialmente reconocida que un hombre soltero, poseedor de una gran fortuna, necesita una esposa. Con esta icónica frase comienza una de mis lecturas favoritas del año..."
                  ></textarea>
               </div>
             </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-6 mt-8 border-t border-primary-container/20">
            <Link to={`/book/${id}`} className="px-6 py-3 rounded-full font-label-md text-[14px] font-bold text-secondary hover:bg-secondary-container/20 transition-colors">
              Cancelar
            </Link>
            <button type="submit" className="flex items-center gap-2 bg-primary text-on-primary px-8 py-3 rounded-full hover:bg-secondary transition-colors shadow-[0_4px_14px_rgba(123,84,85,0.4)] active:scale-95">
              <span className="font-label-md text-[14px] font-bold">Guardar cambios</span>
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
