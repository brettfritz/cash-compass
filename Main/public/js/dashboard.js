


document.addEventListener('DOMContentLoaded', () => {
    // Retrieve categorized transactions data from the hidden script tag
    const categorizedTransactionsData = document.getElementById('categorized-transactions-data').textContent;
    const categorizedTransactions = JSON.parse(categorizedTransactionsData);
console.log('hello');
    // Initialize the Chart.js chart
    const ctx = document.getElementById('transactionsChart').getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: Object.keys(categorizedTransactions),
            datasets: [{
                label: 'Transactions by Category',
                data: Object.values(categorizedTransactions),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Transactions by Category'
                }
            }
        },
    });
});
