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

### 🎓 Tutoriel Interactif
- **Onboarding automatique** au premier lancement
- Guide pas-à-pas avec 4 étapes explicatives
- Effet de blur sur toute la page sauf l'élément mis en avant
- Blocage des interactions pendant le tutoriel
- Navigation intuitive (Précédent/Suivant/Sauter)
- Sauvegarde de l'état de complétion dans localStorage

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
npm run dev
```

L'application sera accessible sur `http://localhost:5173` (port par défaut Vite).

### Scripts Disponibles

```bash
npm run dev          # Démarre le serveur de développement
npm run build        # Compile l'application pour production
npm run preview      # Prévisualise la build de production
npm run lint         # Vérifie le code avec ESLint
```

## 📂 Structure du Projet

```
stl-viewer-3d/
├── src/
│   ├── components/          # Composants React réutilisables
│   │   ├── ui/             # Composants shadcn/ui
│   │   ├── ui/             # Composants shadcn/ui
│   │   ├── FileUpload.tsx  # Gestion upload de fichiers
│   │   ├── STLViewer.tsx   # Visualisateur 3D
│   │   ├── Header.tsx      # En-tête avec navigation
│   │   ├── ThemeToggle.tsx # Bouton de changement de thème
│   │   ├── Tutorial.tsx    # Système de tutoriel interactif
│   │   ├── AnimatedBackground.tsx # Arrière-plan animé
│   │   └── NavLink.tsx     # Lien de navigation personnalisé
│   ├── pages/              # Pages de l'application
│   │   ├── Index.tsx       # Page principale
│   │   └── NotFound.tsx    # Page 404
│   ├── providers/          # Context providers
│   │   └── ThemeProvider.tsx # Provider pour gestion thème
│   ├── hooks/              # Custom React hooks
│   ├── lib/                # Utilitaires et helpers
│   ├── App.tsx             # Composant racine
│   ├── main.tsx            # Point d'entrée de l'app
│   └── index.css           # Styles globaux & design system
├── public/                 # Assets statiques
├── index.html              # Template HTML
├── tailwind.config.ts      # Configuration Tailwind
├── vite.config.ts          # Configuration Vite
└── package.json            # Dépendances et scripts
```

## 🎨 Design System

### Palette de Couleurs

#### Mode Light
- **Primary** : Cyan électrique (`hsl(190 95% 45%)`)
- **Accent** : Orange corail (`hsl(15 90% 55%)`)
- **Background** : Blanc pur (`hsl(0 0% 100%)`)
- **Card** : Gris très clair (`hsl(0 0% 98%)`)

#### Mode Dark
- **Primary** : Cyan lumineux (`hsl(190 95% 55%)`)
- **Accent** : Orange vif (`hsl(15 90% 60%)`)
- **Background** : Bleu foncé (`hsl(220 15% 8%)`)
- **Card** : Bleu sombre (`hsl(220 15% 11%)`)

### Typographie
- **Display** : Orbitron (titres, headings)
- **Body** : Inter (corps de texte)

### Animations
- **Transition smooth** : `cubic-bezier(0.4, 0, 0.2, 1)` - 300ms
- **Transition bounce** : `cubic-bezier(0.68, -0.55, 0.265, 1.55)` - 500ms
- **Float animation** : Translation verticale douce infinie

## 🎯 Bonnes Pratiques Implémentées

### Code Quality
- ✅ **TypeScript strict** pour la sécurité des types
- ✅ **Composants fonctionnels** avec hooks modernes
- ✅ **Séparation des responsabilités** (UI, logique, state)
- ✅ **Props typées** pour tous les composants
- ✅ **Clean code** avec nommage explicite

### Performance
- ✅ **Code splitting** automatique avec Vite
- ✅ **Lazy loading** des composants 3D
- ✅ **Memoization** avec React.memo et useMemo
- ✅ **Optimisation des rendus** Three.js
- ✅ **Tree shaking** des imports non utilisés

### UX/UI
- ✅ **Feedback utilisateur** constant (toasts, loaders)
- ✅ **Animations fluides** et non intrusives
- ✅ **États de chargement** visuels
- ✅ **Gestion d'erreurs** avec messages clairs
- ✅ **Design responsive** mobile-first

### Accessibilité
- ✅ **Sémantique HTML** correcte
- ✅ **Labels ARIA** pour screen readers
- ✅ **Navigation clavier** supportée
- ✅ **Contraste de couleurs** suffisant (WCAG AA)
- ✅ **Focus visible** sur les éléments interactifs

## 🎭 Adaptation pour Événements

Le design est conçu pour être facilement personnalisable :

1. **Couleurs** : Modifiez les variables CSS dans `src/index.css`
2. **Logo** : Remplacez l'icône dans `Header.tsx`
3. **Texte événement** : Éditez le texte dans `Header.tsx`
4. **Arrière-plan** : Ajustez les gradients dans les variables CSS

### Exemple d'adaptation rapide

```css
/* src/index.css - Personnalisation pour votre événement */
:root {
  --primary: 280 100% 60%;        /* Violet */
  --accent: 340 90% 55%;          /* Rose */
  --gradient-primary: linear-gradient(135deg, 
    hsl(280 100% 60%), 
    hsl(300 95% 65%)
  );
}
```

## 🚀 Déploiement

### Netlify (Recommandé)

```bash
# Build de production
npm run build

# Déployer le dossier dist/
```

Configuration Netlify (`netlify.toml`) :
```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

### Vercel

```bash
vercel --prod
```

### Autres Plateformes
Compatible avec : GitHub Pages, Cloudflare Pages, Firebase Hosting, AWS S3/CloudFront

## 📝 Utilisation

### Première Utilisation
Lors de votre première visite, un **tutoriel interactif** s'affiche automatiquement pour vous guider à travers les fonctionnalités de l'application. Vous pouvez :
- Suivre les étapes avec les boutons "Précédent" et "Suivant"
- Sauter le tutoriel à tout moment avec le bouton "X"
- Le tutoriel ne s'affichera plus après complétion (sauvegardé dans localStorage)

### Utilisation Normale
1. **Upload** : Cliquez sur la zone de drop ou faites glisser un fichier STL
2. **Visualisation** : Le modèle 3D s'affiche automatiquement
3. **Navigation 3D** :
   - Clic gauche + déplacement : rotation
   - Molette : zoom
   - Clic droit + déplacement : panoramique
4. **Nouveau fichier** : Cliquez sur "Nouveau fichier" pour recommencer
5. **Thème** : Basculez entre mode clair et sombre avec le bouton en haut à droite

### Réinitialiser le Tutoriel
Pour revoir le tutoriel, exécutez dans la console du navigateur :
```javascript
localStorage.removeItem('stl-viewer-tutorial-completed');
```
Puis rechargez la page.

## 🔧 Personnalisation Avancée

### Personnaliser le Tutoriel

Modifiez `src/components/Tutorial.tsx` pour ajouter ou modifier les étapes :

```typescript
const TUTORIAL_STEPS: TutorialStep[] = [
  {
    id: "header",
    selector: "[data-tutorial='header']",
    title: "Bienvenue !",
    description: "Votre description ici",
    position: "bottom", // top, bottom, left, right, center
  },
  // Ajoutez d'autres étapes...
];
```

N'oubliez pas d'ajouter l'attribut `data-tutorial` aux éléments correspondants dans vos composants.

### Ajouter de nouveaux formats 3D

Modifiez `FileUpload.tsx` pour accepter d'autres formats :

```typescript
const accept = {
  'model/stl': ['.stl'],
  'model/obj': ['.obj'],  // Ajout du format OBJ
  'model/gltf+json': ['.gltf', '.glb']  // Ajout du format GLTF
};
```

### Modifier le rendu 3D

Éditez `STLViewer.tsx` pour ajuster l'éclairage, les matériaux, etc.

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à :
1. Fork le projet
2. Créer une branche feature (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrir une Pull Request



## 👨‍💻 Auteur

Développé avec ❤️ pour les événements tech

## 🙏 Remerciements

- [Three.js](https://threejs.org/) - Bibliothèque 3D WebGL
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) - React renderer pour Three.js
- [shadcn/ui](https://ui.shadcn.com/) - Composants UI de qualité
- [Tailwind CSS](https://tailwindcss.com/) - Framework CSS utility-first
- [Framer Motion](https://www.framer.com/motion/) - Animations React

---

**Note** : Cette application est optimisée pour les événements tech et peut être facilement personnalisée pour correspondre à l'identité visuelle de votre événement. 🎉
