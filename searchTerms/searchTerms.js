const fs = require('fs');



let searchTerms = [];

const inputDirContents = fs.readdirSync('./input');
for (let i = 0; i < inputDirContents.length; i++) {
    if (inputDirContents[i].substring(inputDirContents[i].length - 4, inputDirContents[i].length) === '.txt') {
        const fileContents = fs.readFileSync(`./input/${inputDirContents[i]}`, { encoding: 'utf8', flag: 'r', root: './' });
        const result = fileContents.split('\n');

        searchTerms = searchTerms.concat(result);
    }
}



module.exports = searchTerms;
