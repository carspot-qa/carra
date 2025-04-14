document.getElementById("carForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const budget = parseInt(document.getElementById("budget").value);
    const region = document.getElementById("region").value;
    const fuel = document.getElementById("fuel").value;
  
    const res = await fetch("cars.json");
    const cars = await res.json();
  
    const results = cars.filter(
      car => car.region === region && car.fuel === fuel && car.price <= budget
    );
  
    const resultDiv = document.getElementById("results");
    resultDiv.innerHTML = "<h3>Results:</h3>" +
      (results.length
        ? results.map(car => `<p>${car.name} - $${car.price}</p>`).join("")
        : "<p>No matches found.</p>");
  });
  