import { electronApp, is, optimizer } from '@electron-toolkit/utils'
import { BrowserWindow, app, shell } from 'electron'
import { autoUpdater } from 'electron-updater'
import { join } from 'path'

import { API_URL } from '@shared/constants/api.constants'

import { ipcMainApi } from './ipcMainApi'
import { ipcMainWidnow } from './ipcMainWindow'

function createWindow(): void {
  const mainWindow = new BrowserWindow({
    width: 450,
    height: 550,
    minWidth: 450,
    minHeight: 550,
    show: false,
    autoHideMenuBar: true,
    center: true,
    title: 'Профсоюз КСТ v1.2.1',
    icon: join(__dirname, '../build/icon.ico'),
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      sandbox: false
    }
  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.session.webRequest.onHeadersReceived(
    (details, callback) => {
      callback({
        responseHeaders: {
          ...details.responseHeaders,
          'Content-Security-Policy': `default-src 'self'; img-src 'self' ${API_URL.slice(0, -4)} data:; style-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline';`
        }
      })
    }
  )

  mainWindow.webContents.setWindowOpenHandler(details => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })

  //inter process comunicate
  ipcMainApi()
  ipcMainWidnow(mainWindow)

  // HMR for renderer base on electron-vite cli.
  // Load the remote URL for development or the local html file for production.
  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
  }

  autoUpdater.checkForUpdatesAndNotify()
}

app.whenReady().then(() => {
  electronApp.setAppUserModelId('com.electron')

  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })

  createWindow()

  app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
