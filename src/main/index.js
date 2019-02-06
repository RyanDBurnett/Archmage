// Note - most of this code is the default as-cloned from the electron-webpack repo at
// https://github.com/electron-userland/electron-webpack

import { app, dialog, BrowserWindow, Menu } from 'electron'
import * as path from 'path'
import { format as formatUrl } from 'url'
const fixPath = require('fix-path');

const isDevelopment = process.env.NODE_ENV !== 'production'

// global reference to mainWindow (necessary to prevent window from being garbage collected)
let mainWindow

function createMainWindow() {
  // const window = new BrowserWindow({width: 960, height: 1200, x: 2500, y: 0})
  var windowOptions = {
    width: 320,
    height: 568,
    transparent: true,
    frame: true,
    resizable: true,
    useContentSize: true,
    title: 'Archmage'
  }

  var isWin = process.platform === "win32";

  if (!isDevelopment) {
    fixPath();
  }

  if (isWin) {
    windowOptions.frame = true
  }

  if (isDevelopment && !isWin) {
    windowOptions.x = 1900;
    windowOptions.y = 100;
  }

  const window = new BrowserWindow(windowOptions);

  if (isDevelopment) {
    window.webContents.openDevTools({mode: 'detach'})
  }

  if (isDevelopment) {
    window.loadURL(`http://localhost:${process.env.ELECTRON_WEBPACK_WDS_PORT}`)
  }
  else {
    window.loadURL(formatUrl({
      pathname: path.join(__dirname, 'index.html'),
      protocol: 'file',
      slashes: true
    }))
  }

  window.on('closed', () => {
    mainWindow = null
  })

  window.webContents.on('devtools-opened', () => {
    window.focus()
    setImmediate(() => {
      window.focus()
    })
  })

  return window
}

// quit application when all windows are closed
app.on('window-all-closed', () => {
  // on macOS it is common for applications to stay open until the user explicitly quits
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // on macOS it is common to re-create a window even after all windows have been closed
  if (mainWindow === null) {
    mainWindow = createMainWindow()
  }
})

// create main BrowserWindow when electron is ready
app.on('ready', () => {
  mainWindow = createMainWindow()
})
