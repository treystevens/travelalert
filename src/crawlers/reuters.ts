import axios from 'axios';
import * as cheerio from 'cheerio';
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
            console.log('Reuters')
            console.log('----------------')
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

            console.log(`${location} News:`)
            $('.search-result-content').each((index, elem) => {
            
                console.log(`Title: ${$(elem).find('.search-result-title').text()} (${$(elem).find('.search-result-timestamp').text()})`);
                console.log(` `);
                
            })
            console.log(` `);
    }


}