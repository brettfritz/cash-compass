
module.exports = {
  format_amount: (amount) => {
      return parseFloat(amount).toFixed(2);
  },
  format_date: (date) => {
      return new Date(date).toLocaleDateString();
  }
};
