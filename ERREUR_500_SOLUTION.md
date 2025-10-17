# 🎯 Erreur 500 - Guide de Résolution Rapide

## ✅ Progrès : L'API fonctionne !

**Avant :** 404 Not Found ❌  
**Maintenant :** 500 Internal Server Error 🔄

L'API existe et répond, mais elle rencontre une erreur lors de l'exécution.

---

## 🔍 Cause probable

L'erreur 500 vient généralement de :

1. **`RESEND_API_KEY` manquante ou invalide** dans Vercel
2. **Erreur d'authentification Resend**
3. **Limite de quota Resend dépassée** (peu probable)

---

## 🚀 Actions à faire MAINTENANT

### 1️⃣ Commiter les dernières modifications

J'ai amélioré le logging pour identifier l'erreur exacte :

```bash
git add .
git commit -m "🐛 Amélioration logging API pour debug erreur 500"
git push origin main
```

### 2️⃣ Attendre le redéploiement (~2 minutes)

Allez sur https://vercel.com/dashboard et attendez que le déploiement soit terminé.

### 3️⃣ Consulter les logs Vercel (CRUCIAL)

1. Dashboard Vercel → Votre projet
2. **Deployments** → Dernier déploiement
3. **Functions** → `send-reservation`
4. **Runtime Logs**

Vous verrez maintenant exactement l'erreur ! Cherchez :

- ❌ `RESEND_API_KEY manquante` → La variable n'est pas configurée
- ❌ `Authentication failed` → La clé API est invalide
- ❌ Autre erreur → Partagez-la moi

### 4️⃣ Vérifier/Recréer la variable d'environnement

1. Dashboard Vercel → **Settings** → **Environment Variables**
2. Vérifiez que **`RESEND_API_KEY`** existe
3. Vérifiez qu'elle commence par `re_`
4. **Si nécessaire, supprimez et recréez-la :**
   - Allez sur https://resend.com/api-keys
   - Créez une nouvelle clé si l'ancienne est invalide
   - Copiez la clé complète
   - Dans Vercel, **Add New** → Variable
   - Name: `RESEND_API_KEY`
   - Value: `re_...` (votre clé complète)
   - Environment: **Production**, **Preview**, **Development** (tous cochés)
   - **Save**

⚠️ **IMPORTANT :** Après modification de la variable, cliquez sur **"Redeploy"** en haut du dashboard.

---

## 🧪 Test rapide après redéploiement

Testez à nouveau le formulaire sur https://leseven-grenoble.fr

**Si ça marche :**
✅ Vous recevrez l'email sur `restaurantleseven38@gmail.com`
✅ Le client recevra une confirmation

**Si erreur 500 persiste :**
Consultez les logs et partagez-moi le message d'erreur exact.

---

## 📊 Ce que les logs devraient montrer

### ✅ Succès :

```
🔔 === NOUVELLE REQUÊTE DE RÉSERVATION ===
✅ RESEND_API_KEY détectée: re_xxxxxxxx...
📅 Date/Heure: ...
✅ Validation des données OK
📧 Envoi de l'email au restaurant...
✅ Email au restaurant envoyé !
📧 Envoi de l'email de confirmation au client...
✅ Email de confirmation envoyé au client !
🎉 === RÉSERVATION TRAITÉE AVEC SUCCÈS ===
```

### ❌ Erreur probable :

```
❌ RESEND_API_KEY manquante dans les variables d'environnement
```

**Solution :** Ajouter la variable dans Vercel Settings

OU

```
❌ === ERREUR LORS DE L'ENVOI ===
Message: Invalid API key
```

**Solution :** La clé est invalide, créez-en une nouvelle sur Resend

---

## 🎯 Résumé des étapes

1. ✅ Commit/Push les modifications
2. ⏳ Attendre le redéploiement
3. 🔍 Consulter les Runtime Logs dans Vercel
4. 🔧 Corriger selon l'erreur détectée
5. 🔄 Redéployer si vous modifiez une variable
6. 🧪 Re-tester le formulaire

---

## 📞 Si vous êtes bloqué

Partagez-moi le message d'erreur exact des **Runtime Logs** et je vous aiderai à résoudre le problème spécifique ! 🚀
