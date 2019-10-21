// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

window.$ = window.Jquery = require('jquery');

const app = require('electron').remote.app;
const {
  remote
} = require('electron');

$('#btnKill').click(function () {
  remote.BrowserWindow.getFocusedWindow().close();
});

$('#btnMax').click(function () {
  if (remote.BrowserWindow.getFocusedWindow().isMaximized()) {
    remote.BrowserWindow.getFocusedWindow().restore();
  } else {
    remote.BrowserWindow.getFocusedWindow().maximize();
  }
});

$('#btnMin').click(function () {
  remote.BrowserWindow.getFocusedWindow().minimize();
});