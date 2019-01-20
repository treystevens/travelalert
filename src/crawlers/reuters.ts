import axios from 'axios';
import * as cheerio from 'cheerio';
import * as chalk from 'chalk';
import { Crawler } from '../interface'

export default class Reuters implements Crawler{

    private originURL: string;
    private destURL: string;

    constructor(origin: string, dest: string){
        this.originURL = this.buildURL(encodeURI(origin));
        this.destURL = this.buildURL(encodeURI(dest))
    }

    getData(): void{

        axios.get(this.originURL)
        .then((res) => {
            console.log(chalk.cyan.bgWhite.bold('Reuters'))
            console.log(chalk.cyan('--------------------------------'))
            console.log(' ')
            this.handleHTML(res.data, 'Origin')
        })
        .then(() => {
            return axios.get(this.destURL)
        })
        .then((res) => {
            this.handleHTML(res.data, 'Destination')
        })
        .catch((err: Error) => {
            console.log(err);
        })
        

    }

    buildURL(location: string): string{
        return `https://www.reuters.com/search/news?blob=cancelled+flights+${location}&sortBy=date&dateRange=pastWeek`;
    }

    handleHTML(data: string, location:string){
        const $ = cheerio.load(data)

        console.log(`${chalk.blueBright(location + ' News:')}`)
        $('.search-result-content').each((index, elem) => {
        
            console.log(`Title: ${chalk.whiteBright.bold($(elem).find('.search-result-title').text())} (${chalk.gray($(elem).find('.search-result-timestamp').text())})`);
            console.log(` `);
            
        })
        console.log(` `);
    }


}