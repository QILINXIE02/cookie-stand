const locations = [
  {
    name: 'Seattle',
    minCustomers: 23,
    maxCustomers: 65,
    avgCookiesPerSale: 6.3,
  },
  {
    name: 'Tokyo',
    minCustomers: 3,
    maxCustomers: 24,
    avgCookiesPerSale: 1.2,
  },
  {
    name: 'Dubai',
    minCustomers: 11,
    maxCustomers: 38,
    avgCookiesPerSale: 3.7,
  },
  {
    name: 'Paris',
    minCustomers: 20,
    maxCustomers: 38,
    avgCookiesPerSale: 2.3,
  },
  {
    name: 'Lima',
    minCustomers: 2,
    maxCustomers: 16,
    avgCookiesPerSale: 4.6,
  },
];

function generateHourlySales(location) {
  location.hourlySales = [];
  for (let hour = 6; hour <= 19; hour++) {
    const randomCustomers = Math.floor(Math.random() * (location.maxCustomers - location.minCustomers + 1)) + location.minCustomers;
    const cookiesSold = Math.round(randomCustomers * location.avgCookiesPerSale);
    location.hourlySales.push(
      `${hour % 12 || 12} ${hour < 12 ? 'am' : 'pm'}: ${cookiesSold} cookies`
    );
  }
  location.totalSales = location.hourlySales.reduce(
    (sum, sale) => sum + parseInt(sale.split(' ')[1]),
    0
  );
}

function renderSalesData(location) {
  const locationElement = document.createElement('div');
  locationElement.className = 'location-sales';
  locationElement.innerHTML = `<h2>${location.name}</h2><ul>`;
  for (const sale of location.hourlySales) {
    locationElement.innerHTML += `<li>${sale}</li>`;
  }
  locationElement.innerHTML += `<li>Total: ${location.totalSales} cookies</li></ul>`;
  document.getElementById('stores').appendChild(locationElement);
}

for (const location of locations) {
  generateHourlySales(location);
  renderSalesData(location);
}

// Constructor function for Salmon Cookie Stand
function CookieStand(location, minCustomers, maxCustomers, avgCookiesPerCustomer) {
  this.location = location;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesPerCustomer = avgCookiesPerCustomer;
  this.cookiesSoldPerHour = []; // Store hourly sales
}

// Define your Salmon Cookie Stands
const seattle = new CookieStand('Seattle', 23, 65, 6.3);
const tokyo = new CookieStand('Tokyo', 3, 24, 1.2);
const dubai = new CookieStand('Dubai', 11, 38, 3.7);
const paris = new CookieStand('Paris', 20, 38, 2.3);
const lima = new CookieStand('Lima', 2, 16, 4.6);

// Implement the 'render' method for each Cookie Stand
CookieStand.prototype.render = function() {
  // Generate and append the row for this location to the sales table
  const table = document.getElementById('sales-table');
  const row = document.createElement('tr');
  row.innerHTML = `<td>${this.location}</td>`;
  // Generate hourly sales data and add to the row
  // Calculate the daily total as you go
  let dailyTotal = 0;
  for (let i = 6; i <= 19; i++) { // 6:00 AM to 7:00 PM
    const cookies = calculateCookiesForHour(i, this);
    this.cookiesSoldPerHour.push(cookies);
    row.innerHTML += `<td>${cookies} cookies</td>`;
    dailyTotal += cookies;
  }
  row.innerHTML += `<td>${dailyTotal} cookies</td>`;
  table.appendChild(row);
};

// Helper function to calculate cookies for a specific hour
function calculateCookiesForHour(hour, stand) {
  const customers = Math.floor(Math.random() * (stand.maxCustomers - stand.minCustomers + 1)) + stand.minCustomers;
  return Math.round(customers * stand.avgCookiesPerCustomer);
}

// Render all Cookie Stands
const cookieStands = [seattle, tokyo, dubai, paris, lima];
for (const stand of cookieStands) {
  stand.render();
}

// Additional logic to generate header and footer rows

