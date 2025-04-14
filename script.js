document.getElementById("carForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const budget = parseFloat(document.getElementById("budget").value);
    const currency = document.getElementById("currency").value;
    const region = document.getElementById("region").value;
    const fuel = document.getElementById("fuel").value;
  
    const res = await fetch("cars.json");
    const cars = await res.json();
  
    // Currency conversion rates to USD
    const exchangeRates = {
      usd: 1,
      qar: 0.27,
      pkr: 0.0036
    };
  
    const budgetInUSD = budget * exchangeRates[currency];
  
    const results = cars.filter(car =>
      car.region === region &&
      car.fuel === fuel &&
      car.priceUSD <= budgetInUSD
    );
  
    const resultDiv = document.getElementById("results");
    resultDiv.innerHTML = "<h3>Results:</h3>" +
      (results.length
        ? results.map(car => {
          const localPrice = car.priceUSD / exchangeRates[currency];
          return `<p><strong>${car.name}</strong> - ${Math.round(localPrice).toLocaleString()} ${currency.toUpperCase()}</p>`;
        }).join("")
        : "<p>No matches found.</p>");
  });
  