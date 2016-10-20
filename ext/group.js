const moment = require('moment');

const RECENT_MONTH_LIMIT = 4;

const visibility = {
    'recent': item => moment().diff(moment(item.date, 'MMM YYYY'), 'months') < RECENT_MONTH_LIMIT,
    'highlights': (_, i) => i < 5,
    'interests': (_, i) => i < 5,
    'side-projects': (_, i) => i < 5,
};

const keep = {
    'recent': item => item,
    'highlights': item => item.hasOwnProperty('highlight') && item.highlight,
    'interests': item => item.category.label === 'Writing',
    'side-projects': item => item.category.label === 'Code' || item.category.label === 'Podcast',
};

module.exports = function (id, label) {
    // Return a function that generates a group from the specified items.
    return function (items) {
        return {
            id,
            label,
            // TODO: sort stories by date, most recent first.
            stories: items.filter(keep[id]).map((item, i) => {
                item.display = visibility[id](item, i);
                return item;
            }),
        }
    };
};