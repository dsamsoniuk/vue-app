const { app, BrowserWindow, dialog, autoUpdater } = require("electron");
// const { autoUpdater } = require("electron-updater");
// const log = require('electron-log');

let mainWindow;

// log.initialize();
// log.info('Log from the main process');
// autoUpdater.autoDownload = false;
// autoUpdater.logger = log;

function showMessage(msg){
  mainWindow.webContents.send("show-message", 
    'ver:'+ app.getVersion() + '\n' +
    msg
  );
}


app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,  
      contextIsolation: true,
      preload: __dirname + "/preload.js", // Bezpieczeństwo: oddzielamy kod
    },
  });

  mainWindow.webContents.openDevTools(); // debugger

  mainWindow.loadFile("index.html");
  // autoUpdater.setFeedURL('https://github.com/dsamsoniuk/vue-app');

  autoUpdater.checkForUpdates();


  mainWindow.on("closed", () => {
    mainWindow = null;
  });
  showMessage('start')


  // autoUpdater.checkForUpdates();
  // mainWindow.showMessage(`Checking for updates. Current version ${app.getVersion()}`);
});


setInterval(() => {
  autoUpdater.checkForUpdates();
  showMessage('sprawdzam')

}, 6 * 1000); // Co 30s

autoUpdater.on("checking-for-update", () => {
  showMessage('sprawdzam aktualizacje')

});

autoUpdater.on("update-available", () => {
  showMessage("aktualizacja dostepna");
  dialog.showMessageBox({
      type: "info",
      title: "Aktualizacja dostępna",
      message: "Nowa wersja jest dostępna. Pobieranie aktualizacji...",
      buttons: ["OK"]
  });
});

autoUpdater.on("update-not-available", () => {
  showMessage("aktualizacja NIE dostepna");

});

autoUpdater.on("update-downloaded", () => {
  showMessage("aktualizacja pobrana...");
  dialog.showMessageBox({
      type: "info",
      title: "Aktualizacja gotowa",
      message: "Aplikacja zostanie teraz zaktualizowana.",
      buttons: ["Restartuj"]
  }).then(() => {
      autoUpdater.quitAndInstall();
  });
});
autoUpdater.on("error", (err) => {
  showMessage("Błąd aktualizacji:", err);
});


//Global exception handler
// process.on("uncaughtException", function (err) {
//   console.log(err);
// });

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});