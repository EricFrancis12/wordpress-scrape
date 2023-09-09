const fs = require('fs');

const axios = require('axios');

const searchTerms = require('./searchTerms/searchTerms.js');
const { randomNum, formatDate } = require('./utils/utils');



(async function () {
    const date = formatDate(Date.now());
    const txtFileContentArr = [];

    try {
        let i = 1;
        for (const term of searchTerms) {
            const termFormatted = term.replace(/ /g, '%20');
            console.log(termFormatted);
            const urlsArr = await main(`https://en.search.wordpress.com/?q=${termFormatted}`);
            txtFileContentArr.push(urlsArr.join('\n'));

            const ms_min = 1000;
            const ms_max = 2000;
            const ms = randomNum(ms_min, ms_max);
            console.log(ms);

            const prom = new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve();
                }, ms);
            });

            const txtFileContent = txtFileContentArr.join('\n');
            fs.writeFileSync(`./output/${date}.txt`, txtFileContent);

            await prom;
            console.log(`----- Progress: ${i} / ${searchTerms.length}`);
            console.log(`----- Est Time Remaining: ${getTimeRemaining(ms_min, ms_max, i, searchTerms.length)} minutes`);
            i++;
        }

    } catch (err) {
        console.error(err);
    }

    function getTimeRemaining(min, max, i, iTotal) {
        const mean = (min + max) / 2;
        const timeElapsed = mean * i;
        const timeTotal = mean * iTotal;

        return (timeTotal - timeElapsed) / 1000 / 60;
    }
})();



async function main(url) {
    const result = [];

    try {
        const response = await axios.get(url);
        const responseSplit = response.data.split(' class="rich-url"');
        responseSplit.forEach(string => {
            const splits = string.split('"');
            const link = splits[splits.length - 2];
            result.push(link);
        });

        return result;
    } catch (err) {
        console.error(err);
        return err;
    }
}
