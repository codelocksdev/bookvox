/* eslint global-require: off, no-console: off, promise/always-return: off */

/**
 * This module executes inside of electron's electron process. You can start
 * electron app process from here and communicate with the other processes
 * through IPC.
 *
 * When running `npm run build` or `npm run build:electron`, this file is compiled to
 * `./src/electron.js` using webpack. This gives us some performance wins.
 */
import path from 'path';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import MenuBuilder from './menu';
import { resolveHtmlPath } from './util';
import { IpcHandlerInterface } from './ipc/IpcHandlerInterface';
import TextFileBatchChannel from './ipc/TextFileBatchChannel';
import FetchHomeDirectoryChannel from './ipc/FetchHomeDirectoryChannel';
import ProcessAudioChannel from './ipc/ProcessAudioChannel';
import ChannelNames from '../shared/ChannelNames';
import PollyCredentialsVerificationChannel from './ipc/PollyCredentialsVerificationChannel';

let mainWindow: BrowserWindow | null = null;

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

if (process.env.NODE_ENV === 'production') {
  const sourceMapSupport = require('source-map-support');
  sourceMapSupport.install();
}

const isDebug =
  process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true';

if (isDebug) {
  require('electron-debug')();
}

const installExtensions = async () => {
  const installer = require('electron-devtools-installer');
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS;
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS'];

  return installer
    .default(
      extensions.map((name) => installer[name]),
      forceDownload
    )
    .catch(console.log);
};

const createWindow = async () => {
  if (isDebug) {
    await installExtensions();
  }

  const RESOURCES_PATH = app.isPackaged
    ? path.join(process.resourcesPath, 'assets')
    : path.join(__dirname, '../../assets');

  const getAssetPath = (...paths: string[]): string => {
    return path.join(RESOURCES_PATH, ...paths);
  };

  mainWindow = new BrowserWindow({
    show: false,
    width: 1024,
    height: 728,
    icon: getAssetPath('icon.png'),
    webPreferences: {
      preload: app.isPackaged
        ? path.join(__dirname, 'preload.js')
        : path.join(__dirname, '../../.erb/dll/preload.js'),
    },
    autoHideMenuBar: true,
  });

  mainWindow.loadURL(resolveHtmlPath('index.html'));

  mainWindow.on('ready-to-show', () => {
    if (!mainWindow) {
      throw new Error('"mainWindow" is not defined');
    }
    if (process.env.START_MINIMIZED) {
      mainWindow.minimize();
    } else {
      mainWindow.show();
    }
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  const menuBuilder = new MenuBuilder(mainWindow);
  menuBuilder.buildMenu();

  // Open urls in the user's browser
  mainWindow.webContents.setWindowOpenHandler((edata) => {
    shell.openExternal(edata.url);
    return { action: 'deny' };
  });
};

const registerIpcChannels = (ipcChannels: IpcHandlerInterface[]) => {
  ipcChannels.forEach((channel) => {
    ipcMain.on(channel.getConfigChannelName(), (event, request) =>
      channel.config(event, request)
    );
    ipcMain.on(channel.getChannelName(), (event, request) =>
      channel.handle(event, request)
    );
  });
};

/**
 * Add event listeners...
 */

app.on('window-all-closed', () => {
  // Respect the OSX convention of having the application in memory even
  // after all windows have been closed
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app
  .whenReady()
  .then(() => {
    createWindow();
    app.on('activate', () => {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (mainWindow === null) createWindow();
    });
  })
  .catch(console.log);

registerIpcChannels([
  new TextFileBatchChannel(ChannelNames.PROCESS_TEXT_FILES_BATCH),
  new FetchHomeDirectoryChannel(),
  new ProcessAudioChannel(ChannelNames.PROCESS_SIMPLE_TEXT),
  new PollyCredentialsVerificationChannel(ChannelNames.VERIFY_AWS),
]);
