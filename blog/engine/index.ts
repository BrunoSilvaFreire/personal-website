import fs, {PathLike} from 'fs';
import marked from 'marked';
import path from 'path';

class Article {
    readonly title: string;
    readonly author: string;
    readonly thumbnail: string;
    readonly date: Date;
    readonly article: string;

    constructor(title: string, author: string, thumbnail: string, date: Date, article: string) {
        this.title = title;
        this.author = author;
        this.thumbnail = thumbnail;
        this.date = date;
        this.article = article;
    }

    toString() {
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
        if (!fs.existsSync(articleFile)) {
            console.log(`Unable to find article file ${articleFile}`);
            continue;
        }

        const articleData = marked(fs.readFileSync(articleFile).toString());
        const date = new Date(meta.date);
        articles.push(
            new Article(

                meta.title,
                meta.author,
                meta.thumbnail,
                date,
                articleData
            )
        );

    }
    return articles;
}


export default consumeArticles;