// Constructor function for a Salmon Cookie Stand
function SalmonCookieStand(location, minCustomers, maxCustomers, avgCookiesPerSale) {
  this.location = location;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.cookiesSoldPerHour = [];
  this.dailyLocationTotal = 0;
  this.totalCustomers = 0; // Total customers for the location
}

// Prototype method for generating hourly sales
SalmonCookieStand.prototype.generateHourlySales = function () {
  for (let hour = 6; hour <= 19; hour++) {
    const randomCustomers = Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1) + this.minCustomers);
    const cookiesSold = Math.round(randomCustomers * this.avgCookiesPerSale);
    this.cookiesSoldPerHour.push(cookiesSold);
    this.dailyLocationTotal += cookiesSold;
    this.totalCustomers += randomCustomers; // Accumulate total customers
  }
};

// Array of Salmon Cookie Stands
const locations = [
  new SalmonCookieStand('Seattle', 23, 65, 6.3),
  new SalmonCookieStand('Tokyo', 3, 24, 1.2),
  new SalmonCookieStand('Dubai', 11, 38, 3.7),
  new SalmonCookieStand('Paris', 20, 38, 2.3),
  new SalmonCookieStand('Lima', 2, 16, 4.6),
];

// Function to generate hourly sales data for all locations
function generateHourlySalesData() {
  for (const location of locations) {
    location.generateHourlySales();
  }
}

// Function to display sales data for all locations
function displaySalesData() {
  const table = document.createElement('table');
  table.classList.add('sales-table');

  // Create the header row
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = '<th>Location</th><th>6:00am</th><th>7:00am</th><th>8:00am</th><th>9:00am</th><th>10:00am</th><th>11:00am</th><th>12:00pm</th><th>1:00pm</th><th>2:00pm</th><th>3:00pm</th><th>4:00pm</th><th>5:00pm</th><th>6:00pm</th><th>7:00pm</th><th>Daily Location Total</th><th>Total Customers</th>';
  table.appendChild(headerRow);

  // Create rows for each location
  for (const location of locations) {
    const row = document.createElement('tr');
    let rowHTML = `<td>${location.location}</td>`;

    for (let hour = 6; hour <= 19; hour++) {
      rowHTML += `<td>${location.cookiesSoldPerHour[hour - 6]}</td>`;
    }

    rowHTML += `<td>${location.dailyLocationTotal}</td>`;
    rowHTML += `<td>${location.totalCustomers}</td>`; // Display total customers
    row.innerHTML = rowHTML;
    table.appendChild(row);
  }

  // Append the table to the document body
  document.body.appendChild(table);
}

// Call the functions to generate and display sales data
generateHourlySalesData();
displaySalesData();
