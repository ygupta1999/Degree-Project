export class Articles {
    status!: string;
    totalResults!: number;
    articles!: Article[];
}

export class Article {
    author!: string;
    content!: string;
    description!: string;
    publishedAt!: string;
    source!: Source;
    title!: string;
    url!: string;
    urlToImage!: string;
}

export class Source {
    id!: string;
    name!: string;
}

export const initialArticles: Articles = {
    status: '',
    totalResults: 0,
    articles: []
}