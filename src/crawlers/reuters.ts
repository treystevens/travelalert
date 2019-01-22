import * as cheerio from 'cheerio';
import chalk from 'chalk';
import Crawler from '../Crawler';

export default class Reuters extends Crawler{

    constructor(origin: string, dest: string){
        super(origin, dest, 'Reuters');
    }

    buildURL(location: string): string{
        return `https://www.reuters.com/search/news?blob=cancelled+flights+${location}&sortBy=date&dateRange=pastWeek`;
    }

    handleHTML(data: string, location:string){
        const $: CheerioStatic = cheerio.load(data);

        console.log(`${chalk.blueBright(location + ' News:')}`)
        $('.search-result-content').each((index: number, elem: CheerioElement) => {
        
            console.log(`Title: ${chalk.whiteBright.bold($(elem).find('.search-result-title').text())} (${chalk.gray($(elem).find('.search-result-timestamp').text())})`);
            console.log(` `);
            
        })
        console.log(` `);
    }


}