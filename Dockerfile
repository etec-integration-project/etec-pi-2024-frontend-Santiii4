# Etapa 1: Construir la aplicación
FROM node:18-alpine AS build

# Establecemos el directorio de trabajo en el contenedor
WORKDIR /app

# Copiamos los archivos necesarios para instalar dependencias
COPY package*.json ./

# Instalamos las dependencias
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Construimos la aplicación para producción
RUN npm run build

# Etapa 2: Servir la aplicación con NGINX
FROM nginx:latest

# Copiamos los archivos construidos en la primera etapa al directorio de NGINX
COPY --from=build /app/build /usr/share/nginx/html

# Exponemos el puerto 80 para servir la aplicación
EXPOSE 80

# Comando por defecto para iniciar NGINX
CMD ["nginx", "-g", "daemon off;"]

