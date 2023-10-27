// Shop location objects
const locations = [
  {
    location: 'Seattle',
    minCustomers: 23,
    maxCustomers: 65,
    avgCookiesPerSale: 6.3,
    cookiesSoldPerHour: [],
    generateHourlySales: function() {
      for (let hour = 6; hour <= 19; hour++) {
        const randomCustomers = Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1) + this.minCustomers);
        const cookiesSold = Math.round(randomCustomers * this.avgCookiesPerSale);
        this.cookiesSoldPerHour.push(cookiesSold);
      }
    },
    calculateDailyTotal: function() {
      return this.cookiesSoldPerHour.reduce((total, cookies) => total + cookies, 0);
    },
  },
  // Repeat the above structure for other locations (Tokyo, Dubai, Paris, Lima)
  {
    location: 'Tokyo',
    minCustomers: 3,
    maxCustomers: 24,
    avgCookiesPerSale: 1.2,
    cookiesSoldPerHour: [],
    // Methods for generating sales and calculating the total
  },
  {
    location: 'Dubai',
    minCustomers: 11,
    maxCustomers: 38,
    avgCookiesPerSale: 3.7,
    cookiesSoldPerHour: [],
    // Methods for generating sales and calculating the total
  },
  {
    location: 'Paris',
    minCustomers: 20,
    maxCustomers: 38,
    avgCookiesPerSale: 2.3,
    cookiesSoldPerHour: [],
    // Methods for generating sales and calculating the total
  },
  {
    location: 'Lima',
    minCustomers: 2,
    maxCustomers: 16,
    avgCookiesPerSale: 4.6,
    cookiesSoldPerHour: [],
    // Methods for generating sales and calculating the total
  },
];

// Function to generate hourly sales data for all locations
function generateHourlySalesData() {
  for (const location of locations) {
    location.generateHourlySales();
  }
}

// Function to display sales data for all locations
function displaySalesData() {
  for (const location of locations) {
    const locationList = document.createElement('ul');
    const locationDiv = document.createElement('div');
    locationDiv.classList.add('location-sales');
    locationDiv.innerHTML = `<h2>${location.location}</h2>`;
    
    for (let hour = 6; hour <= 19; hour++) {
      const listItem = document.createElement('li');
      listItem.textContent = `${hour}am: ${location.cookiesSoldPerHour[hour - 6]} cookies`;
      locationList.appendChild(listItem);
    }

    const totalListItem = document.createElement('li');
    totalListItem.textContent = `Total: ${location.calculateDailyTotal()} cookies`;
    locationList.appendChild(totalListItem);
    locationDiv.appendChild(locationList);
    document.body.appendChild(locationDiv);
  }
}

// Call the functions to generate and display sales data
generateHourlySalesData();
displaySalesData();