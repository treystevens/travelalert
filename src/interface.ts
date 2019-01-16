// interface Crawlers{

//     crawlers: Array<Crawler>

// }

export interface Crawler{    
    getData(): void;
    buildURL(location): string;
}