import Crawler from './Crawler';
import Reuters from './crawlers/reuters';
import GoogleNews from './crawlers/googlenews';

export const crawlersArray: Array<Crawler> = [];

export function loader(origin: string, dest: string):void{

    const reuters: Crawler = new Reuters(origin, dest);
    const googleNews: Crawler = new GoogleNews(origin, dest);

    crawlersArray.push(reuters, googleNews);
}