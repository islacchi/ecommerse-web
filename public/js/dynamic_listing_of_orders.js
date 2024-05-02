    // Function to fetch data from the API and populate the table
    function fetchAndPopulateOrdersTable() {
        fetch('http://localhost:3500/orders',{
            credentials: "include",
        })
            .then(response => response.json())
            .then(data => {
                // Populate table with fetched data
                populateOrdersTable(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }

    // Function to populate table rows with data
    function populateOrdersTable(ordersData) {
        var tableBody = document.getElementById('ordersTableBody');

        ordersData.forEach(function(order) {
            var row = document.createElement('tr');

            row.innerHTML = `
                <th scope="row">${order.order_no}</th>
                <td>
                    <div class="tm-status-circle ${order.status}"></div>
                    ${order.status}
                </td>
                <td><b>${order.operator}</b></td>
                <td><b>${order.location}</b></td>
                <td><b>${order.distance}</b></td>
                <td>${order.start_date}</td>
                <td>${order.delivery_due}</td>
            `;

            tableBody.appendChild(row);
        });
    }

    // Call the function to fetch and populate the table after the DOM is fully loaded
    document.addEventListener('DOMContentLoaded', function() {
        fetchAndPopulateOrdersTable();
    });