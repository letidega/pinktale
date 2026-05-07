# 🌸 Pinktale - Mi Refugio de Historias

Pinktale es una aplicación web premium diseñada para amantes de la lectura que desean organizar su biblioteca personal con estilo. Construida con **React**, **Vite**, **Tailwind CSS** y potenciada por **Supabase** y **Gemini AI**.

![Pinktale Banner](https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6)

## ✨ Características

- **Gestión de Biblioteca**: Añade, edita y organiza tus libros por estado (leído, leyendo, pendiente).
- **Búsqueda Inteligente**: Encuentra libros utilizando la API de Google Books.
- **Asistente AI**: Potenciado por Gemini para ayudarte a descubrir nuevas historias.
- **Diseño Premium**: Interfaz fluida con animaciones de Framer Motion y un sistema de diseño "watercolor".
- **Autenticación**: Sistema de registro e inicio de sesión seguro con Supabase.
- **Modo Oscuro**: Disfruta de tu lectura nocturna con un tema oscuro cuidadosamente diseñado.

## 🚀 Instalación Local

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/pinktale.git
   cd pinktale
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Configurar variables de entorno**:
   Crea un archivo `.env.local` en la raíz y añade tus credenciales:
   ```env
   VITE_SUPABASE_URL=tu_url_de_supabase
   VITE_SUPABASE_ANON_KEY=tu_anon_key_de_supabase
   GEMINI_API_KEY=tu_api_key_de_gemini
   ```

4. **Configurar Supabase**:
   Asegúrate de habilitar el proveedor de **Email/Password** en Supabase Auth y crear una tabla llamada `books` con los siguientes campos:
   - `id` (uuid, primary key)
   - `created_at` (timestamptz)
   - `title` (text)
   - `author` (text)
   - `cover` (text)
   - `status` (text: 'read', 'reading', 'to-read')
   - `rating` (int)
   - `review` (text)
   - `user_id` (uuid, reference to auth.users)

5. **Ejecutar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```

## 🌐 Despliegue en Vercel

Este proyecto está listo para ser desplegado en Vercel. Solo necesitas conectar tu repositorio de GitHub y configurar las variables de entorno en el panel de control de Vercel.

El archivo `vercel.json` incluido maneja automáticamente las rutas para React Router.

## 📄 Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.
