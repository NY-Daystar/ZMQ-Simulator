# ZMQ-simulator

TODO REPRENDRE README Corpos-christie

TODO METTRE LES BADGE

TODO METTRE EN ANGLAIS

Simulateur ZMQ permettant d'envoyer des messages de manière asynchrone dans un
canal pour une application javascript

**Version: v1.0.0**

## Prérequis

-   [NodeJs](https://nodejs.org/) >= v24.0.0

## Sommaire

-   [Prérequis](#prérequis)
-   [Démarrage](#démarrage)
-   [Lancer le testeur](#lancer-le-tester)
-   [Liste des commandes](#liste-des-commandes)
-   [VS Code](#vs-code)
-   [Credits](#credits)

## Démarrage

Si vous n'avez pas Node.js

```bash
$ sudo apt-get install nodejs
$ npm install -g npm@latest
```

TODO changer l'url du clone

```bash
$ git clone git@gitlab.cruxpool.com:mining-software/zmq-simulator.git
$ cd zmq-simulator
$ npm install
$ npm start
```

# TODO A MODIFIER

## Lancer le testeur

#TODO A CHANGER pour le script html/js

**IMPORTANT: Vérifiez que les deux applications (zmq-simulator et**
**pickminer-launcher) sont tous les deux bind sur le même port pour le socket**
**ZMQ**  
**(current: 5555)**

Puis pour tester différents types de messages regardez
[Liste des commandes](#liste-des-commandes)

## Liste des commandes

Vous pouvez paramétrez plusieurs options

TODO npm run send -- --port=2000

-   `frequency` : (OPTIONNEL) - Interval de temps pour envoyer le message dans
    le channel ZMQ (default: 1sec)
-   `port` : (OPTIONNEL) Le port sur lequel se bind le socket ZMQ
    (default: 5555)
-   `message` : (OPTIONNEL) le type de message envoyé (ex: stats, stats-total,
    gpu, simple)
-   `error`: (OPTIONNEL) l'erreur à envoyer (default: 0)
-   `index`: (OPTIONNEL) l'index du GPU (default: 0)

```bash
$ npm run send # préconfigurer dans package.json
$ npm run send:gpu
$ npm run send:stats
$ npm run send:stats-total
$ node . --index 1 --frequency 1 --message gpu --error 1 --port 5555
$ node . --index 1 --frequency 2 --message gpu --error 2 --port 8000
$ node . --index 1 --frequency 5 --message gpu --error 7 --port 9000
$ node . --index 0 --frequency 15 --message stats --error 8 --port 7000
```

## VS Code

Si vous utiliser VS Code, vous pouvez ajouter vos settings dans le path
`.vscode/settings.json`.

Vous avez besoin d'installer ces plugins également

-   `prettier`: Formatteur de code source [prettier](https://prettier.io/)
-   `eslint`: Validateur de code source [eslint](https://eslint.org/)

Pour vérifier avec eslint

```bash
$ npm run check
```

### Credits

Made by Cruxpool.  
Licensed under GPLv3.
