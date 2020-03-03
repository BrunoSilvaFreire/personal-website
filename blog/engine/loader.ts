import pugLoader from 'pug-loader'
import {Article} from './index';

export default function (articles: Array<Article>) {
    return function (article: string) {
        if (!article.startsWith("article/")) {
            return null;
        }
        const articleName = article.replace("article/", "");
        articles.find((a) => a.id === articleName);

        const template = pugLoader("./file.pug");

        const locals = { /* ... */};

        const html = template(locals);
        return html;

    };
}