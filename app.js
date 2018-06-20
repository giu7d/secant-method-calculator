const electron = require('electron');
const url = require('url');
const path = require('path');
const $ = require("jquery");


const { app, BrowserWindow } = electron;

let mainWindow;

app.on('ready', () => {
    // Create New Window
    mainWindow = new BrowserWindow([]);

    // Load HTML View
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true
    }));

    mainWindow.setMenu(null);

}); 
