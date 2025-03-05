import { app, BrowserWindow, dialog } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
const os = require("os");

const { autoUpdater } = require("electron-updater");
const log = require('electron-log');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

console.log('Mode:', app.isPackaged ? 'Production' : 'Development');

let mainWindow;

let updateUrl = "";
if (os.platform() === "win32") {
    updateUrl = "http://192.168.0.15/downloads/windows";
} else if (os.platform() === "linux") {
    updateUrl = "http://localhost/downloads/linux";
}
autoUpdater.setFeedURL({ provider: "generic", url: updateUrl });

function showMessage(msg){
  mainWindow.webContents.send("show-message", 
    'ver:'+ app.getVersion() + '\n' + msg
  );
}
// log.info('witaj swiecie')

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  // // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
    // mainWindow.loadFile("index.html");
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }
  // mainWindow.loadFile("index.html");
  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  autoUpdater.checkForUpdates();

  showMessage('start')
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});


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


// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
