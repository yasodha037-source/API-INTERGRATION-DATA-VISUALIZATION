let weatherChart;

function getWeather() {
    let city = document.getElementById("city").value;

    fetch(`/weather?city=${city}`)
        .then(res => res.json())
        .then(data => {

            document.getElementById("result").innerHTML =
                "City: " + data.city + "<br>" +
                "Temp: " + data.temp + " °C<br>" +
                "Humidity: " + data.humidity + "%";

            drawChart(data.temp, data.humidity);
        });
}

function drawChart(temp, humidity) {
    const ctx = document.getElementById("weatherChart");

    if (weatherChart) {
        weatherChart.destroy();
    }

    weatherChart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Temperature", "Humidity"],
            datasets: [{
                label: "Weather Data",
                data: [temp, humidity]
            }]
        }
    });
}
