const {app, BrowserWindow} = require('electron');
const {Menu} = require('electron');
let win;

function createWindow() {
  Menu.setApplicationMenu(null)
  win = new BrowserWindow({width: 512, height: 512});
  
  win.webContents.openDevTools();
  win.loadFile('./dist/index.html');
}

app.on('ready', createWindow);