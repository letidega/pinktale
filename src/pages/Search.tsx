import { Link, useNavigate } from "react-router-dom";
import { Search as SearchIcon, Sparkles, Flower2, Heart, Plus, BookOpen, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const searchBooks = async () => {
      if (!query.trim()) {
        setResults([]);
        return;
      }
      setIsSearching(true);
      try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=6`);
        const data = await res.json();
        setResults(data.items || []);
      } catch (err) {
        console.error("Error searching books:", err);
      } finally {
        setIsSearching(false);
      }
    };

    const debounce = setTimeout(() => {
      searchBooks();
    }, 500);

    return () => clearTimeout(debounce);
  }, [query]);

  return (
    <main className="flex-1 md:ml-64 flex flex-col min-h-screen relative overflow-hidden">
      {/* Search Header */}
      <header className="w-full pt-16 pb-8 px-container-padding flex justify-center sticky top-0 z-10 bg-background/80 backdrop-blur-md">
        <div className="w-full max-w-2xl relative">
          <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-outline w-6 h-6" />
          <input 
            className="w-full bg-surface-container-low border-b border-outline-variant focus:border-primary focus:ring-0 rounded-t-lg pl-12 pr-4 py-4 font-body-lg text-body-lg text-on-surface placeholder:italic placeholder:text-outline shadow-[0_8px_30px_rgba(168,107,107,0.05)] transition-all outline-none" 
            placeholder="¿Qué historia buscas hoy?" 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </header>

      <div className="flex-1 px-container-padding pb-section-margin w-full max-w-5xl mx-auto flex flex-col gap-section-margin">
        <section className="flex flex-col gap-card-gap">
          <h2 className="font-h3 text-h3 font-bold text-on-surface flex items-center gap-2">
            <Sparkles className="text-primary w-6 h-6" />
            {query.trim() ? "Resultados de búsqueda" : "Descubrimientos recientes"}
          </h2>
          
          {isSearching ? (
             <div className="flex justify-center p-8">
               <Loader2 className="w-8 h-8 text-primary animate-spin" />
             </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-card-gap">
              {results.map((book) => {
                const info = book.volumeInfo;
                const author = info.authors ? info.authors.join(", ") : "Autor desconocido";
                const thumbnail = info.imageLinks?.thumbnail || "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=300&auto=format&fit=crop";
                return (
                  <Link to={`/book/${book.id}`} key={book.id} className="bg-surface-container-lowest border border-primary-container rounded-[24px] p-4 flex gap-4 shadow-[0_4px_20px_rgba(168,107,107,0.05)] hover:shadow-[0_8px_30px_rgba(168,107,107,0.1)] transition-shadow group relative overflow-hidden block">
                    <div className="w-20 h-28 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
                      <img 
                        alt={info.title} 
                        className="w-full h-full object-cover" 
                        src={thumbnail}
                      />
                    </div>
                    <div className="flex flex-col justify-between flex-1 py-1">
                      <div>
                        <h3 className="font-label-md text-label-md font-bold text-on-surface line-clamp-2 mb-1 group-hover:text-primary transition-colors">{info.title}</h3>
                        <p className="font-caption text-[12px] text-on-surface-variant italic line-clamp-1">{author}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4 text-tertiary-container fill-tertiary-container" />
                          <span className="font-caption text-[12px] text-on-surface-variant">{info.averageRating || "4.0"}</span>
                        </div>
                        <button 
                          onClick={(e) => { 
                            e.preventDefault(); 
                            e.stopPropagation();
                            navigate('/add', { state: { title: info.title, author: author, cover: thumbnail } }); 
                          }}
                          className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary-fixed border border-transparent shadow-sm z-20"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          ) : query.trim() ? (
            <p className="text-on-surface-variant italic">No encontramos tesoros con ese nombre...</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-card-gap">
              {/* Book Card 1 */}
              <article className="bg-surface-container-lowest border border-primary-container rounded-[24px] p-4 flex gap-4 shadow-[0_4px_20px_rgba(168,107,107,0.05)] hover:shadow-[0_8px_30px_rgba(168,107,107,0.1)] transition-shadow group relative overflow-hidden">
                <div className="w-20 h-28 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
                  <img 
                    alt="Book Cover" 
                    className="w-full h-full object-cover" 
                    src="https://covers.openlibrary.org/b/isbn/9780141439587-L.jpg"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1 py-1">
                  <div>
                    <h3 className="font-label-md text-label-md font-bold text-on-surface line-clamp-2 mb-1 group-hover:text-primary transition-colors">Emma</h3>
                    <p className="font-caption text-[12px] text-on-surface-variant italic">Jane Austen</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-tertiary-container fill-tertiary-container" />
                      <span className="font-caption text-[12px] text-on-surface-variant">4.8</span>
                    </div>
                    <button 
                      onClick={() => navigate('/add', { state: { title: "Emma", author: "Jane Austen", cover: "https://covers.openlibrary.org/b/isbn/9780141439587-L.jpg" } })}
                      className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary-fixed border border-transparent shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>

              {/* Book Card 2 */}
              <article className="bg-surface-container-lowest border border-primary-container rounded-[24px] p-4 flex gap-4 shadow-[0_4px_20px_rgba(168,107,107,0.05)] hover:shadow-[0_8px_30px_rgba(168,107,107,0.1)] transition-shadow group relative overflow-hidden">
                <div className="w-20 h-28 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
                  <img 
                    alt="Book Cover" 
                    className="w-full h-full object-cover" 
                    src="https://covers.openlibrary.org/b/isbn/9780141439662-L.jpg"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1 py-1">
                  <div>
                    <h3 className="font-label-md text-label-md font-bold text-on-surface line-clamp-2 mb-1 group-hover:text-primary transition-colors">Sentido y Sensibilidad</h3>
                    <p className="font-caption text-[12px] text-on-surface-variant italic">Jane Austen</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-tertiary-container fill-tertiary-container" />
                      <span className="font-caption text-[12px] text-on-surface-variant">4.5</span>
                    </div>
                    <button 
                      onClick={() => navigate('/add', { state: { title: "Sentido y Sensibilidad", author: "Jane Austen", cover: "https://covers.openlibrary.org/b/isbn/9780141439662-L.jpg" } })}
                      className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary-fixed border border-transparent shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>

              {/* Book Card 3 */}
              <article className="bg-surface-container-lowest border border-primary-container rounded-[24px] p-4 flex gap-4 shadow-[0_4px_20px_rgba(168,107,107,0.05)] hover:shadow-[0_8px_30px_rgba(168,107,107,0.1)] transition-shadow group relative overflow-hidden">
                <div className="w-20 h-28 rounded-lg overflow-hidden flex-shrink-0 bg-surface-container">
                  <img 
                    alt="Book Cover" 
                    className="w-full h-full object-cover" 
                    src="https://covers.openlibrary.org/b/isbn/9780140449174-L.jpg"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1 py-1">
                  <div>
                    <h3 className="font-label-md text-[14px] font-bold text-on-surface line-clamp-2 mb-1 group-hover:text-primary transition-colors">Anna Karenina</h3>
                    <p className="font-caption text-[12px] text-on-surface-variant italic">León Tolstoi</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4 text-tertiary-container fill-tertiary-container" />
                      <span className="font-caption text-[12px] text-on-surface-variant">4.9</span>
                    </div>
                    <button 
                      onClick={() => navigate('/add', { state: { title: "Anna Karenina", author: "León Tolstoi", cover: "https://covers.openlibrary.org/b/isbn/9780140449174-L.jpg" } })}
                      className="w-8 h-8 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary-fixed border border-transparent shadow-sm"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            </div>
          )}
        </section>

        <div className="flex items-center gap-4 py-4 w-full opacity-60">
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-outline-variant to-transparent"></div>
          <Flower2 className="text-outline-variant w-4 h-4" />
          <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-outline-variant to-transparent"></div>
        </div>

        {/* Suggestions Bento Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-card-gap">
          {/* Genres */}
          <div className="bg-surface-container-low rounded-[24px] p-6 border border-outline-variant/30 flex flex-col gap-4">
            <h3 className="font-h3 text-h3 font-bold text-on-surface mb-2">Géneros populares</h3>
            <div className="flex flex-wrap gap-2">
              <button 
                onClick={() => setQuery("Romance")}
                className="px-4 py-2 rounded-full border border-tertiary text-on-surface-variant font-label-md text-label-md hover:bg-tertiary-fixed hover:text-on-tertiary-fixed transition-colors flex items-center gap-2"
              >
                <Heart className="w-4 h-4" /> Romance
              </button>
              <button 
                onClick={() => setQuery("Poesía")}
                className="px-4 py-2 rounded-full border border-tertiary text-on-surface-variant font-label-md text-label-md hover:bg-tertiary-fixed hover:text-on-tertiary-fixed transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" /> Poesía
              </button>
              <button 
                onClick={() => setQuery("Ficción Contemporánea")}
                className="px-4 py-2 rounded-full border border-tertiary text-on-surface-variant font-label-md text-label-md hover:bg-tertiary-fixed hover:text-on-tertiary-fixed transition-colors flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" /> Ficción Contemporánea
              </button>
              <button 
                onClick={() => setQuery("Clásicos")}
                className="px-4 py-2 rounded-full border border-tertiary text-on-surface-variant font-label-md text-label-md hover:bg-tertiary-fixed hover:text-on-tertiary-fixed transition-colors flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" /> Clásicos
              </button>
            </div>
          </div>

          {/* Featured Authors */}
          <div className="bg-primary-container/20 rounded-[24px] p-6 border border-primary-container flex flex-col gap-4">
            <h3 className="font-h3 text-h3 font-bold text-on-surface mb-2">Autores destacados</h3>
            <div className="flex flex-col gap-3">
              <Link to="#" className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-secondary-container flex items-center justify-center text-on-secondary-container font-h3 font-bold text-[22px]">A</div>
                <div>
                  <p className="font-label-md font-bold text-[14px] text-on-surface">Amelia Evans</p>
                  <p className="font-caption text-caption text-on-surface-variant italic">12 obras</p>
                </div>
              </Link>
              <Link to="#" className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/50 transition-colors">
                <div className="w-10 h-10 rounded-full bg-tertiary-fixed flex items-center justify-center text-on-tertiary-fixed font-h3 font-bold text-[22px]">M</div>
                <div>
                  <p className="font-label-md font-bold text-[14px] text-on-surface">Mateo Silva</p>
                  <p className="font-caption text-caption text-on-surface-variant italic">8 obras</p>
                </div>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
