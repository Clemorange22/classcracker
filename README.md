<p align="center">
    <img src="src/client/public/logo.jpg" alt="ClassCracker Logo" width="300" />
    <h1>ClassCracker</h1>
</p>

ClassCraker est une webapp qui permet de reconstituer les listes de classe avant la rentrée pour les établissements utilisants EcoleDirecte.

## Fonctionnement

Dans certains établissements scolaires, les comptes EcoleDirecte élèves ont accès au nom de leur classe dans l'API d'EcoleDirecte avant la rentrée.

ClassCracker automatise la récupération de cette information, enregistre le nom et la classe des utilisateurs dans une base de données et leur donne ensuite accès aux listes de classe. Au fur et à mesure que les utilisateurs se connectent à leur compte via la plateforme, les listes se complètent.

## Confidentialité

Le fonctionnement de ClassCracker requiert que le serveur ai accès aux identifiants de connexion des utilisateurs. Cela est indispensable pour pouvoir obtenir leur classe. En revanche, les identifiants ne sont stockés sur le serveur uniquement le temps nécessaire à la complétion de la requête à l'API d'EcoleDirecte.

C'est pourquoi ClassCracker est conçu pour être utilisé par un seul établissement scolaire à la fois.

## Installation

ClassCracker est composé de 2 composants : le client web, et l'api.

Le client requiert la dernière version LTS de node.js, et l'api la dernière version de node 14, il est donc recommandé d'utiliser un outil permettant d'utiliser plusieurs versions de node comme nvm ou volta.

### Téléchargement du code

```
git clone https://github.com/Clemorange22/classcracker.git
cd classcracker
```

### Configuration de l'API

```
cd src/api
pnpm install
cp .env.example .env
```

Vous devez ensuite compléter le fichier .env
Note: La variable SCHOOL_NAME est le nom de votre établissement tel qu'il est indiqué dans la page d'accueil d'EcoleDirecte.

### Lancement de l'API

```
pnpm build
pnpm start
```

### Configuration du client web
```
cd ../client
pnpm install
cp .env.example .env
```
Vous devez ensuite compléter le fichier .env

### Lancement du client web

```
pnpm build
node .output/server/index.mjs
```

### Dernière étape !
Vous devez ensuite configurer un proxy inverse comme nginx