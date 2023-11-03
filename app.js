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
