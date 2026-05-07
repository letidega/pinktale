import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Flower2, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
          },
        },
      });
      if (error) throw error;
      alert("¡Cuenta creada! Revisa tu correo para verificar la cuenta.");
      navigate("/login");
    } catch (err: any) {
      setError(err.message || "Error al crear la cuenta");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex-grow flex items-center justify-center px-gutter py-12 relative z-10 w-full h-full min-h-screen">
      <div className="w-full max-w-md relative z-10">
        {/* Branding Header */}
        <header className="text-center mb-10">
          <h1 className="font-h1 text-[36px] font-bold text-primary italic mb-2">Pinktale</h1>
          <p className="font-body-md text-on-surface-variant italic">Donde tus historias encuentran hogar</p>
        </header>

        {/* Registration Card */}
        <div className="bg-surface-container-lowest/70 backdrop-blur-xl rounded-[24px] border border-primary-container p-10 shadow-[0_20px_50px_rgba(168,107,107,0.08)]">
          <h2 className="font-h2 text-[28px] font-bold text-on-primary-container mb-8 text-center">Únete a nosotros</h2>
          
          <form onSubmit={handleRegister} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl border border-red-100 italic">
                {error}
              </div>
            )}
            {/* Full Name */}
            <div className="group">
              <label className="block font-label-md text-label-md text-on-surface-variant mb-2 ml-1" htmlFor="name">Nombre completo</label>
              <div className="relative">
                <input 
                  className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-4 py-3 italic transition-all duration-300 outline-none" 
                  id="name" 
                  placeholder="Tu nombre aquí..." 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div className="group">
              <label className="block font-label-md text-label-md text-on-surface-variant mb-2 ml-1" htmlFor="email">Correo electrónico</label>
              <div className="relative">
                <input 
                  className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-4 py-3 italic transition-all duration-300 outline-none" 
                  id="email" 
                  placeholder="ejemplo@diario.com" 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="group">
              <label className="block font-label-md text-label-md text-on-surface-variant mb-2 ml-1" htmlFor="password">Contraseña</label>
              <div className="relative">
                <input 
                  className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-4 py-3 italic transition-all duration-300 outline-none" 
                  id="password" 
                  placeholder="Tu secreto mejor guardado..." 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Confirm Password */}
            <div className="group">
              <label className="block font-label-md text-label-md text-on-surface-variant mb-2 ml-1" htmlFor="confirm-password">Confirmar contraseña</label>
              <div className="relative">
                <input 
                  className="w-full bg-transparent border-0 border-b border-outline-variant focus:ring-0 focus:border-primary px-4 py-3 italic transition-all duration-300 outline-none" 
                  id="confirm-password" 
                  placeholder="Repite tu secreto..." 
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button 
                type="submit"
                disabled={loading}
                className="w-full bg-primary-container text-on-primary-container font-h3 text-[22px] py-4 rounded-full flex items-center justify-center gap-3 hover:bg-secondary-container transition-all duration-500 active:scale-95 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed" 
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Flower2 className="w-5 h-5" />}
                Crear mi refugio
              </button>
            </div>
          </form>

          {/* Footer Links inside Card */}
          <div className="mt-8 flex flex-col items-center gap-4">
            <div className="flex items-center gap-4 w-full">
              <div className="h-px bg-outline-variant/30 flex-grow"></div>
              <span className="font-caption text-[12px] text-on-surface-variant italic">o también</span>
              <div className="h-px bg-outline-variant/30 flex-grow"></div>
            </div>
            
            <p className="font-body-md text-on-surface-variant">
              ¿Ya tienes cuenta?{' '}
              <Link className="text-primary font-semibold hover:underline decoration-primary-fixed underline-offset-4 transition-all" to="/login">Iniciar sesión</Link>
            </p>
          </div>
        </div>

        {/* Motivational Quote */}
        <footer className="mt-8 text-center px-4">
          <div className="floral-divider-before floral-divider-after flex items-center justify-center gap-2 mb-3">
            <div className="h-px w-8 bg-primary/20"></div>
          </div>
          <p className="font-caption text-[12px] text-on-surface-variant italic leading-relaxed">
              "Cada página es una nueva oportunidad para florecer."
          </p>
        </footer>
      </div>
    </main>
  );
}
