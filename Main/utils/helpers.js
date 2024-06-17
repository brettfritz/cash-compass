const { format } = require('date-fns'); // Importing date-fns for date formatting

module.exports = {
  formatAmount: (amount) => {
    return parseFloat(amount).toFixed(2);
  },
  formatDate: (date) => {
    return format(new Date(date), 'MM/dd/yyyy'); // Format the date as MM/DD/YYYY
  },
  stripeColor: function(index) {
    return index % 2 === 0 ? 'rgba(100, 100, 100)' : 'rgba(50, 50, 50)';
  }
};