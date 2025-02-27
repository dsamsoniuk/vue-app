const { app, BrowserWindow, dialog, autoUpdater } = require("electron");
// const { autoUpdater } = require("electron-updater");

let mainWindow;

// autoUpdater.autoDownload = false;

app.whenReady().then(() => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true,
    },
  });

  mainWindow.webContents.openDevTools(); // debugger

  mainWindow.loadFile("index.html");
  autoUpdater.setFeedURL('https://github.com/dsamsoniuk/vue-app');

  autoUpdater.checkForUpdates();
  console.log('start')

  mainWindow.on("closed", () => {
    mainWindow = null;
  });


  // autoUpdater.checkForUpdates();
  // mainWindow.showMessage(`Checking for updates. Current version ${app.getVersion()}`);
});


setInterval(() => {
  autoUpdater.checkForUpdates();
  console.log('sprawdzam' )
}, 15 * 1000); // Co 30s

autoUpdater.on("checking-for-update", () => {
  console.log("Sprawdzanie aktualizacji...");
});

autoUpdater.on("update-available", () => {
  console.log("aktualizacja dostepna");
  dialog.showMessageBox({
      type: "info",
      title: "Aktualizacja dostępna",
      message: "Nowa wersja jest dostępna. Pobieranie aktualizacji...",
      buttons: ["OK"]
  });
});
autoUpdater.on("update-not-available", () => {
  console.log("aktualizacja NIE dostepna");

});

autoUpdater.on("update-downloaded", () => {
  console.log("aktualizacja pobrana...");
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
  console.log("Błąd aktualizacji:", err);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});