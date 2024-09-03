# 1. Usamos una imagen base de Node.js
FROM node:18 AS build

# 2. Establecemos el directorio de trabajo en el contenedor
WORKDIR /app

# 3. Copiamos los archivos de package.json y package-lock.json
COPY package*.json ./

# 4. Instalamos las dependencias
RUN npm install

# 5. Copiamos el resto del código fuente
COPY . .

# 6. Construimos la aplicación para producción
RUN npm run build

# 7. Usamos una imagen base de nginx para servir los archivos estáticos
FROM nginx:stable-alpine

# 8. Copiamos los archivos generados en la fase de construcción al contenedor Nginx
COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

# 10. Exponemos el puerto en el que Nginx servirá la aplicación
EXPOSE 80

# 11. Comando por defecto para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
