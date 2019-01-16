import axios from 'axios';
import * as cheerio from 'cheerio';
import { Crawler } from '../interface'

export default class Reuters implements Crawler{

    private originURL: string;
    private destURL: string;

    constructor(origin: string, dest: string){
        this.originURL = this.buildURL(origin);
        this.destURL = this.buildURL(dest)
    }

    getData(): void{

        axios.get(this.originURL)
        .then((res) => {
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

    private handleHTML(data: string, location:string){
        const originData = cheerio.load(data)

            console.log(`${location} News:`)
            originData('.search-result-content').each((index, elem) => {
            
                console.log(`${originData(elem).find('.search-result-timestamp').text()} - Title: ${originData(elem).find('.search-result-title').text()}`);
                console.log(` `);
                
            })
            console.log(` `);
    }


}