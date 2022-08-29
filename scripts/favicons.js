const { favicons } = require('favicons');
const path = require('path');
const fs = require('fs');

const siteTitleShort = "CroCoder";
const themeColor = "#ffffff";
const backgroundColor = "#000000";

const dir = path.resolve(__dirname, '../public/icons/');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir);
}

const source = 'public/icon.png';
const configuration = {
  path: '/',
  appName: siteTitleShort,
  appDescription: null,
  developerName: null,
  developerURL: null,
  dir: 'auto',
  lang: 'en-US',
  background: backgroundColor,
  theme_color: themeColor,
  display: 'standalone',
  orientation: 'any',
  start_url: '/',
  version: '1.0',
  logging: true,
  icons: {
    android: true,
    appleIcon: true,
    appleStartup: true,
    coast: false,
    favicons: true,
    firefox: false,
    windows: true,
    yandex: false,
  },
};

const callback = function(err, res) {
  if (err) {
    console.log(err.message);
    return;
  }

  res.images.forEach(image => {
    fs.writeFile(
      path.resolve(__dirname, '../out/icons/', image.name),
      image.contents,
      err => {
        if (err) {
          console.log(err);
        }
      }
    );
  });

  res.files.forEach(file => {
    fs.writeFile(
      path.resolve(__dirname, '../out/', file.name),
      file.contents,
      err => {
        if (err) {
          console.log(err);
        }
      }
    );
  });
};

favicons(source, configuration, callback);