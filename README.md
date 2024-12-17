# ProyectoFinal

**ProyectoFinal** es un proyecto de ecommerce desarrollado con Vue, utilizando **Pinia** para el manejo del estado, **localStorage** para persistencia local, **Firebase** para gestión de datos y autenticación, y una **API externa** para la gestión de usuarios.

---

## Descripción

**FemShop** es una aplicación de ecommerce que permite a los usuarios navegar por productos, añadirlos al carrito y gestionar sus favoritos. La aplicación está diseñada para ser intuitiva y fácil de usar, proporcionando una experiencia de usuario fluida.

---

## Tecnologías Utilizadas

- **Vue**: Framework progresivo de JavaScript para construir interfaces de usuario.
- **Pinia**: Biblioteca de gestión de estado para Vue.
- **Firebase**: Plataforma de desarrollo de aplicaciones que incluye base de datos, autenticación y hosting.
- **localStorage**: API de almacenamiento web para persistir datos en el navegador.
- **API externa**: Utilizada para gestionar usuarios y datos relacionados.

---

## Funcionalidades

- **Navegación de Productos**: Los usuarios pueden ver una lista de productos disponibles. Navegación por categorías.
- **Gestión de Carrito**: Añadir y eliminar productos del carrito de compras.
- **Favoritos**: Añadir y eliminar productos de la lista de favoritos.
- **Autenticación**: Inicio de sesión y registro de usuarios mediante Firebase.
- **Persistencia de Datos**: Uso de localStorage para guardar el estado del carrito y favoritos cuando el usuario no está autenticado.

---
## Recursos

- [Platzi Fake Store API](https://fakeapi.platzi.com/): API utilizada para el login de usuarios
- [Diseño en Figma](https://www.figma.com/proto/5Ohak4z6Gll6JJ0xcWLnvT/e-commerce-(Community)?node-id=0-1&t=dncJvYimsjyJY1Uh-1): El diseño UI fue inspirado en este diseño de Figma.

--- 
## Datos para login de usuarios

| Email            | Contraseña  |
|------------------|-------------|
| john@mail.com    | changeme    |
| maria@mail.com   | 12345       |
| admin@mail.com   | admin123    |

--- 
## Códigos de promociones para usar en el cart
- 20LESS: 20% de descuento
- ALLFREE: 100% de descuento (gratis)
- BLACKFRIDAY: 50% de descuento

--- 

## Instalación

Para ejecutar este proyecto localmente, sigue estos pasos:

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/Jocelyn212/ProyectoFinal.git
   ```

2. **Navega al directorio del proyecto:**

   ```bash
   cd femShop
   ```

3. **Instala las dependencias:**

   ```bash
   npm install
   ```

4. **Configura las variables de entorno:**

   Crea un archivo `.env` en la raíz del proyecto y configura tus variables de entorno, con tus datos de firebase:
   ```bash
   VITE_FIREBASE_API_KEY=
   VITE_FIREBASE_AUTH_DOMAIN=
   VITE_FIREBASE_DATABASE_URL=
   VITE_FIREBASE_PROJECT_ID=
   VITE_FIREBASE_STORAGE_BUCKET=
   VITE_FIREBASE_MESSAGING_SENDER_ID=
   VITE_FIREBASE_APP_ID=
   ```

6. **Inicia el servidor de desarrollo:**

   ```bash
   npm run dev
   ```

---

## Uso

Accede a [FemShop](https://femshop.vercel.app/): para ver la aplicación en acción. Puedes navegar por los productos, añadirlos al carrito, gestionar tus favoritos y más.

---

## Contribución

Si deseas contribuir a este proyecto, sigue los siguientes pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama:

   ```bash
   git checkout -b feature/nueva-funcionalidad
   ```

3. Realiza tus cambios y haz commit:

   ```bash
   git commit -m 'Añadir nueva funcionalidad'
   ```

4. Push a la rama:

   ```bash
   git push origin feature/nueva-funcionalidad
   ```

5. Abre un Pull Request.

---

