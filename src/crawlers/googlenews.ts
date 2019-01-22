import * as cheerio from 'cheerio';
import chalk from 'chalk';
import Crawler from '../Crawler';

export default class GoogleNews extends Crawler{

    constructor(origin: string, dest: string){
        super(origin, dest, 'Google News');
    }

    buildURL(location: string): string{
        return `https://news.google.com/search?q="cancelled%20flights"%20${location}&hl=en-US&gl=US&ceid=US%3Aen`;
    }

    handleHTML(data: string, location:string){
        const $ = cheerio.load(data);
        const slicedNews: Array<CheerioElement> = this.sliceNews($('.xrnccd'));

        console.log(`${chalk.blueBright(location + ' News:')}`);

        slicedNews.forEach((elem: CheerioElement) => {
            console.log(`[${$(elem).find('.KbnJ8').text()}] - Title: ${chalk.whiteBright.bold($(elem).find('.ipQwMb').find('span').text())} (${chalk.gray($(elem).find('time').text())})`);
            console.log(` `);
        })
        console.log(` `);
    }

    private sliceNews(news: Cheerio): Array<CheerioElement>{
        const dateNowInSecs: number = Date.now() / 1000;
        const weekendSecs: number = 3600 * 24 * 7;
        const newsCutOffDate: number = dateNowInSecs - weekendSecs;

        const newsWithinAWeek: Array<CheerioElement> = news.toArray().filter((elem: CheerioElement, index: number) => {

            const $ = cheerio.load(elem);             
            const newsDateAttr: string = $(elem).find('time').attr('datetime');
            let postedNewsDate: number;
            
            if(newsDateAttr){
                postedNewsDate = Number(newsDateAttr.replace ( /[^\d.]/g, '' ));

                if(postedNewsDate > newsCutOffDate) return elem;
            }
            
        })
        return newsWithinAWeek;
    }
}