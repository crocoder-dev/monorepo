import { favicons } from 'favicons';
import { dirname, resolve } from 'path';
import { existsSync, mkdirSync, writeFile } from 'fs';

const siteTitleShort = 'CroCoder';
const siteDescription = 'We are an experienced software development team for projects with big impact.';
const themeColor = '#ffffff';
const backgroundColor = '#000000';

const dirName = dirname('../');

const dir = resolve(dirName, 'dist/client/icons/');
if (!existsSync(dir)) {
  mkdirSync(dir);
}

const source = resolve(dirName, 'public/icon.png');
const configuration = {
  path: 'icons/',
  appName: siteTitleShort,
  appDescription: siteDescription,
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

const callback = (res, err) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log(err.message);
    return;
  }

  res.images.forEach((image) => {
    writeFile(resolve(dirName, 'dist/client/icons/', image.name), image.contents, (error) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    });
  });

  res.files.forEach((file) => {
    writeFile(resolve(dirName, 'dist/client/', file.name), file.contents, (error) => {
      if (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    });
  });
};
favicons(source, configuration).then((res, err) => {
  callback(res, err);
});
