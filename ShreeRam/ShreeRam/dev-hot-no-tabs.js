const { app, BrowserWindow } = require('electron')
const path = require('path')

const electronReload = require('electron-reload');
electronReload(__dirname + "/www");

const server = require("./index.js");

function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 1400,
    height: 800,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
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
  })
  //   mainWindow.loadFile('index.html')
  mainWindow.loadURL("http://localhost:8080");
  setTimeout(() => {
    mainWindow.webContents.openDevTools()
  }, 500);
}

app.whenReady().then(() => {
  createWindow()
  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', function () { if (process.platform !== 'darwin') app.quit() })
