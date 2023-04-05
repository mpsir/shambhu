const electron = require("electron");
const electronReload = require('electron-reload');
const server = require("./index.js");
const app = electron.app;

process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
electronReload(__dirname);

app.on("ready", function () {
  setTimeout(() => {
    const mainWindow = new electron.BrowserWindow({
      width: 1400,
      height: 800,
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
  
    mainWindow.loadURL("http://localhost:8080/electron.html?page=home_electron");
    setTimeout(() => { mainWindow.webContents.openDevTools() }, 500);
    mainWindow.on("ready-to-show", function () {
      mainWindow.show();
      mainWindow.focus();
    });
  }, 1000);

});

app.on('window-all-closed', () => {
  console.log('ok');
  app.quit()
})