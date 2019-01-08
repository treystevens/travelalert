import axios from 'axios';
import * as cheerio from 'cheerio';
import * as inquirer from 'inquirer';


inquirer
  .prompt([
    {
        type: 'input',
        name: 'origin',
        message: `Where are you flying from?`
    },
    // {
    //     type: 'input',
    //     name: 'originDate',
    //     message: `Where are you flying from?`
    // },
    {
        type: 'input',
        name: 'dest',
        message: `Where are you flying to?`
    },
  ])
  .then(answers => {
      console.log(answers)
      console.log('Here are some things you may need to keep an eye on:')
  })
  .catch((err: Error) => {
      console.log(err)
  })


