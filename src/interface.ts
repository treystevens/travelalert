export interface Crawler{    
    getData(): void;
    buildURL(location): string;
    handleHTML(data: string, location:string): void;
}