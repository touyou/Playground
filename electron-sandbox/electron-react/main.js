const {
  app,
  BrowserWindow
} = require('electron');

let win;

function createWindow() {
  win = new BrowserWindow({
    width: 800,
    height: 600
  });
  win.loadFile('index.html');
  if (process.argv.find((arg) => arg === '--debug')) {
    win.webContents.openDevTools();
  }
  win.on('closed', () => {
    win = null;
  });
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
  // macOSでは明示的に終了するまでアクティブになるのが一般的
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win === null) {
    createWindow();
  }
});