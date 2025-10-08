# Guide de Déploiement - Haguenau.pro

## Étape 1: Créer une base de données PostgreSQL

### Option A: Supabase (Recommandé - Gratuit)

1. Aller sur [supabase.com](https://supabase.com)
2. Créer un compte et un nouveau projet
3. Attendre que la base de données soit prête
4. Aller dans **Settings** > **Database**
5. Copier la **Connection String** (mode: Session pooling)
6. Activer l'extension PostGIS:
   - Aller dans **SQL Editor**
   - Exécuter: `CREATE EXTENSION IF NOT EXISTS postgis;`

### Option B: Railway

1. Aller sur [railway.app](https://railway.app)
2. Créer un nouveau projet
3. Ajouter un service PostgreSQL
4. Copier la **Connection String**
5. Se connecter via psql et exécuter: `CREATE EXTENSION IF NOT EXISTS postgis;`

### Option C: Neon

1. Aller sur [neon.tech](https://neon.tech)
2. Créer un nouveau projet
3. Copier la **Connection String**
4. Activer PostGIS via le dashboard

## Étape 2: Déployer sur Vercel

### Via l'interface web

1. Aller sur [vercel.com](https://vercel.com)
2. Se connecter avec GitHub
3. Cliquer sur **Add New** > **Project**
4. Importer le repository `lekesiz/haguenau-pro`
5. Configurer les variables d'environnement:

```env
DATABASE_URL=votre_connection_string_postgresql
NEXT_PUBLIC_MAP_CENTER_LAT=48.82
NEXT_PUBLIC_MAP_CENTER_LNG=7.79
NEXT_PUBLIC_DEFAULT_RADIUS=30000
```

6. Cliquer sur **Deploy**

### Via CLI

```bash
# Installer Vercel CLI
npm i -g vercel

# Se connecter
vercel login

# Déployer
vercel --prod

# Ajouter les variables d'environnement
vercel env add DATABASE_URL
vercel env add NEXT_PUBLIC_MAP_CENTER_LAT
vercel env add NEXT_PUBLIC_MAP_CENTER_LNG
vercel env add NEXT_PUBLIC_DEFAULT_RADIUS
```

## Étape 3: Initialiser la base de données

### 3.1 Exécuter les migrations

Après le premier déploiement:

```bash
# Cloner le repo localement si pas déjà fait
git clone https://github.com/lekesiz/haguenau-pro.git
cd haguenau-pro

# Installer les dépendances
pnpm install

# Configurer DATABASE_URL localement
echo "DATABASE_URL=votre_connection_string" > .env

# Générer le client Prisma
pnpm exec prisma generate

# Exécuter les migrations
pnpm exec prisma db push

# Seed les catégories
pnpm exec prisma db seed
```

### 3.2 Importer les données initiales

Option 1: Via l'API (après déploiement)
```bash
curl -X POST https://votre-domaine.vercel.app/api/admin/sync \
  -H "Content-Type: application/json" \
  -d '{"type": "full"}'
```

Option 2: Via script local
```bash
# Créer un script d'import
node scripts/import-data.js
```

## Étape 4: Configurer le domaine personnalisé

### 4.1 Ajouter le domaine dans Vercel

1. Aller dans **Settings** > **Domains**
2. Ajouter `haguenau.pro` et `www.haguenau.pro`
3. Vercel fournira les enregistrements DNS

### 4.2 Configurer les DNS

Chez votre registrar (OVH, Gandi, etc.):

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Étape 5: Configurer le Cron Job

Le cron job est déjà configuré dans `vercel.json` pour s'exécuter chaque lundi à 2h du matin.

Pour vérifier:
1. Aller dans **Settings** > **Cron Jobs** dans Vercel
2. Vérifier que `/api/admin/sync` est listé

Pour tester manuellement:
```bash
curl -X POST https://votre-domaine.vercel.app/api/admin/sync \
  -H "Content-Type: application/json" \
  -d '{"type": "full"}'
```

## Étape 6: Monitoring

### Logs

Voir les logs dans Vercel:
- Aller dans **Deployments** > Sélectionner un deployment > **Functions**
- Cliquer sur une fonction pour voir ses logs

### Analytics

Activer Vercel Analytics:
1. Aller dans **Analytics**
2. Activer **Web Analytics**

### Erreurs

Configurer les alertes:
1. Aller dans **Settings** > **Notifications**
2. Activer les notifications pour les erreurs de déploiement

## Étape 7: Optimisations post-déploiement

### 7.1 Activer la compression

Déjà activé par défaut dans Next.js

### 7.2 Configurer le cache

Les headers de cache sont gérés automatiquement par Next.js et Vercel

### 7.3 Optimiser les images

Next.js Image Optimization est activé automatiquement

## Dépannage

### Erreur: "Cannot connect to database"

- Vérifier que DATABASE_URL est correctement configuré
- Vérifier que l'extension PostGIS est activée
- Vérifier que la base de données accepte les connexions externes

### Erreur: "Module not found: Can't resolve 'leaflet'"

- Vérifier que toutes les dépendances sont installées
- Relancer le build: `vercel --prod --force`

### Le cron job ne s'exécute pas

- Vérifier que le plan Vercel supporte les cron jobs (Pro ou supérieur)
- Vérifier les logs dans **Settings** > **Cron Jobs**

### Les données ne s'affichent pas

- Vérifier que les données ont été importées: `SELECT COUNT(*) FROM businesses;`
- Vérifier les logs de l'API: `/api/businesses`

## Support

Pour toute question:
- Email: contact@netzinformatique.fr
- GitHub Issues: https://github.com/lekesiz/haguenau-pro/issues
