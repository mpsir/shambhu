const electron = require("electron");
const electronReload = require('electron-reload');
electronReload(__dirname + "/www");

const server = require("./index.js");

const app = electron.app;


app.on("ready", function () {
  const mainWindow = new electron.BrowserWindow({
    webPreferences: {
      webviewTag: true,
      webSecurity: false,
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      contextIsolation: false,
      allowRunningInsecureContent: true,
      experimentalFeatures: true,
      enableBlinkFeatures: 'ExecCommandInJavaScript',
      devTools:true,
      nodeIntegrationInSubFrames:true,
      webgl:true
    }
  });
  mainWindow.loadURL("file://" + __dirname + "/hot-tabs.html");
  mainWindow.on("ready-to-show", function () {
    mainWindow.show();
    mainWindow.focus();
  });
});

//
