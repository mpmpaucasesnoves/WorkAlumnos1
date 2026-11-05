FROM node:18-alpine

WORKDIR /app

# Copiamos package.json y package-lock.json para aprovechar el almacenamiento en caché, y le asignamos la propiedad a node
# Utilizamos node como nombre de usuario y grupo, pudiendo utilizar cualquier otro.
COPY --chown=node:node package*.json ./

# Instalamos las dependencias necesarias
RUN npm install

# Copiamos todo el resto de archivos y carpetas del proyecto a la carpeta de trabajo del contenedor
# Ya que pusimos node_modules en el .dockerignore, este paso no copia la carpeta local node_modules, evitando sobreescribir la instalacion limpia y compatible con Alpine del paso anterior.
COPY --chown=node:node . .

# Cambio al usuario sin privilegios
USER node

# Exponemos el puerto de Express
EXPOSE 3000

# Define el comando por defecto que se ejecutara al arrancar el contenedor.
# Tengamos en cuenta que RUN ejecuta mientras se construye la imagen (solo se ejecuta una vez).
# Mientras que CMD se ejecuta cuando el contenedor se pone en marcha (docker start o docker compose up).
CMD ["node", "app.js"]
