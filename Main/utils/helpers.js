const formatMoney = (amount) => {
  return `$${amount.toFixed(2)}`;
};

const formatDate = (date) => {
  return new Date(date).toLocaleDateString();
};

module.exports = {
  formatMoney,
  formatDate
};
