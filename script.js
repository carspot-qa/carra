document.getElementById("carForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const budget = parseInt(document.getElementById("budget").value);
  const type = document.getElementById("type").value;

  const res = await fetch("cars.json");
  const cars = await res.json();

  const resultsDiv = document.getElementById("results");
  const matches = cars[type].filter(car => car.priceQAR <= budget);

  resultsDiv.innerHTML = `<h3>Results:</h3>`;

  
  if (matches.length > 0) {
    matches.forEach(car => {
      resultsDiv.innerHTML += `
        <div class="car">
          <strong>${car.name}</strong><br/>
          ${car.priceQAR.toLocaleString()} QAR
        </div>
      `;
    });
  } else {
    resultsDiv.innerHTML += `<p>there was an error, no cars found within your budget</p>`;
  }
  
});
