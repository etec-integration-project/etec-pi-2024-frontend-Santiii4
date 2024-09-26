# 1. Usamos una imagen base de Node.js para construir la aplicación
FROM node:18 AS build

# 2. Establecemos el directorio de trabajo en el contenedor
WORKDIR /app

# 3. Copiamos los archivos de package.json y package-lock.json
COPY package*.json ./

# 4. Instalamos todas las dependencias, incluyendo express
RUN npm install

# 5. Copiamos el resto del código fuente
COPY . .

# 6. Construimos la aplicación para producción
RUN npm run build

# 7. Usamos una imagen base de Node.js ligera para servir la aplicación
FROM node:18-alpine

# 8. Copiamos los archivos generados en la fase de construcción
COPY --from=build /app/build /app/build

# 9. Copiamos el servidor Express y los archivos necesarios
COPY --from=build /app/node_modules /app/node_modules
COPY --from=build /app/server.js /app/server.js

# 10. Exponemos el puerto en el que Express servirá la aplicación
EXPOSE 3000

# 11. Comando por defecto para iniciar el servidor Express
CMD ["node", "/app/server.js"]



