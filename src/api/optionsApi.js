import { db } from './db';

export function getOptions(searchString) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const options = db.getOptions(searchString);

      resolve(options);
    }, 300);
  });
}

export function getDefaultOptions() {
  return new Promise((resolve) => {
    setTimeout(() => {
      const options = db.getDefaultOptions();

      resolve(options);
    }, 300);
  });
}

export function removeDefaultOption(searchString, option) {
  return new Promise((resolve) => {
    setTimeout(() => {
      db.removeHistorical(option.id)

      if (searchString) {
        resolve(db.getOptions(searchString))
      } else {
        resolve(db.getDefaultOptions());
      }
    }, 300);
  });
}

export function addDefaultOption(option) {
  return new Promise((resolve) => {
    setTimeout(() => {
      db.setHistorical(option.id)
      const options = db.getOptions(option.name);

      resolve(options);
    }, 300);
  });
}
