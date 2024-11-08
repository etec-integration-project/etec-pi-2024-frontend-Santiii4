# Usamos una imagen base de Node.js para construir y ejecutar la aplicación
FROM node:18-alpine

# Establecemos el directorio de trabajo en el contenedor
WORKDIR /app

# Copiamos los archivos de package.json y package-lock.json
COPY package*.json ./

# Instalamos todas las dependencias, incluyendo express
RUN npm install

# Copiamos el resto del código fuente
COPY . .

# Construimos la aplicación para producción
RUN npm run build

# Exponemos el puerto en el que Express servirá la aplicación
EXPOSE 3000

# Comando por defecto para iniciar el servidor Express
CMD ["node", "server.js"]
