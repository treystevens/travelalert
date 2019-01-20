import * as inquirer from 'inquirer';
import { crawlersArray, loader } from './loader';
const airports = require('../airports.json')


inquirer
  .prompt([
    {
        type: 'input',
        name: 'origin',
        message: `Where are you flying from?`,
        filter: ((origin: string) => {
            return origin.toUpperCase()
        })
    },
    {
        type: 'input',
        name: 'dest',
        message: `Where are you flying to?`,
        filter: ((dest: string) => {
            return dest.toUpperCase()
        })
    },
  ])
  .then(answers => {

    const originCity = airports[answers.origin].city;
    const destCity = airports[answers.dest].city;

    // const testSoleClass = new GoogleNews(originCity, destCity)
    // testSoleClass.getData()


    loader(originCity, destCity)
    crawlersArray.forEach((crawler) => {
        crawler.getData();
    })
      
  })
  .catch((err: Error) => {
      console.log(err)
  })


