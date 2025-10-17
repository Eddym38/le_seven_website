# 🎯 Quick Start - Déploiement en 3 étapes

## ✅ Étape 1 : Vérifier la variable d'environnement

Dans votre dashboard Vercel (https://vercel.com) :

```
Settings → Environment Variables → RESEND_API_KEY
```

**✅ Vous avez déjà fait cette étape !**

---

## 🚀 Étape 2 : Déployer

### Option A : Push sur GitHub (Le plus simple)

```bash
git add .
git commit -m "Migration vers API Serverless Vercel"
git push origin main
```

✨ **C'est tout !** Vercel redéploie automatiquement.

### Option B : Via Vercel CLI

```bash
npm run vercel:deploy
```

---

## 🧪 Étape 3 : Tester

1. **Ouvrir votre site** : https://votre-site.vercel.app
2. **Remplir le formulaire** de réservation
3. **Vérifier l'email** sur `restaurantleseven38@gmail.com`

---

## 📊 Voir les logs

Si un problème survient :

1. Allez sur https://vercel.com/dashboard
2. Cliquez sur votre projet
3. **Deployments** → Dernier déploiement
4. **Functions** → `send-reservation`
5. Consultez les logs 📝

---

## 🛠️ Développement local

```bash
# Développement normal (avec Express local)
npm run dev:all

# Tester avec Vercel en local
npm run vercel:dev
```

---

## ❓ Questions fréquentes

### Les emails ne partent pas ?

**Solution 1 :** Vérifiez que `RESEND_API_KEY` est bien dans Vercel

- Dashboard → Settings → Environment Variables

**Solution 2 :** Vérifiez les logs dans Vercel (voir ci-dessus)

**Solution 3 :** Testez votre clé API Resend sur https://resend.com/emails

### Erreur CORS ?

L'API serverless gère déjà CORS automatiquement.
Si le problème persiste, redéployez avec :

```bash
git commit --allow-empty -m "Redéploiement"
git push
```

### Je veux utiliser mon propre domaine email ?

1. Allez sur https://resend.com/domains
2. Ajoutez `leseven-grenoble.fr`
3. Configurez DNS (instructions fournies par Resend)
4. Changez le `from` dans `/api/send-reservation.ts`

---

## 📚 Documentation complète

Consultez `VERCEL_DEPLOYMENT.md` pour plus de détails.
