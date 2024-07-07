import "./App.css";
import Grid from "@mui/material/Unstable_Grid2";
import Indicator from "./components/Indicator";
import Summary from "./components/Summary";
import BasicTable from "./components/BasicTable";
import Navbar from "./components/Navbar";
import WeatherChart from "./components/WeatherChart";
import ControlPanel from "./components/ControlPanel";
import { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";

function App() {
  let [indicators, setIndicators] = useState<JSX.Element[]>([]);
  let [rowsTable, setRowsTable] = useState<object[]>([]);
  let [chartData, setChartData] = useState([]);
  let [selectedVariable, setSelectedVariable] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let savedTextXML = localStorage.getItem("openWeatherMap");
        let expiringTime = localStorage.getItem("expiringTime");

        let nowTime = new Date().getTime();

        let expiringTimeNumber = expiringTime ? parseInt(expiringTime) : 0;

        if (!expiringTime || nowTime > expiringTimeNumber) {
          let API_KEY = "8790c2acba51ec2fef7f27ac9f5a1353";
          let response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`
          );
          savedTextXML = await response.text();

          let hours = 1;
          let delay = hours * 3600000;

          localStorage.setItem("openWeatherMap", savedTextXML);
          localStorage.setItem("expiringTime", (nowTime + delay).toString());
        }

        const parser = new DOMParser();
        const xml = parser.parseFromString(savedTextXML!, "application/xml");

        let dataToIndicators: [string, string, string][] = [];

        let location = xml.getElementsByTagName("location")[0];
        let location1 = xml.getElementsByTagName("location")[1];

        let city = location.getElementsByTagName("name")[0].textContent || "";
        dataToIndicators.push(["Location", "Ciudad", city]);

        let country =
          location.getElementsByTagName("country")[0].textContent || "";
        dataToIndicators.push(["Location", "País", country]);

        let latitude = location1.getAttribute("latitude") || "";
        dataToIndicators.push(["Location", "Latitud", latitude]);

        let longitude = location1.getAttribute("longitude") || "";
        dataToIndicators.push(["Location", "Longitud", longitude]);

        let indicatorsElements = dataToIndicators.map((element, index) => (
          <Indicator key={index} title={element[1]} value={element[2]} />
        ));

        setIndicators(indicatorsElements);

        let arrayObjects = Array.from(xml.getElementsByTagName("time")).map(
          (timeElement) => {
            let fromTime = timeElement.getAttribute("from").split("T");
            let toTime = timeElement.getAttribute("to").split("T");

            let date = fromTime[0];
            let time = fromTime[1] + " - " + toTime[1];

            let windSpeed =
              timeElement
                .getElementsByTagName("windSpeed")[0]
                .getAttribute("mps") + " m/s";
            let windDirection =
              timeElement
                .getElementsByTagName("windDirection")[0]
                .getAttribute("deg") +
              " " +
              timeElement
                .getElementsByTagName("windDirection")[0]
                .getAttribute("code");
            let temperatureKelvin =
              parseFloat(
                timeElement
                  .getElementsByTagName("temperature")[0]
                  .getAttribute("value")
              );
            let temperatureCelsius = (temperatureKelvin - 273.15).toFixed(2) + "°C";

            let humidity = parseFloat(
              timeElement.getElementsByTagName("humidity")[0].getAttribute("value")
            );

            let cloudiness = parseFloat(
              timeElement.getElementsByTagName("clouds")[0].getAttribute("all")
            );

            return {
              date: date,
              time: time,
              windSpeed: windSpeed,
              windDirection: windDirection,
              temperature: temperatureCelsius,
              humidity: humidity,
              cloudiness: cloudiness,
            };
          }
        );

        arrayObjects = arrayObjects.slice(0, 8);

        setRowsTable(arrayObjects);

        let chartDataArray = arrayObjects.map((data) => [
          data.time.split(" - ")[0],
          data.humidity,
          data.cloudiness,
        ]);
        setChartData([["Hora", "Humedad", "Nubosidad"], ...chartDataArray]);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleVariableChange = (variable: string | null) => {
    setSelectedVariable(variable);
  };

  return (
    <>
      <Navbar />
      <Grid container spacing={5} sx={{ mt: 10 }}>
        <Grid item xs={12} id="indicadores">
          <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
            Inicio
          </Typography>
        </Grid>
        {indicators.slice(0, 4).map((indicator, index) => (
          <Grid xs={12} md={6} lg={3} key={index}>
            {indicator}
          </Grid>
        ))}
        <Grid item xs={12} id="resumen">
        </Grid>
        <Grid xs={12} md={6} lg={3}>
          <Summary />
        </Grid>
        <Grid item xs={12} id="tabla">
          <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2 }}>
            Tabla de pronóstico para mañana
          </Typography>
        </Grid>
        <Grid xs={12} md={12} lg={12}>
          <BasicTable rows={rowsTable} />
        </Grid>
        
        <Grid item xs={12} id="grafico">
          <Typography variant="h4" component="h1" sx={{ mt: 4, mb: 2 }}>
            Diagrama de Nubosidad vs Humedad
          </Typography>
        </Grid>
        <Grid xs={12} lg={2}>
          <ControlPanel onVariableChange={handleVariableChange} />
        </Grid>
        <Grid xs={12} lg={10}>
          <WeatherChart data={chartData} selectedVariable={selectedVariable} />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
