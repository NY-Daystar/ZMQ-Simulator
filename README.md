# ZMQ-simulator

**_Version: v1.0.0_**

[![ci](https://github.com/NY-Daystar/zmq-simulator/actions/workflows/go.yml/badge.svg?branch=master)](https://github.com/NY-Daystar/zmq-simulator/actions)
[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)
[![Version](https://img.shields.io/github/tag/Ny-daystar/zmq-simulator.svg)](https://github.com/NY-Daystar/zmq-simulator/releases)
[![Total views](https://img.shields.io/sourcegraph/rrc/github.com/NY-Daystar/zmq-simulator.svg)](https://sourcegraph.com/github.com/NY-Daystar/zmq-simulator)

![GitHub watchers](https://img.shields.io/github/watchers/ny-daystar/zmq-simulator)
![GitHub forks](https://img.shields.io/github/forks/ny-daystar/zmq-simulator)
![GitHub Repo stars](https://img.shields.io/github/stars/ny-daystar/zmq-simulator)
![GitHub repo size](https://img.shields.io/github/repo-size/ny-daystar/zmq-simulator)
![GitHub language count](https://img.shields.io/github/languages/count/ny-daystar/zmq-simulator)
![GitHub top language](https://img.shields.io/github/languages/top/ny-daystar/zmq-simulator)
<a href="https://codeclimate.com/github/ny-daystar/zmq-simulator/maintainability"><img src="https://api.codeclimate.com/v1/badges/715c6f3ffb08de5ca621/maintainability" /></a>  
![GitHub commit activity (branch)](https://img.shields.io/github/commit-activity/m/ny-daystar/zmq-simulator/main)
![GitHub issues](https://img.shields.io/github/issues/ny-daystar/zmq-simulator)
![GitHub closed issues](https://img.shields.io/github/issues-closed-raw/ny-daystar/zmq-simulator)
[![All Contributors](https://img.shields.io/badge/all_contributors-1-blue.svg?style=circular)](#contributors)

![Javascript](https://img.shields.io/badge/-JavaScript-333333?style=flat&logo=javascript)

ZeroMQ protocol simulator to send asynchrone data messages.  
You can send it in specific queues for any javascript application.  
Useful in interapplication in the same host  
To know about [ZeroMQ](https://zeromq.org/)

TODO screen log simulateur + gui

<!-- ![Graphic user interface](./docs/graphicmode.png)
![Settings](./docs/settings.png) -->

Source code analysed with [DeepSource](https://deepsource.com/)

## Index

- [Prerequisites](#prerequisites)
- [Get started](#get-started)
- [Launch simulator](#launch-simulator)
- [Commands list](#commands-list)
- [VS Code](#vs-code)
- [Suggestions](#suggestions)
- [Credits](#credits)

## Prérequis

- [NodeJs](https://nodejs.org/) >= v24.0.0

## Get started

1. Install node js If you don't have nodejs, you need to install it

```bash
$ sudo apt-get install nodejs
$ npm install -g npm@latest
```

2. Clone repository

```bash
git clone git@github.com:NY-Daystar/ZMQ-Simulator.git
cd ZMQ-Simulator
```

3. Install dependencies

```bash
npm install
```

4. Set configuration

```bash
cp .env.example .env
# open .env and modify the environment variables (if needed)
```

TODO expliquer le fichier

5. Launch application  
   TODO with docker

```
npm start
```

## Launch simulator

The simulator will produce message with zmq protocol The GUI will consume this message

```bash
npm start
```

##### Execute linter

```bash
npm run check
```

TODO A DETAILLER

```js
		"test:coverage": "jest --coverage",
		"test:coverageall": "jest -i --coverage --coverageReporters=text-lcov | coveralls",
		"lint": "eslint .",
		"lint:fix": "eslint . --fix",
		"prettier": "prettier --check **/*.js",
		"prettier:fix": "prettier --write **/*.js"
```

### Execute unit tests

Unit tests executed with jest

```bash
npm run test
```

## VS Code

Si vous utiliser VS Code, vous pouvez ajouter vos settings dans le path `.vscode/settings.json`.

Vous avez besoin d'installer ces plugins également

- `prettier`: Formatteur de code source [prettier](https://prettier.io/)
- `eslint`: Validateur de code source [eslint](https://eslint.org/)

Pour vérifier avec eslint

```bash
$ npm run check
```

## Suggestions

- To make a pull request: https://github.com/NY-Daystar/corpos-christie/pulls
- To summon an issue: https://github.com/NY-Daystar/corpos-christie/issues
- For any specific demand by mail: luc4snoga@gmail.com

## Credits

Made by Lucas Noga.  
Licensed under GPLv3.
