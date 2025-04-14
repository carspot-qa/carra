document.getElementById("carForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const budget = parseFloat(document.getElementById("budget").value);
    const currency = document.getElementById("currency").value;
    const region = document.getElementById("region").value;
    const fuel = document.getElementById("fuel").value;
  
    const exchangeRates = {
      qar: 0.27,
      pkr: 0.0036,
      usd: 1
    };
  
    const budgetInUSD = budget * exchangeRates[currency];
  
    const res = await fetch("cars.json");
    const cars = await res.json();
  
    const filteredCars = cars.filter(car =>
      car.region === region &&
      car.fuel === fuel &&
      car.priceUSD <= budgetInUSD
    );
  
    const resultDiv = document.getElementById("results");
    resultDiv.innerHTML = "<h3>Matching Cars:</h3>";
  
    if (filteredCars.length > 0) {
      filteredCars.forEach(car => {
        const priceInUserCurrency = Math.round(car.priceUSD / exchangeRates[currency]);
        resultDiv.innerHTML += `
          <div class="car">
            <strong>${car.name}</strong><br/>
            ${priceInUserCurrency.toLocaleString()} ${currency.toUpperCase()}
          </div>
        `;
      });
    } else {
      resultDiv.innerHTML += `<p>No exact matches found, but here are a few close ones:</p>`;
      const closeCars = cars.filter(car =>
        car.region === region &&
        car.fuel === fuel &&
        car.priceUSD <= budgetInUSD * 1.2 // show near-budget cars too
      );
      if (closeCars.length > 0) {
        closeCars.forEach(car => {
          const priceInUserCurrency = Math.round(car.priceUSD / exchangeRates[currency]);
          resultDiv.innerHTML += `
            <div class="car">
              <strong>${car.name}</strong><br/>
              ${priceInUserCurrency.toLocaleString()} ${currency.toUpperCase()}
            </div>
          `;
        });
      } else {
        resultDiv.innerHTML += `<p>Still no results. Try changing filters or increasing your budget.</p>`;
      }
    }
  });
  