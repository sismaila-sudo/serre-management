# 🏗️ Gestion Serres - Application de Contrôle Qualité

Application web complète pour la gestion et le contrôle qualité de la construction de serres agricoles.

## ✨ Fonctionnalités

- **Authentification sécurisée** : Inscription/Connexion utilisateur
- **Gestion de projets** : Création et suivi de projets de serres
- **Phases de construction** : 8 étapes détaillées avec guides visuels
- **Checklists interactives** : Suivi des tâches avec photos et notes
- **Guides techniques** : Recommandations adaptées au type de sol/climat
- **Calcul automatique** : Progression globale des projets
- **Responsive** : Interface optimisée mobile/desktop

## 🛠️ Technologies

- **Frontend** : React 18 + Vite
- **Styling** : Tailwind CSS
- **Base de données** : Supabase (PostgreSQL)
- **Authentification** : Supabase Auth
- **Icônes** : Lucide React
- **Hébergement** : Vercel (recommandé)

## 🚀 Installation locale

### Prérequis
- Node.js 18+ 
- npm ou yarn

### 1. Cloner et installer
\`\`\`bash
git clone <votre-repo>
cd projet-serre-claude
npm install
\`\`\`

### 2. Configuration Supabase

#### Créer un projet Supabase
1. Allez sur [supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Notez votre URL et clé API

#### Créer les tables
Exécutez ce SQL dans l'éditeur Supabase :

\`\`\`sql
-- Table des projets
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    client TEXT NOT NULL,
    location TEXT NOT NULL,
    serre_type TEXT NOT NULL,
    soil_type TEXT NOT NULL,
    climate TEXT NOT NULL,
    status TEXT DEFAULT 'new',
    progress INTEGER DEFAULT 0,
    phases JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Politique de sécurité (RLS)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own projects" ON projects
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own projects" ON projects
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own projects" ON projects
    FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own projects" ON projects
    FOR DELETE USING (auth.uid() = user_id);
\`\`\`

### 3. Variables d'environnement
\`\`\`bash
cp .env.example .env
\`\`\`

Modifiez `.env` avec vos clés Supabase :
\`\`\`
VITE_SUPABASE_URL=https://votre-projet.supabase.co
VITE_SUPABASE_ANON_KEY=votre_cle_publique
\`\`\`

### 4. Démarrer l'application
\`\`\`bash
npm run dev
\`\`\`

L'application sera accessible sur `http://localhost:3000`

## 🌐 Déploiement

### Option 1 : Vercel (Recommandé - Gratuit)

1. **Préparer le repository**
   \`\`\`bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <votre-repo-github>
   git push -u origin main
   \`\`\`

2. **Déployer sur Vercel**
   - Allez sur [vercel.com](https://vercel.com)
   - Connectez votre GitHub
   - Importez votre repository
   - Ajoutez les variables d'environnement dans les settings
   - Déployez automatiquement !

### Option 2 : Netlify
1. Connectez votre GitHub à [netlify.com](https://netlify.com)
2. Sélectionnez votre repository
3. Build command : `npm run build`
4. Publish directory : `dist`
5. Ajoutez les variables d'environnement

### Option 3 : Hébergement personnalisé
\`\`\`bash
npm run build
# Uploadez le dossier dist/ sur votre serveur
\`\`\`

## 💰 Coûts estimés

- **Supabase** : Gratuit jusqu'à 50k utilisateurs actifs/mois
- **Vercel** : Gratuit pour projets personnels
- **Domaine personnalisé** : ~10€/an (optionnel)

**Total : GRATUIT** pour commencer ! 🎉

## 📱 Utilisation

### Créer un compte
1. Cliquez sur "Inscription"
2. Remplissez vos informations
3. Vérifiez votre email

### Créer un projet
1. Cliquez sur "Nouveau Projet"
2. Renseignez les détails (client, lieu, type de serre...)
3. Votre projet est créé avec 8 phases prédéfinies

### Suivre la construction
1. Ouvrez votre projet
2. Cliquez sur une phase pour voir le détail
3. Cochez les éléments au fur et à mesure
4. Ajoutez photos et notes
5. Suivez la progression globale

## 🔧 Scripts disponibles

\`\`\`bash
npm run dev      # Développement
npm run build    # Build production
npm run preview  # Prévisualiser le build
\`\`\`

## 🎯 Prochaines fonctionnalités

- [ ] Export PDF des rapports
- [ ] Notifications par email
- [ ] Upload de vraies photos
- [ ] Géolocalisation GPS
- [ ] Templates de projets
- [ ] Tableau de bord admin

## 🆘 Support

- **Issues** : Créez une issue sur GitHub
- **Email** : [votre-email]
- **Documentation** : Consultez ce README

## 📄 Licence

MIT License - Libre d'utilisation

---

**Fait avec ❤️ pour l'agriculture moderne** 🌱

*Projet migré vers Supabase Pro - Décembre 2024*