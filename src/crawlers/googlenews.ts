import axios from 'axios';
import * as cheerio from 'cheerio';
import { Crawler } from '../interface'
import * as chalk from 'chalk';

export default class GoogleNews implements Crawler{

    private originURL: string;
    private destURL: string;

    constructor(origin: string, dest: string){
        this.originURL = this.buildURL(encodeURI(origin));
        this.destURL = this.buildURL(encodeURI(dest))
    }

    getData(): void{

        axios.get(this.originURL)
        .then((res) => {
            console.log(chalk.cyan.bgWhite.bold('Google News'))
            
            console.log(chalk.cyan('--------------------------------'))
            console.log(' ')
            this.handleHTML(res.data, 'Origin')
        })
        .then(() => {
            return axios.get(this.destURL)
        })
        .then((res) => {
            console.log(' ')
            console.log(' ')
            this.handleHTML(res.data, 'Destination')
        })
        .catch((err: Error) => {
            console.log(err);
        })
        

    }

    buildURL(location: string): string{
        return `https://news.google.com/search?q="cancelled%20flights"%20${location}&hl=en-US&gl=US&ceid=US%3Aen`;
    }

    handleHTML(data: string, location:string){
        const $ = cheerio.load(data)

        const sortedNews: Array<any> = this.sortElements(this.sliceNews($('.xrnccd')));

        // *** sortedNews not outputting sorted order correctly 
        console.log(`${chalk.blueBright(location + ' News:')}`)
        $(sortedNews).each((index, elem) => {
        
            console.log(`[${$(elem).find('.KbnJ8').text()}] - Title: ${chalk.whiteBright.bold($(elem).find('.ipQwMb').find('span').text())} (${chalk.gray($(elem).find('time').text())})`);
            console.log(` `);
            
        })
        console.log(` `);
    }

    private sliceNews(news: Array<any>): Array<any>{
        const $ = cheerio.load(news);
    
        const dateNowInSecs: number = Date.now() / 1000;
        const weekendSecs: number = 3600 * 24 * 7;
        const newsCutOffDate: number = dateNowInSecs - weekendSecs;

        const newsWithinAWeek = $(news).map((index, elem) => {

            const newsDateAttr: string = $(elem).find('time').attr('datetime');
            let postedNewsDate: number;
            

            if(newsDateAttr){
                postedNewsDate = Number(newsDateAttr.replace ( /[^\d.]/g, '' ));


                if(postedNewsDate > newsCutOffDate){
                    elem.time = postedNewsDate;

                    return elem;
                }

            }
            
        })

        return newsWithinAWeek;
    }

    private sortElements(news:Array<any>): Array<any>{
        const $ = cheerio.load(news);
        
        // Insertion sort
        for(let i = 1; i < news.length; i++){
            let value = news[i].time;
            let hole = i;
            
            while( hole > 0 && value < news[hole - 1].time){
                news[hole].time = news[hole - 1].time;
                hole--;
            }
            
            news[hole].time = value;
            }
        return news;
    }


}