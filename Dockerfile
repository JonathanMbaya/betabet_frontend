# Utilise une image Node officielle comme base
FROM node:16

# Définir le répertoire de travail dans le conteneur
WORKDIR /app

# Copier les fichiers package.json et package-lock.json
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application React
RUN npm run build

# Exposer le port de l'application
EXPOSE 3001

# Commande pour démarrer l'application React
CMD ["npm", "start"]
