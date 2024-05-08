const dayjs = require('dayjs');

module.exports = {
    format_date: (date) => {
      return dayjs(date).format('MM/DD/YYYY hh:mm a');
    },
  };