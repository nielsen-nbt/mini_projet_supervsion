const tableBody = document.getElementById("table-body");
const ctx = document.getElementById("chart").getContext("2d");

let labels = [];
const colors = [
    '#3498db', '#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6', 
    '#e67e22', '#1abc9c', '#34495e', '#7f8c8d', '#ff9ff3'
];

const chart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: labels,
        datasets: [] 
    },
    options: {
        responsive: true,
        maintainAspectRatio: false, // Permet d'utiliser les 550px du CSS
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: { font: { size: 14 }, stepSize: 10 }
            },
            x: {
                ticks: { font: { size: 12 } }
            }
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: { padding: 25, usePointStyle: true, font: { size: 14 } }
            }
        }
    }
});

function update() {
    fetch("http://127.0.0.1:5005/data")
        .then(res => res.json())
        .then(data => {
            let htmlBuffer = "";
            
            data.forEach((m, index) => {
                // Remplissage tableau
                htmlBuffer += `<tr><td><strong>${m.nom}</strong></td><td>${m.temperature}°C</td><td>${m.cpu}%</td><td>${m.timestamp}</td></tr>`;

                // Gestion des 10 courbes
                if (!chart.data.datasets[index]) {
                    chart.data.datasets.push({
                        label: m.nom,
                        data: [],
                        borderColor: colors[index],
                        borderWidth: 3, // Ligne bien visible
                        tension: 0.4,
                        pointRadius: 0,
                        fill: false
                    });
                }
                
                chart.data.datasets[index].data.push(m.cpu);
                
                // On garde 25 points pour que ce soit bien large
                if (chart.data.datasets[index].data.length > 25) {
                    chart.data.datasets[index].data.shift();
                }
            });

            tableBody.innerHTML = htmlBuffer;

            labels.push(data[0].timestamp);
            if (labels.length > 25) labels.shift();
            
            chart.update('none'); // Mise à jour fluide
        })
        .catch(err => console.log("Le serveur backend est-il lancé ?"));
}

setInterval(update, 5000);
update();