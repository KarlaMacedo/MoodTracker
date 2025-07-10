# 🧠 Mood Tracker App – Fullstack MERN

Una aplicación web para registrar y reflexionar sobre tu estado emocional diario. Desarrollada con el stack **MERN (MongoDB, Express, React, Node.js)**, con un diseño limpio, responsivo y profesional. Permite agregar, editar, filtrar y eliminar moods (emociones) de forma segura y amigable. Además de visualizar tus emociones con herramientas gráficas descargables que te ayudan a conocerte mejor.

---

## 🧩 Tecnologías Utilizadas

| Capa        | Tecnología                         |
|-------------|------------------------------------|
| Frontend    | React, Vite, TailwindCSS, DaisyUI  |
| Backend     | Node.js, Express, MongoDB, Mongoose|
| Autenticación | JSON Web Tokens (JWT)           |
| Routing     | React Router DOM                   |
| Estilos     | TailwindCSS + DaisyUI              |
| Estado global | Context API (para modales)      |
| Gráficas      | Chart.js + chartjs-plugin-datalabels |

---

## 🚀 Instalación y ejecución local

### 1. Clona el repositorio
```bash
git clone https://github.com/tuusuario/mood-tracker-app.git
cd mood-tracker-app
```

### 2. Backend – Configuración y ejecución
```bash
cd backend
npm install
```

#### Variables de entorno
Crea un archivo **.env** con el siguiente contenido:
```env
MONGO_URI=tu_uri_de_mongodb
JWT_SECRET=una_clave_secreta_segura
NODE_ENV=tu_node_env
```

#### Ejecutar servidor
El backend se ejecutará en: **http://localhost:5000** con el siguiente comando:
```bash
npm run dev
```

### 2. Frontend – Configuración y ejecución
El frontend se ejecutará en: **http://localhost:5173**
con el siguiente comando:
```bash
cd frontend
npm install
npm run dev
```

⚠️ Asegúrate de que el frontend esté configurado para apuntar al backend en la URL correcta dentro de **src/api/api.js**

## 📁 Estructura del Proyecto
```
.
├── docs/
│   └── swagger.yaml           # Documentación API Swagger
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js         # Configuración Axios
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── modals/
│   │   │   │   ├── DeleteMoodModal.jsx
│   │   │   │   ├── EmotionsWheelModal.jsx
│   │   │   │   ├── MoodFormModal.jsx
│   │   │   │   └── ViewMoodModal.jsx
│   │   │   ├── Alert.jsx
│   │   │   └── Navbar.jsx
│   │   ├── context/
│   │   │   ├── ModalContext.jsx
│   │   │   └── ModalProvider.jsx
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   │   ├── Login.jsx
│   │   │   │   └── Register.jsx
│   │   │   └── moods/
│   │   │       ├── Dashboard.jsx
│   │   │       ├── MoodFilters.jsx
│   │   │       ├── MoodList.jsx
│   │   │       ├── Stats.jsx
│   │   │       └── StatsFilters.jsx
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env              # Variables de entorno frontend
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   └── vite.config.js
│
├── src/                  # Backend
│   ├── controllers/
│   │   ├── authControllers.js
│   │   └── moodControllers.js
│   ├── middleware/
│   │   └── auth.js
│   ├── models/
│   │   ├── Mood.js
│   │   └── Users.js
│   ├── routes/
│   │   ├── auth.js
│   │   └── moods.js
│
├── tests/
│   ├── auth.test.js
│   ├── moods.test.js
│   ├── setup.js
│   └── testHelpers.js
│
├── .env             # Variables de entorno backend
├── .env.test        # Configuración tests backend
├── .gitignore
├── index.js         # Punto de entrada backend (Express)
├── jest.config.js   # Configuración pruebas backend
├── package-lock.json
├── package.json
└── README.md

```

## ✨ Funcionalidades
### ✅ Autenticación
- Registro de nuevos usuarios

- Inicio de sesión con token JWT

- Acceso protegido al dashboard

### ✅ Registro emocional (CRUD)
- Crear nuevo mood con texto y categoría

- Editar o eliminar emociones existentes

- Ver en lista de moods paginada

### ✅ Filtros
- Filtrado por categoría (category)

- Filtrado por emoción (emotion)

- Rango de fechas con validación

- Botón para limpiar filtros fácilmente

### ✅ Estadísticas emocionales (gráficas)
Visualización de:
- Emociones predominantes (gráfica de barras)

- Distribución porcentual de emociones (gráfica de pastel)

- Filtros aplicables sobre las gráficas

- Descarga de gráficas como imagen PNG

### ✅ Modales centralizados
- Uso de ModalContext + ModalProvider para manejar todos los modales del sistema

- Modales dinámicos reutilizables para crear, editar, eliminar y ver moods

### ✅ UX/UI profesional
- Diseño responsive y minimalista con Tailwind + DaisyUI

- Alertas con feedback inmediato tras cada acción

- Validaciones para evitar combinaciones de fechas inválidas

## 🔐 Seguridad
- Protección de rutas con middleware de autenticación (verifyToken)

- JWT en localStorage del frontend

- Validación de entrada en backend y frontend

## 📬 Endpoints principales del Backend
| Método	   |Ruta        	| Descripción      |
|--------------|----------------|------------------|
|POST	|/auth/register	|Registro de usuario|
|POST	|/auth/login	|Inicio de sesión|
|GET	|/mood	|Obtener moods con filtros|
|POST	|/mood	|Crear nuevo mood|
|PUT	|/mood/:id	|Editar un mood|
|DELETE	|/mood/:id	|Eliminar un mood|

## 🧠 Posibles mejoras a futuro
- Exportar moods como CSV o PDF

- Timeline visual e interactivo

- Integrar con calendario

- Notificaciones globales tipo toast

- Animaciones

- Soporte de múltiples idiomas

- Modo oscuro

## 🙋‍♀️ Autora
**Karla**

Desarrolladora fullstack con background en biología y conservación, enfocada en crear herramientas tecnológicas con impacto positivo.

*Disfruta programar, sentir y evolucionar.* 🌱