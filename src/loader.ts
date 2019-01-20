import { Crawler } from './interface';
import Reuters from './crawlers/reuters';
import GoogleNews from './crawlers/googlenews';


export const crawlersArray: Array<Crawler> = [];

export function loader(origin: string, dest: string):void{

    const reuters = new Reuters(origin, dest);
    const googleNews = new GoogleNews(origin, dest);

    crawlersArray.push(reuters, googleNews)

}