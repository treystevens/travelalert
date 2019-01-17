import { Crawler } from './interface';
import Reuters from './crawlers/reuters';
import GoogleNews from './crawlers/googlenews';


export const crawlersArray: Array<Crawler> = [];


export function loader(origin: string, dest: string):void{

    console.log('Loading loading')

    const reuters = new Reuters(origin, dest);
    const googleNews = new GoogleNews(origin, dest);

    crawlersArray.push(reuters, googleNews)

}















// glob.sync('./src/crawlers/**.js').map((file) => {
//     console.log(file)

//     crawlersArray.push(require( path.resolve( file ) ).default);
//     // crawlersArray.push(file)
// })

// export { crawlersArray, loaders }














// function loadCrawlers(answers): Array<Crawler>{


//     crawlersArray.push( glob.forEach((crawler) => {
//         const newCrawl = new crawler(answers)

//         return newCrawl
//     }))


//     for(let i: number = 0; i < (GLOB); i++){
//         let crawler[i] = GLOB[crawler]

//         crawlersArray.push(glob[crawler])
//     }


//     return crawlersArray;
// }


