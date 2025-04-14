document.getElementById("carForm").addEventListener("submit", (e) => {
    e.preventDefault();
  
    const budget = parseInt(document.getElementById("budget").value);
    const type = document.getElementById("type").value;
  
    const cars = {
      suv: [
        { name: "Toyota Land Cruiser", priceQAR: 320000 },
        { name: "Nissan Patrol", priceQAR: 290000 },
        { name: "Hyundai Tucson", priceQAR: 95000 }
      ],
      sedan: [
        { name: "Toyota Camry", priceQAR: 95000 },
        { name: "Honda Accord", priceQAR: 88000 },
        { name: "Kia Cerato", priceQAR: 72000 }
      ],
      truck: [
        { name: "Ford F-150", priceQAR: 210000 },
        { name: "Toyota Hilux", priceQAR: 115000 }
      ],
      hatchback: [
        { name: "Suzuki Swift", priceQAR: 48000 },
        { name: "Hyundai i20", priceQAR: 55000 }
      ]
    };
  
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
      resultsDiv.innerHTML += `<p>No cars found under your budget.</p>`;
    }
  });
  