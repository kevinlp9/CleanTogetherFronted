# 🌱 Clean Together - Frontend

Plataforma web para descubrir, crear y participar en eventos de limpieza comunitaria.

## ✨ Características

- 🗺️ **Integración Google Maps API** - Visualiza eventos en un mapa interactivo
- 📍 **Geolocalización** - Encuentra eventos cercanos a tu ubicación (5km configurable)
- 🔐 **Autenticación JWT** - Sistema seguro de login y registro
- ➕ **Crear Eventos** - Crea eventos con ubicación, imagen y detalles
- 👥 **Únete a Eventos** - Participa como voluntario en limpiezas
- 📱 **100% Responsive** - Funciona perfectamente en móvil, tablet y desktop
- 🎨 **Diseño Moderno** - Interfaz atractiva con animaciones fluidas

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.2.0
- **Build Tool:** Vite 7.3.0 (10x más rápido que CRA)
- **Styling:** Tailwind CSS 4.1.18
- **Routing:** React Router DOM 7.11.0
- **HTTP Client:** Axios 1.13.2
- **Maps:** Google Maps API (@react-google-maps/api 2.20.8)
- **Icons:** Lucide React 0.562.0

## 🚀 Quick Start

### Requisitos
- Node.js v24.12.0+
- npm o yarn

### Instalación

```bash
# Clonar repositorio
git clone [tu-repo]
cd clean_together_fronted

# Instalar dependencias
npm install

# Crear archivo .env
cp .env.example .env

# Configurar variables de entorno
VITE_GOOGLE_MAPS_API_KEY=tu_api_key_aqui
```

### Desarrollo

```bash
npm run dev
```

Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

### Build para Producción

```bash
npm run build
npm run preview
```

## 📁 Estructura del Proyecto

```
src/
├── api/
│   └── axios.jsx              # Cliente HTTP con JWT interceptor
├── auth/
│   ├── Login.jsx              # Página de inicio de sesión
│   └── Register.jsx           # Página de registro
├── components/
│   ├── EventCard.jsx          # Componente reutilizable de evento
│   ├── Navbar.jsx             # Barra de navegación
│   ├── Footer.jsx             # Pie de página
│   └── LoadingSpinner.jsx     # Spinner de carga
├── events/
│   ├── AllEvents.jsx          # Todos los eventos (requiere autenticación)
│   ├── NearbyEvents.jsx       # Eventos cercanos por geolocalización
│   ├── CreateEvent.jsx        # Crear nuevo evento con mapa
│   └── EventDetail.jsx        # Detalles del evento con ubicación
├── pages/
│   └── Home.jsx               # Página principal
├── App.jsx                    # Componente raíz
└── main.jsx                   # Entry point
```

## 🔑 Variables de Entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
VITE_GOOGLE_MAPS_API_KEY=tu_api_key_aqui
VITE_API_URL=http://localhost:5099/api
```

## 📡 Endpoints API Principales

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/Auth/login` | Iniciar sesión |
| POST | `/Auth/register` | Registrarse |
| GET | `/events` | Obtener todos los eventos |
| GET | `/events/nearby` | Obtener eventos cercanos por ubicación |
| POST | `/events` | Crear nuevo evento |
| GET | `/events/{id}` | Obtener detalles de un evento |
| POST | `/events/{id}/join` | Unirse a un evento |

## 🎯 Funcionalidades Principales

### 1. Autenticación
- Login con email y contraseña
- JWT token almacenado en localStorage
- Interceptor automático en peticiones HTTP
- Protección de rutas

### 2. Descubrir Eventos
- Geolocalización automática del usuario
- Búsqueda de eventos dentro de 5km
- Lista interactiva de eventos
- Filtrado por proximidad (usando Haversine formula)

### 3. Crear Eventos
- Formulario con validación
- Selección de ubicación en Google Maps
- Upload de imagen
- Especificar fecha, hora y duración

### 4. Detalles del Evento
- Información completa del evento
- Mapa interactivo con ubicación exacta
- Botón para unirse como voluntario
- Contador de participantes

## 🎨 Diseño y UX

- Gradientes atractivos (verde, azul, púrpura)
- Animaciones fluidas con Tailwind CSS
- Iconos intuitivos con Lucide React
- Loading states y error handling
- 100% responsive con breakpoints móvil/tablet/desktop

## 🔐 Autenticación JWT

El proyecto implementa autenticación segura mediante JWT tokens:

1. Usuario inicia sesión → Backend devuelve JWT
2. Token se guarda en localStorage
3. Interceptor de Axios añade el token automáticamente en headers
4. Todas las peticiones incluyen: `Authorization: Bearer {token}`

## 🗺️ Integración Google Maps

- Carga asíncrona de Google Maps API
- Selección de ubicación por click en el mapa
- Visualización de eventos con markers
- Cálculo de distancia con Haversine formula (backend)

## 📱 Responsive Design

Utiliza Tailwind CSS con breakpoints:
- `sm`: 640px (smartphones)
- `md`: 768px (tablets)
- `lg`: 1024px (desktop)
- `xl`: 1280px (large desktop)

## 🚨 Scripts Disponibles

```bash
npm run dev      # Inicia servidor de desarrollo
npm run build    # Build para producción
npm run preview  # Preview del build
npm run lint     # Ejecutar ESLint
```

## 📚 Documentación Adicional

Este proyecto incluye documentación completa para la presentación:

- **PREGUNTAS_PRESENTACION.md** - 15 temas clave y respuestas
- **GUIA_TECNICA_PROFUNDA.md** - Análisis técnico detallado
- **SCRIPT_PRESENTACION.md** - Guión completo para la demo
- **CHEATSHEET_RAPIDO.md** - Referencia rápida
- **PREGUNTAS_Y_RESPUESTAS_RAPIDAS.md** - Q&A por tema
- **INTEGRACION_BACKEND.md** - Documentación de APIs
- **INDICE_DOCUMENTACION.md** - Guía de uso de documentos

## 🤝 Contribuir

Este es un proyecto educativo. Las contribuciones son bienvenidas.

## 📝 Licencia

MIT

## 👨‍💻 Autor

Kevin Atilano Gutierrez

---

**Hecho con ❤️ para crear comunidades más limpias y saludables.**
