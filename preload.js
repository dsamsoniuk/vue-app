const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
    onMessage: (callback) => ipcRenderer.on("show-message", (_, message) => callback(message))
});