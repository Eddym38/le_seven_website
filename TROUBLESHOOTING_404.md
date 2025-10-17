# 🚀 RÉSOLUTION ERREUR 404 - Guide de Déploiement

## ❌ Erreur actuelle

```
POST https://leseven-grenoble.fr/api/send-reservation 404 (Not Found)
```

## ✅ Solutions appliquées

### 1. Configuration Vercel simplifiée

- ✅ Supprimé `builds` et `routes` dépréciés
- ✅ Ajouté configuration automatique pour Vite
- ✅ Créé `.vercelignore` pour exclure les fichiers inutiles

### 2. Structure TypeScript pour API

- ✅ Créé `api/tsconfig.json` pour compilation correcte
- ✅ Fichier `api/send-reservation.ts` prêt

### 3. Ce qu'il faut faire MAINTENANT

#### Étape 1 : Vérifier que les fichiers sont bien dans Git

```bash
# Voir les fichiers non commités
git status

# Vous devriez voir :
# - api/send-reservation.ts
# - api/tsconfig.json
# - vercel.json
# - .vercelignore
```

#### Étape 2 : Commiter et pusher

```bash
git add .
git commit -m "🔧 Fix: Configuration API serverless Vercel"
git push origin main
```

#### Étape 3 : Vérifier le déploiement sur Vercel

1. Allez sur https://vercel.com/dashboard
2. Cliquez sur votre projet **le_seven_website**
3. Attendez que le déploiement soit terminé (≈2 minutes)
4. Cliquez sur **"Visit"** pour tester

#### Étape 4 : Vérifier que l'API est déployée

Dans votre navigateur, ouvrez :

```
https://leseven-grenoble.fr/api/send-reservation
```

**Vous devriez voir :**

```json
{ "error": "Méthode non autorisée" }
```

✅ **C'est normal !** Ça prouve que l'API existe (elle refuse juste les GET, elle attend du POST).

---

## 🧪 Test complet

### Test 1 : Tester l'API avec curl

```bash
curl -X POST https://leseven-grenoble.fr/api/send-reservation \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test API",
    "email": "test@example.com",
    "phone": "+33 6 12 34 56 78",
    "guests": "2",
    "date": "2025-11-01",
    "time": "20:00",
    "message": "Test depuis curl"
  }'
```

**Résultat attendu :**

```json
{ "success": true, "message": "Réservation envoyée avec succès" }
```

### Test 2 : Tester depuis le site

1. Ouvrez https://leseven-grenoble.fr
2. Scrollez jusqu'au formulaire de réservation
3. Remplissez les champs
4. Cliquez sur "Confirmer la réservation"
5. Vérifiez l'email sur `restaurantleseven38@gmail.com`

---

## 🔍 Débogage si ça ne marche toujours pas

### Vérifier les logs Vercel

1. Dashboard Vercel → **Deployments**
2. Cliquez sur le dernier déploiement
3. Onglet **"Build Logs"** - vérifier qu'il n'y a pas d'erreur
4. Onglet **"Functions"** - vérifier que `send-reservation` apparaît
5. Cliquez sur `send-reservation` → **Runtime Logs**

### Si l'API n'apparaît pas dans Functions

Le dossier `/api` n'a peut-être pas été déployé. Vérifiez :

```bash
# Vérifier que le fichier est bien tracké par Git
git ls-files | grep api

# Devrait afficher :
# api/send-reservation.ts
# api/tsconfig.json
```

Si rien n'apparaît :

```bash
git add api/
git commit -m "Add API folder"
git push origin main
```

### Si vous avez une erreur TypeScript

Vercel compile automatiquement TypeScript, mais si ça échoue :

1. Allez dans **Project Settings** → **General**
2. Scrollez jusqu'à **"Node.js Version"**
3. Sélectionnez **"20.x"** (recommandé)
4. **Save** et redéployez

---

## 📋 Checklist finale

Avant de tester :

- [ ] ✅ Tous les fichiers sont commités (`git status` est propre)
- [ ] ✅ Les changements sont pushés sur GitHub
- [ ] ✅ Vercel a redéployé (vérifier l'heure du dernier déploiement)
- [ ] ✅ La variable `RESEND_API_KEY` est dans Vercel Settings
- [ ] ✅ L'API répond (même avec erreur 405 pour GET)
- [ ] ✅ Le formulaire est testé sur le site en production

---

## 🆘 Toujours 404 ?

Si après tout ça vous avez encore 404, deux possibilités :

### Option A : Forcer un redéploiement

```bash
git commit --allow-empty -m "Force redeploy"
git push origin main
```

### Option B : Vérifier la configuration Git dans Vercel

1. Dashboard Vercel → **Settings** → **Git**
2. Vérifier que **"Production Branch"** = `main`
3. Vérifier que **"Auto Deploy"** est activé

### Option C : Vérifier le Root Directory

1. Dashboard Vercel → **Settings** → **General**
2. **"Root Directory"** doit être **vide** ou **"."**
3. Si c'est autre chose, mettez **"."** et sauvegardez

---

## 📞 Support

Si rien ne fonctionne, consultez les logs dans :

- Vercel Dashboard → Deployments → Functions → send-reservation → Runtime Logs

Les logs montreront exactement ce qui ne va pas.
