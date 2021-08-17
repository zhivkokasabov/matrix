import { db } from './db';

export function getArticles(searchString) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const articles = db.getArticles(searchString);

      resolve(articles);
    }, 300);
  });
}
