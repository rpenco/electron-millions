# STORY 1 - INITIALISATION DU PROJET

1. Creation d'un application angular-cli (webstorm / github) [15 Min]
2.  Installation de bootsrap  [15 Min]
`npm install --save bootstrap@next`

```
"scripts": [
  "../node_modules/jquery/dist/jquery.js",
  "../node_modules/tether/dist/js/tether.js",
  "../node_modules/bootstrap/dist/js/bootstrap.js"
],
```

```
"styles": [
  "../node_modules/bootstrap/dist/css/bootstrap.css",
  "styles.css"
],
```

3. Présentation de l'ensemble [15 Min]

# STORY 2 - ECRAN RESULTAT

1. Ecran principal de visualisation [30 min]
 - Barre de navigation
 - 5 boules et 2 étoiles le tout mis en forme
 - Création d'un pipe pour les gains `MoneyPipe`

2. Données dans le composant en dur[20 min]
 - nouvelle classe Draw (Tirage) contenant les 7 numeros 
 - *ngFor
 
# STORY 3 - CREATION DU SERVICE

1. Creation du service EuroMillionsService [10 min]
2. Déplacement des données du composant dans le service [10 min]

# STORY 4 - LECTURE D'UN FLUX RSS (XML) [60 min]

1. HTTP service 
2. Load XML `http://localhost:4200/assets/rss.xml`
3. Parse XML `DrawParser (fourni)`
4. Async response (Observable) et mise à jour composant
5. Chargement depuis `https://www.lesbonsnumeros.com/rss.xml`


# STORY 5 - REFACTOR [30 min]

2. Creation du composant `Draw`
3. Creation du composant `Nav`


# STORY 6 -  ROUTE [30 min]

1. Creation du composant `DrawResults`
2. Creation du composant `MyDraws`
3. Déclaration des modules `RouterModule` et des routes
4. Routage



# STORY 7 -  MES GRILLES [60 min]

1. Template enregistrement de N grilles
2. Remonter des Inputs vers le composant
3. Stocker/Récupérer les grilles avec le service euromillions (localstorage / possibilté d'utiliser un autre service)


# STORY 8 -  SAVOIR SI ON A GAGNE! [60 min]

1. Mettre a jour le composant de résultat pour mettre la classe `winner`,
si une grille `match({numbers:[], stars:[]})` avec mes grilles.
Utiliser: 

```Typescript
Observable.zip(obs1,obs2, (res1, res2)=>{ 
  for(res1){
    for(res2){
      if(match())
        // TODO 
      }
  }
}).subscribe()
```

# STORY 9 -  ALLEZ PLUS LOIN (CHROME EXTENSION)! [30 min]
1. Creation du `manifest.json`
2. ng build (update angular-cli.json)
3. Ajout à Chrome


# STORY 10 -  ALLEZ PLUS LOIN (ELECTRON)! [45 min]
1. install electron `npm install electron -g` et `electron-builder`
2. Configurer package.json avec `build`et `directories` (linux)
3. Creer le fichier `index.js` permettant de coder electron
4. Créer une copie de `index.html` et Mettre à jour `<base href="./">`
5. Compiler / tester / Installer / Savourer !

# STORY 11 -  ALLEZ PLUS LOIN (ANDROID)! [30 min]
1. Installer Apache Cordova `export ANDROID_HOME=/home/rpenco/Android/Sdk/`
2. Configurer une app et ajouter le support android `cordova create MobileApp` et `cordova platform add android`
3. Tester l'appli vide `cordova run android`
4. Mettre les sources de notre appli et tester
5. Cas du dossier assets



# STORY 12 -  CONCLUSION! [30 min]
1. Angular 2
2. Client Web
3. Client Desktop
4. Client Mobile
