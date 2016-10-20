/**
 * Returns a lsit of all events. Safe and fast to call this more than once per process;
 * the results from the first call will be memoized so that the file is only read once 
 * from disk.
 */
const fs = require('mz/fs');
const moment = require('moment');
const marked = require('marked');

let results = [];

// Category labels
const categories = {
    CODE: { label: 'Code', icon: 'img/icons/cogwheel.svg' },
    PODCAST: { label: 'Podcast', icon: 'img/icons/microphone.svg' },
    WRITING: { label: 'Writing', icon: 'img/icons/key.svg' },
};

module.exports = function () {
    // if (results.length > 0) return results;

    let content = fs.readFileSync('events.json')
    results = JSON.parse(content.toString());

    results = results.map(result => {
        result.date = moment(result.date, 'YYYY-MM').format('MMM YYYY');
        result.description = marked(result.description);
        result.category = categories[result.category]

        return result;
    });

    return results;
};