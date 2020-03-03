import fs, {PathLike} from 'fs';
import marked from 'marked';
import path from 'path';

export class Article {
    readonly id: string;
    readonly title: string;
    readonly subtitle: string;
    readonly author: string;
    readonly thumbnail: string;
    readonly date: Date;
    readonly article: string;

    constructor(title: string, subtitle: string, author: string, thumbnail: string, date: Date, article: string) {
        this.id = title.toLocaleLowerCase().replace(' ', '_');
        this.title = title;
        this.subtitle = subtitle;
        this.author = author;
        this.thumbnail = thumbnail;
        this.date = date;
        this.article = article;
    }

    isWorkInProgress(): boolean {
        return this.article == null;
    }

    toString(): string {
        return `{author: ${this.author}, date: ${this.date}, article: ${this.article}`;
    }
}

function consumeArticles(folder: string) {
    const files = fs.readdirSync(folder);
    const articles = Array<Article>();
    for (let articleFolder of files) {
        const metaFile = path.resolve(folder, `${articleFolder}/meta.json`);
        const meta = JSON.parse(fs.readFileSync(metaFile).toString());
        let articleFile = meta.file;
        if (articleFile == null) {
            articleFile = "article.md";
        }
        articleFile = path.resolve(folder, `${articleFolder}/${articleFile}`);
        let articleData: string;
        if (!fs.existsSync(articleFile)) {
            articleData = null;
        } else {
            articleData = marked(fs.readFileSync(articleFile).toString());
        }
        const date = new Date(meta.date);
        articles.push(
            new Article(
                meta.title,
                meta.subtitle,
                meta.author,
                meta.thumbnail,
                date,
                articleData
            )
        );

    }
    articles.sort(((a, b) => {
        if (a.isWorkInProgress() != b.isWorkInProgress()) {
            if (a.isWorkInProgress()) {
                return 1;
            }
            if (b.isWorkInProgress()) {
                return -1;
            }
            return 0;
        }
        return a.date.getMilliseconds() - b.date.getMilliseconds();
    }));
    return articles;
}


export default {
    consumeArticles,
    Article
};