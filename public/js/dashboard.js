document.addEventListener('DOMContentLoaded', async () => {
    const ctx = document.getElementById('transactionsChart').getContext('2d');

    try {
        const response = await fetch('/transactions/data');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const transactions = await response.json();

        // Process data for Chart.js
        const categories = {};
        transactions.forEach(transaction => {
            if (!categories[transaction.category.name]) {
                categories[transaction.category.name] = 0;
            }
            categories[transaction.category.name] += transaction.cost;
        });

        const categoryLabels = Object.keys(categories);
        const categoryData = Object.values(categories);

        // Generate random colors for each category
        const backgroundColors = categoryLabels.map(() => {
            const r = Math.floor(Math.random() * 255);
            const g = Math.floor(Math.random() * 255);
            const b = Math.floor(Math.random() * 255);
            return `rgba(${r}, ${g}, ${b}, 0.6)`;
        });

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: categoryLabels,
                datasets: [{
                    label: 'Expenses by Category',
                    data: categoryData,
                    backgroundColor: backgroundColors,
                    borderColor: backgroundColors.map(color => color.replace('0.6', '1')),
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: 'right',
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                let label = context.label || '';
                                if (label) {
                                    label += ': ';
                                }
                                label += '$' + context.raw;
                                return label;
                            }
                        }
                    }
                },
                // Set the font color for the pie chart labels to white
                color: 'white'
            }
        });
    } catch (err) {
        console.error('Error fetching transaction data:', err);
    }
});
