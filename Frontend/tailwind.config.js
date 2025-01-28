/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'


export default {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  daisyui:{
    themes:[ {
      mytheme: {
          
        "primary": "#B17457", // Tono cálido y profesional para botones y elementos destacados.
        
        "secondary": "#D8D2C2", // Neutral suave, ideal para fondos secundarios o soporte.
        
        "accent": "#4A4947", // Un tono oscuro que aporta contraste y elegancia.
        
        "neutral": "#FAF7F0", // Fondo principal claro y limpio.
        
        "base-100": "#FFFFFF", // Blanco puro para máxima claridad.
        
        "info": "#9AB7C4", // Azul suave que complementa la paleta para mensajes informativos.
        
        "success": "#A3B18A", // Verde cálido para mensajes de éxito.
        
        "warning": "#E3A663", // Naranja suave para advertencias.
        
        "error": "#B85C5C", // Rojo apagado para errores visibles y serios.
      },
    },]
  },
  plugins: [daisyui],
}

