
function SalmonCookieStand(location, minCustomers, maxCustomers, avgCookiesPerSale) {
  this.location = location;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgCookiesPerSale = avgCookiesPerSale;
  this.cookiesSoldPerHour = [];
  this.dailyLocationTotal = 0;
  this.totalCustomers = 0;
}

// Prototype method: generating hourly sales
SalmonCookieStand.prototype.generateHourlySales = function () {
  for (let hour = 6; hour <= 19; hour++) {
    const randomCustomers = Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1) + this.minCustomers);
    const cookiesSold = Math.round(randomCustomers * this.avgCookiesPerSale);
    this.cookiesSoldPerHour.push(cookiesSold);
    this.dailyLocationTotal += cookiesSold;
    this.totalCustomers += randomCustomers; // total customers
  }
}

// Array of Salmon Cookie Stands
const locations = [
  new SalmonCookieStand('Seattle', 23, 65, 6.3),
  new SalmonCookieStand('Tokyo', 3, 24, 1.2),
  new SalmonCookieStand('Dubai', 11, 38, 3.7),
  new SalmonCookieStand('Paris', 20, 38, 2.3),
  new SalmonCookieStand('Lima', 2, 16, 4.6),
];

//add a new SalmonCookieStand to the locations array
function addNewStore(locationName, newMinCust, newMaxCust, newAvgCookie) {
  const newStore = new SalmonCookieStand(locationName, newMinCust, newMaxCust, newAvgCookie);
  locations.push(newStore);
}

// generate hourly sales, all locations
function generateHourlySalesData() {
  for (const location of locations) {
    location.generateHourlySales();
  }
}

//display sales data for all locations
function displaySalesData() {
  const table = document.createElement('table');
  table.classList.add('sales-table');

  //header row
  const headerRow = document.createElement('tr');
  headerRow.innerHTML = '<th>Location</th><th>6:00am</th><th>7:00am</th><th>8:00am</th><th>9:00am</th><th>10:00am</th><th>11:00am</th><th>12:00pm</th><th>1:00pm</th><th>2:00pm</th><th>3:00pm</th><th>4:00pm</th><th>5:00pm</th><th>6:00pm</th><th>7:00pm</th><th>Daily Location Total</th><th>Total Customers</th>';
  table.appendChild(headerRow);

  for (const location of locations) {
    const row = document.createElement('tr');
    let rowHTML = `<td>${location.location}</td>`;

    for (let hour = 6; hour <= 19; hour++) {
      rowHTML += `<td>${location.cookiesSoldPerHour[hour - 6]}</td>`;
    }

    rowHTML += `<td>${location.dailyLocationTotal}</td>`;
    rowHTML += `<td>${location.totalCustomers}</td>`; // total customers
    row.innerHTML = rowHTML;
    table.appendChild(row);
  }

  const oldTable = document.querySelector('.sales-table');
  if (oldTable) {
    oldTable.remove();
  }
  document.body.appendChild(table);
}

// Form
const locationForm = document.getElementById('newStoreForm');

locationForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const locationName = event.target.locationName.value;
  const newMinCust = parseInt(event.target.newMinCust.value);
  const newMaxCust = parseInt(event.target.newMaxCust.value);
  const newAvgCookie = parseFloat(event.target.newAvgCookie.value);

  if (locationName && !isNaN(newMinCust) && !isNaN(newMaxCust) && !isNaN(newAvgCookie)) {
    addNewStore(locationName, newMinCust, newMaxCust, newAvgCookie);
    locationForm.reset();
    generateHourlySalesData();
    displaySalesData();
  } else {
    alert('Please enter valid # or name input values.');
  }
});
