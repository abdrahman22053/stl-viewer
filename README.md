# 🎨 STL Viewer 3D - Visualisateur de Modèles 3D

Application web moderne et responsive pour visualiser des fichiers STL en 3D, conçue avec React et une stack technologique de pointe. Interface intuitive avec thème light/dark adaptable pour événements tech.

![React](https://img.shields.io/badge/React-18.3-61DAFB?style=flat-square\&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square\&logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=flat-square\&logo=vite)
![Three.js](https://img.shields.io/badge/Three.js-Latest-000000?style=flat-square\&logo=three.js)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square\&logo=tailwind-css)

## ✨ Fonctionnalités Principales

### 🎯 Upload & Gestion de Fichiers

* **Drag & Drop** intuitif avec prévisualisation instantanée
* Validation automatique du format STL et de la taille
* Affichage des métadonnées (nom, taille) avec animations fluides
* Barre de progression élégante avec feedback utilisateur
* Option de remplacement ou réinitialisation du fichier

### 🎮 Visualisation 3D Interactive

* **Contrôles intuitifs** : rotation, zoom, déplacement (OrbitControls)
* Rendu optimisé avec Three.js et React Three Fiber
* Éclairage ambiant et directionnel pour un rendu professionnel
* Grille de référence pour une meilleure orientation spatiale
* Loader animé pendant le chargement du modèle

### 📏 Affichage des Dimensions du Modèle
> **Nouvelle Fonctionnalité** 🔹  
* Calcul automatique de la **largeur**, **hauteur**, et **profondeur** du modèle STL  
* Affichage clair et dynamique des dimensions directement sous le visualiseur  
* Mise à jour instantanée lors du chargement d’un nouveau fichier STL  
* Idéal pour designers, makers et projets de prototypage nécessitant des mesures précises

## 🛠️ Technologies Utilisées

### Core Framework

* **React 18.3** - Framework UI moderne avec hooks
* **TypeScript** - Typage statique pour plus de robustesse
* **Vite 5.0** - Build tool ultra-rapide avec HMR

### 3D & Graphics

* **Three.js** - Bibliothèque 3D WebGL de référence
* **@react-three/fiber** - Renderer React pour Three.js
* **@react-three/drei** - Helpers et abstractions Three.js

### UI & Styling

* **Tailwind CSS** - Framework CSS utility-first
* **shadcn/ui** - Composants UI accessibles et customizables
* **Framer Motion** - Bibliothèque d'animations déclaratives
* **Lucide React** - Icônes SVG modernes et légères

## 📦 Installation et Démarrage

### Prérequis

* **Node.js** 18.x ou supérieur
* **npm** 9.x ou supérieur (ou yarn/pnpm)

### Installation

```bash
# Cloner le repository
git clone <votre-repo-url>
cd stl-viewer-3d

# Installer les dépendances
npm install

# Démarrer le serveur de développement
npm run devل=