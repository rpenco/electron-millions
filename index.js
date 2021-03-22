/**
 * Created by rpenco on 06/01/17.
 */
const {app, BrowserWindow} = require('electron');
const path = require('path');
const url = require('url');

// Gardez une référence globale de l'objet fenêtre, sinon, la fenêtre
// sera automatiquement fermée lorsque l'objet JavaScript est récupéré.
let win;

// function createServer(){
// var http = require('http');
// var fs = require('fs');
// var path = require('path');
//
// var srv = http.createServer(function (request, response) {
//   console.log('request starting...');
//
//   var filePath = request.url;
//   if (filePath == '/')
//     filePath = 'index.html';
//
//   var extname = path.extname(filePath);
//   var contentType = 'text/html';
//   switch (extname) {
//     case '.js':
//       contentType = 'text/javascript';
//       break;
//     case '.css':
//       contentType = 'text/css';
//       break;
//     case '.json':
//       contentType = 'application/json';
//       break;
//     case '.png':
//       contentType = 'image/png';
//       break;
//     case '.jpg':
//       contentType = 'image/jpg';
//       break;
//     case '.wav':
//       contentType = 'audio/wav';
//       break;
//   }
//   filePath = __dirname +'/dist/'+ filePath;
//   console.log('filepath: ', filePath);
//   fs.readFile(filePath, function(error, content) {
//     console.log('error', error);
//     if (error) {
//       if(error.code == 'ENOENT'){
//         fs.readFile('./404.html', function(error, content) {
//           response.writeHead(200, { 'Content-Type': contentType });
//           response.end(content, 'utf-8');
//         });
//       }
//       else {
//         response.writeHead(500);
//         response.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
//         response.end();
//       }
//     }
//     else {
//       response.writeHead(200, { 'Content-Type': contentType });
//       response.end(content, 'utf-8');
//     }
//   });
//
// }).listen(8125);
//
// srv.listen(()=>{
//   console.log('server OK')
//   // Créer la fenêtre du navigateur.
//   win = new BrowserWindow({width: 1200, height: 800});
//
//   // charger index_electron.html de l'application.
//   win.loadURL('http://127.0.0.1:8125/');
//   // win.loadURL(url.format({
//   //   pathname: path.join(__dirname, 'index.html'),
//   //   protocol: 'file:',
//   //   slashes: true
//   // }));
//
//   // Ouvrir DevTools.
//   // win.webContents.openDevTools()
//
//   // Émis lorsque la fenêtre est fermée.
//   win.on('closed', () => {
//     // Déréférencer l'objet fenêtre, habituellement vous stocker des fenêtres
//     // dans un tableau si votre application prend en charge plusieurs fenêtres,
//     // c'est l'heure où vous devez supprimer l'élément correspondant.
//     win = null
//   })
// });
//
// console.log('Server running at http://127.0.0.1:8125/');
// }

function createWindow() {
  // createServer();

  // console.log('server OK')
  // Créer la fenêtre du navigateur.
  win = new BrowserWindow({
    width: 1200,
    height: 800});

  // charger index_electron.html de l'application.
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true
  }));

  // Ouvrir DevTools.
  win.webContents.openDevTools();

  // Émis lorsque la fenêtre est fermée.
  win.on('closed', () => {
    // Déréférencer l'objet fenêtre, habituellement vous stocker des fenêtres
    // dans un tableau si votre application prend en charge plusieurs fenêtres,
    // c'est l'heure où vous devez supprimer l'élément correspondant.
    win = null
  })
}

// Cette méthode sera appelée lorsque Electron aura terminé l'initialisation
// et est prét à créer des fenêtres de navigation. Certaines API ne peuvent
// être utilisées qu'après le lancement de cet événement.
app.on('ready', createWindow);

// Quittez lorsque toutes les fenêtres sont fermées.
app.on('window-all-closed', () => {
  // Sur macOS, il est fréquent que les applications et leur barre de menus
  // restent actives jusqu'à ce que l'utilisateur quitte explicitement avec Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // Sur macOS, il est fréquent de recréer une fenêtre dans l'application lorsque
  // l'icône du dock est cliquée et qu'il n'y a pas d'autres fenêtres ouvertes.
  if (win === null) {
    createWindow()
  }
});

// Dans ce fichier, vous pouvez inclure le reste du code du processus principal
// spécifique de votre application. Vous pouvez également les mettres dans des
// fichiers distincts et les écrire ici.
