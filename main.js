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

  autoUpdater.checkForUpdates();

  mainWindow.on("closed", () => {
    mainWindow = null;
  });


  // autoUpdater.checkForUpdates();
  // mainWindow.showMessage(`Checking for updates. Current version ${app.getVersion()}`);
});


setInterval(() => {
  autoUpdater.checkForUpdates();
}, 1 * 30 * 1000); // Co 30s

autoUpdater.on("update-available", () => {
  dialog.showMessageBox({
      type: "info",
      title: "Aktualizacja dostępna",
      message: "Nowa wersja jest dostępna. Pobieranie aktualizacji...",
      buttons: ["OK"]
  });
});

autoUpdater.on("update-downloaded", () => {
  dialog.showMessageBox({
      type: "info",
      title: "Aktualizacja gotowa",
      message: "Aplikacja zostanie teraz zaktualizowana.",
      buttons: ["Restartuj"]
  }).then(() => {
      autoUpdater.quitAndInstall();
  });
});


app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});