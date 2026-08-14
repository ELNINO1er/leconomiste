# Déploiement Hostinger

Ce projet doit être déployé comme une application **Node.js / Next.js**, et non comme un site statique copié dans `public_html`.

## Configuration

- Version Node.js : `22.x`
- Branche Git : `main`
- Répertoire racine : `/` (le dossier contenant `package.json`)
- Installation : `npm ci`
- Compilation : `npm run build`
- Démarrage : `npm run start`
- Répertoire de sortie : laisser vide

## Après une mise à jour

1. Déployer le dernier commit de `main`.
2. Désactiver le cache de compilation pour ce premier redéploiement, si l’option est proposée.
3. Attendre la fin de `next build` et vérifier que la compilation est réussie.
4. Purger le cache Hostinger et le CDN.
5. Recharger le site avec `Ctrl + F5` ou dans une fenêtre privée.

## Vérification du design

Dans les outils de développement du navigateur, les fichiers sous `/_next/static/chunks/*.css` doivent répondre avec :

- statut HTTP `200` ;
- type MIME `text/css`.

Une réponse `404` signifie que le build ou le cache du déploiement doit être régénéré.
