import fs, {PathLike} from 'fs';
import marked from 'marked';
import path from 'path';

class Article {
    readonly author: string;
    readonly date: Date;
    readonly article: string;

    constructor(author: string, date: Date, article: string) {
        this.author = author;
        this.date = date;
        this.article = article;
    }

    toString() {
        return `{author: ${this.author}, date: ${this.date}, article: ${this.article}`;
    }
}

function consumeArticles(folder: string) {
    const files = fs.readdirSync(folder);
    var articles = Array<Article>();
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
                meta.author,
                date,
                articleData
            )
        );

    }
    return articles;
}


export default consumeArticles;