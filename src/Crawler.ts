import axios from 'axios';
import chalk from 'chalk';

export default abstract class Crawler{
    protected originURL: string;
    protected destURL: string;
    protected source: string;

    constructor(origin: string, dest: string, source: string){
        this.originURL = this.buildURL(encodeURI(origin));
        this.destURL = this.buildURL(encodeURI(dest));
        this.source = source;
    }

    public getData(): void{

        axios.get(this.originURL)
        .then((res) => {
            console.log(chalk.cyan.bgWhite.bold(this.source))
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

    abstract buildURL(location: string): string;

    abstract handleHTML(data: string, location:string): void;
}