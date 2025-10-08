# Haguenau.pro

Annuaire des entreprises locales de Haguenau et ses environs (30 km).

## Fonctionnalités

- 🗺️ Carte interactive avec tous les commerces
- 🔍 Recherche et filtrage par catégorie
- 📍 Localisation et calcul de distance
- 🔄 Mise à jour automatique des données (OpenStreetMap)
- 🌍 Support multilingue (FR, EN, DE, TR)
- 📱 Design responsive

## Technologies

- **Frontend**: Next.js 15, React 19, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL + PostGIS
- **ORM**: Prisma
- **Data Source**: OpenStreetMap (Overpass API)
- **Deployment**: Vercel

## Installation

### Prérequis

- Node.js 18+
- PostgreSQL 14+ avec extension PostGIS
- pnpm

### Étapes

1. Cloner le repository
```bash
git clone https://github.com/your-username/haguenau-pro.git
cd haguenau-pro
```

2. Installer les dépendances
```bash
pnpm install
```

3. Configurer les variables d'environnement
```bash
cp .env.example .env
# Éditer .env avec vos valeurs
```

4. Créer la base de données
```bash
# Créer une base de données PostgreSQL
createdb haguenau_pro

# Activer l'extension PostGIS
psql haguenau_pro -c "CREATE EXTENSION IF NOT EXISTS postgis;"
```

5. Exécuter les migrations
```bash
pnpm exec prisma migrate dev
```

6. Seed les catégories
```bash
pnpm exec prisma db seed
```

7. Importer les données initiales
```bash
# Via l'API
curl -X POST http://localhost:3000/api/admin/sync \
  -H "Content-Type: application/json" \
  -d '{"type": "full"}'
```

8. Lancer le serveur de développement
```bash
pnpm dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Structure du Projet

```
haguenau-pro/
├── app/
│   ├── api/              # API routes
│   │   ├── businesses/   # Endpoints des entreprises
│   │   ├── categories/   # Endpoints des catégories
│   │   ├── stats/        # Statistiques
│   │   └── admin/        # Administration (sync)
│   ├── globals.css       # Styles globaux
│   ├── layout.tsx        # Layout principal
│   └── page.tsx          # Page d'accueil
├── components/           # Composants React
│   ├── layout/          # Header, Footer, Navigation
│   ├── map/             # Composants carte
│   ├── business/        # Composants entreprise
│   └── ui/              # Composants UI réutilisables
├── lib/                 # Utilitaires
│   ├── prisma.ts        # Client Prisma
│   └── overpass.ts      # Intégration Overpass API
├── prisma/
│   ├── schema.prisma    # Schéma de base de données
│   └── seed.ts          # Données initiales
└── public/              # Assets statiques
```

## API Endpoints

### Publics

- `GET /api/businesses` - Liste des entreprises
  - Query params: `lat`, `lng`, `radius`, `category`, `search`, `page`, `limit`
- `GET /api/businesses/[id]` - Détails d'une entreprise
- `GET /api/categories` - Liste des catégories
- `GET /api/stats` - Statistiques générales

### Admin

- `POST /api/admin/sync` - Lancer une synchronisation
- `GET /api/admin/sync/[id]` - Statut d'une synchronisation

## Déploiement sur Vercel

1. Connecter le repository GitHub à Vercel
2. Configurer les variables d'environnement
3. Ajouter une base de données PostgreSQL (Supabase, Railway, etc.)
4. Déployer

### Cron Job (Mise à jour automatique)

Ajouter dans `vercel.json`:
```json
{
  "crons": [
    {
      "path": "/api/admin/sync",
      "schedule": "0 2 * * 1"
    }
  ]
}
```

## Licence

MIT

## Contact

Pour toute question: contact@netzinformatique.fr
