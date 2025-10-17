# 🚀 Déploiement Vercel - Guide de Configuration

## 📋 Ce qui a changé

### Architecture Serverless

Votre backend Express traditionnel a été converti en **API Serverless Vercel**.

**Avant :**

- Serveur Express qui tourne en continu
- `npm run server` pour démarrer
- Pas compatible avec Vercel

**Après :**

- Fonction serverless dans `/api/send-reservation.ts`
- S'exécute uniquement quand appelée
- Compatible Vercel ✅

## 🛠️ Configuration Vercel

### 1. Variable d'environnement

Dans votre dashboard Vercel :

1. Allez dans **Settings** → **Environment Variables**
2. Ajoutez : `RESEND_API_KEY` avec votre clé API
3. ✅ Vous avez déjà fait cette étape !

### 2. Structure du projet

```
le_seven_website/
├── api/
│   └── send-reservation.ts    ← Fonction serverless Vercel
├── server/
│   └── api.ts                 ← Ancien backend (pour dev local uniquement)
├── src/
│   └── components/
│       └── ReservationsSection.tsx  ← Met à jour automatiquement l'URL
└── vercel.json                ← Configuration Vercel
```

### 3. Déploiement

#### Option A : Via GitHub (Recommandé)

```bash
# Commiter et pusher les changements
git add .
git commit -m "🚀 Migration vers API Serverless Vercel"
git push origin main
```

Vercel redéploiera automatiquement ! 🎉

#### Option B : Via CLI Vercel

```bash
npm install -g vercel
vercel --prod
```

## 🧪 Test Local

### En développement (avec hot-reload)

```bash
npm run dev:all
```

- Le frontend utilise `http://localhost:3001/api/send-reservation`
- Le serveur Express local fonctionne toujours

### Test de la version production localement

```bash
# Installer Vercel CLI
npm install -g vercel

# Lancer en mode dev Vercel
vercel dev
```

## ✅ Vérification

### 1. Tester l'API en production

Après le déploiement, testez :

```bash
curl -X POST https://votre-site.vercel.app/api/send-reservation \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test",
    "email": "test@example.com",
    "phone": "+33 6 12 34 56 78",
    "guests": "2",
    "date": "2025-11-01",
    "time": "20:00",
    "message": "Test"
  }'
```

### 2. Vérifier les logs

Dans Vercel Dashboard :

1. Allez dans **Deployments**
2. Cliquez sur votre dernier déploiement
3. Allez dans **Functions** → **send-reservation**
4. Consultez les logs en temps réel

### 3. Tester le formulaire

1. Ouvrez votre site Vercel
2. Remplissez le formulaire de réservation
3. Vérifiez que l'email arrive sur `restaurantleseven38@gmail.com`

## 📝 Notes importantes

### Email "From" address

⚠️ J'ai changé l'adresse d'envoi de :

```typescript
from: "Le Seven Restaurant <noreply@leseven-grenoble.fr>";
```

À :

```typescript
from: "Le Seven Restaurant <onboarding@resend.dev>";
```

**Pourquoi ?** Resend nécessite une vérification de domaine pour utiliser une adresse personnalisée. `onboarding@resend.dev` fonctionne immédiatement pour les tests.

**Pour utiliser votre propre domaine :**

1. Allez sur [Resend Dashboard](https://resend.com/domains)
2. Ajoutez votre domaine `leseven-grenoble.fr`
3. Configurez les DNS (SPF, DKIM, DMARC)
4. Une fois vérifié, changez le `from` dans `/api/send-reservation.ts`

### Différences Dev vs Prod

| Environnement  | URL API                                      | Backend                                |
| -------------- | -------------------------------------------- | -------------------------------------- |
| **Local Dev**  | `http://localhost:3001/api/send-reservation` | Express (`server/api.ts`)              |
| **Production** | `/api/send-reservation`                      | Serverless (`api/send-reservation.ts`) |

Le code détecte automatiquement l'environnement grâce à `import.meta.env.DEV`.

## 🔧 Dépannage

### Erreur 500

- Vérifiez que `RESEND_API_KEY` est bien configurée dans Vercel
- Consultez les logs dans Vercel Dashboard

### Email non reçu

- Vérifiez les logs dans Resend Dashboard
- Assurez-vous d'utiliser `onboarding@resend.dev` ou un domaine vérifié

### CORS Error

- Les headers CORS sont déjà configurés dans la fonction serverless
- Si le problème persiste, ajoutez votre domaine Vercel dans les origins

## 🎯 Prochaines étapes

1. ✅ Déployer sur Vercel
2. ✅ Tester le formulaire en production
3. 📧 (Optionnel) Configurer votre propre domaine dans Resend
4. 🛡️ (Recommandé) Ajouter un CAPTCHA pour éviter le spam

## 📚 Ressources

- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [Resend Documentation](https://resend.com/docs)
- [Configuration DNS pour Resend](https://resend.com/docs/send-with-nextjs)
