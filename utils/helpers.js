module.exports = {
  format_time: (date) => {
    return date.toLocaleTimeString();
  },
  format_date: date => {
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${new Date(date).getFullYear()}`;
  },
  ifCond: function(v1, operator, v2, options) {
    switch (operator) {
      case '===':
        return (v1 === v2) ? options.fn(this) : options.inverse(this);
      case '!==':
        return (v1 !== v2) ? options.fn(this) : options.inverse(this);
      // Add more operators as needed
      default:
        return options.inverse(this);
    }
  }
};
