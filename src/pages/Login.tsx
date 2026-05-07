import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Flower2, Mail, Lock, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabase";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      setError(null);
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Error al iniciar sesión");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex-grow flex items-center justify-center px-gutter py-section-margin relative overflow-hidden">
      {/* Login Card */}
      <section className="relative w-full max-w-md bg-white/70 backdrop-blur-xl border border-primary-container/30 rounded-[24px] shadow-[0_8px_30px_rgba(168,107,107,0.08)] p-8 md:p-12 z-10">
        <header className="text-center mb-10">
          <div className="flex flex-col items-center gap-3">
            <Flower2 className="text-secondary w-12 h-12 stroke-[1.5px]" />
            <h1 className="font-h1 text-[36px] font-bold text-primary">Pinktale</h1>
            <p className="font-h3 text-on-surface-variant italic font-normal text-[22px]">Bienvenida a tu refugio de historias</p>
          </div>
        </header>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div className="bg-red-50 text-red-500 text-sm p-3 rounded-xl border border-red-100 italic">
              {error}
            </div>
          )}
          {/* Email Field */}
          <div className="space-y-2">
            <label className="font-label-md text-on-primary-fixed-variant ml-1" htmlFor="email">Correo electrónico</label>
            <div className="relative">
              <input 
                className="w-full bg-transparent border-0 border-b border-primary-container/50 focus:border-primary focus:ring-0 px-4 py-3 font-body-md italic placeholder:text-stone-400 transition-all outline-none" 
                id="email" 
                placeholder="Escribe tu correo..." 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-300 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="font-label-md text-on-primary-fixed-variant ml-1" htmlFor="password">Contraseña</label>
            <div className="relative">
              <input 
                className="w-full bg-transparent border-0 border-b border-primary-container/50 focus:border-primary focus:ring-0 px-4 py-3 font-body-md italic placeholder:text-stone-400 transition-all outline-none" 
                id="password" 
                placeholder="Tu clave secreta..." 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <Lock className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-300 w-5 h-5 pointer-events-none" />
            </div>
          </div>

          {/* Remember & Forgot */}
          <div className="flex items-center justify-between py-2">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input className="form-checkbox appearance-none w-4 h-4 border border-outline-variant rounded-full checked:bg-primary checked:border-transparent focus:ring-1 focus:ring-primary-container/30 transition-all cursor-pointer relative" type="checkbox"/>
              <span className="font-caption text-stone-500 group-hover:text-primary transition-colors">Recordarme</span>
            </label>
            <a className="font-caption text-[12px] text-secondary hover:underline underline-offset-4 transition-all" href="#">¿Olvidaste tu contraseña?</a>
          </div>

          {/* Primary Action */}
          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-primary-container text-on-primary-container font-label-md py-4 rounded-full shadow-sm hover:shadow-md hover:translate-y-[-1px] active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" 
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Flower2 className="w-5 h-5" />}
            Entrar a mi diario
          </button>
        </form>

        {/* Floral Divider */}
        <div className="flex items-center gap-4 my-10 opacity-40">
          <div className="h-[1px] flex-grow bg-gradient-to-r from-transparent to-primary-container"></div>
          <Flower2 className="text-primary w-4 h-4" />
          <div className="h-[1px] flex-grow bg-gradient-to-l from-transparent to-primary-container"></div>
        </div>

        {/* Footer Link */}
        <p className="text-center font-body-md text-stone-500 text-[16px]">
          ¿Aún no tienes un estante?{' '}
          <Link className="text-secondary font-bold hover:underline underline-offset-4" to="/register">Crea tu cuenta</Link>
        </p>
      </section>
    </main>
  );
}
