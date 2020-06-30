# Dashboard

Ce projet est un Dahboard comprenant des widgets pour les services Twitter, Youtube, Spotify et Steam.

## Installation

Pour déployer ce projet, vous aurez besoin d'installer docker ainsi que docker-compose.
Une fois que ceci est fait, rendez-vous dans le dossier ./dashboard/ et lancez la commande suivante dans votre interpréteur bash:

```bash
docker-compose up --build
```

Le projet est alors accessible dans votre navigateur sur 127.0.0.1:3000

## Description

Une fois sur la page du Dashboard, la première étape consiste à se connecter. 
Si vous n'avez pas de compte, il vous sera possible de vous inscrire.

Une fois connecté, vous aurez accès à différents services via la barre de menu à gauche.
Chacun de ses services propose plusieurs widgets qu'il vous sera possible de positionner
selon vos gouts au niveau de la partie dédiée au formatage de votre dashboard.

Chacun des services proposés par notre dashboard propose de s'y connecter afin de pouvoir
utiliser pleinement les fonctionnalités de tous les widgets qu'ils proposent. Afin de pouvoir 
vous connecter à un service, il vous faudra vous rendre sur l'icone engrenage du menu et vous
connecter au service via le compte correspondant à celui-ci.

Notre Dashboard propose les 4 services suivants :
- Spotify
- Steam
- Twitter
- Youtube

Les widgets correspondants à chacuns des services sont listés ci-après.
Un widget marqué d'une astérisque correspond à un widget qui nécéssite l'authentification à son service.

Spotify : 
- (*) Widget qui affiche une des playlists de l'utilisateur connecté
- (*) Widget qui affiche les tops musiques/artistes écoutés et qui, quand on clique affiche un lecteur également

Steam : 
- Widget qui affiche le nombre de joueur sur un jeu spécifié
- Widget qui affiche le prix de la bibliothèque d'un utilisateur que l'on aura renseigné

Twitter : 
- Widget qui affiche les Tweets d'un utilisateur que l'on renseigne
- (*) Widget qui affiche un compteurs (qui se rafraichit toutes les 5 secondes) de followers
- (*) Widget qui affiche les données d'un compte (followers , abonnements, certifié ou non, le @ + un bouton follow)

Youtube :
- (*) Widget qui affiche un compteur d'abonné
- (*) Widget qui affiche des stats spécifiques de la chaîne youtube de l'utilisateur

## Auteurs

Baptiste DUMONT, Damien RADATOVIC, Mathieu REBOUL