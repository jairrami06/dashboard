import "./App.css";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Indicator from "./components/Indicator";
import Summary from "./components/Summary";
import BasicTable from "./components/BasicTable";
import Navbar from "./components/Navbar";
import WeatherChart from "./components/WeatherChart";
import ControlPanel from "./components/ControlPanel";
import { useEffect, useState } from 'react';

function App() {

  {/* Hook: useEffect */ }
  let [indicators, setIndicators] = useState<JSX.Element[]>([]);
  let [rowsTable, setRowsTable] = useState<object[]>([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        let savedTextXML = localStorage.getItem("openWeatherMap");
        let expiringTime = localStorage.getItem("expiringTime");
  
        let nowTime = (new Date()).getTime();
  
        let expiringTimeNumber = expiringTime ? parseInt(expiringTime) : 0;
  
        if (!expiringTime || nowTime > expiringTimeNumber) {
          let API_KEY = "8790c2acba51ec2fef7f27ac9f5a1353";
          let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=Guayaquil&mode=xml&appid=${API_KEY}`);
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
        dataToIndicators.push(["Location", "City", city]);
  
        let country = location.getElementsByTagName("country")[0].textContent || "";
        dataToIndicators.push(["Location", "Country", country]);
  
        let latitude = location1.getAttribute("latitude") || "";
        dataToIndicators.push(["Location", "Latitude", latitude]);
  
        let longitude = location1.getAttribute("longitude") || "";
        dataToIndicators.push(["Location", "Longitude", longitude]);
  
        let indicatorsElements = dataToIndicators.map(
          (element, index) => (
            <Indicator
              key={index}
              title={element[1]}
              value={element[2]}
            />
          )
        );
  
        setIndicators(indicatorsElements);
  
        let arrayObjects = Array.from(xml.getElementsByTagName("time")).map((timeElement) => {
          let fromTime = timeElement.getAttribute("from").split("T");
          let toTime = timeElement.getAttribute("to").split("T");
  
          let date = fromTime[0];
          let time = fromTime[1] + " - " + toTime[1];
  
          let windSpeed = timeElement.getElementsByTagName("windSpeed")[0].getAttribute("mps") + " m/s";
          let windDirection = timeElement.getElementsByTagName("windDirection")[0].getAttribute("deg") + " " + timeElement.getElementsByTagName("windDirection")[0].getAttribute("code");
          let temperature = timeElement.getElementsByTagName("temperature")[0].getAttribute("value") + "°C";
  
          return {
            date: date,
            time: time,
            windSpeed: windSpeed,
            windDirection: windDirection,
            temperature: temperature
          };
        });
  
        arrayObjects = arrayObjects.slice(0, 8);
  
        setRowsTable(arrayObjects);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);


  return (
    <>
      {/* 
			<Grid container spacing={5}>
				<Grid xs={12} sm={4} md={3} lg={2}>1</Grid>
				<Grid xs={6} sm={4} md={3} lg={2}>2</Grid>
				<Grid xs={6} sm={4} md={3} lg={2}>3</Grid>
				<Grid xs={12} sm={4} md={3} lg={2}>4</Grid>
				<Grid xs={6} sm={4} md={6} lg={2}>5</Grid>
				<Grid xs={6} sm={4} md={6} lg={2}>6</Grid>
			</Grid>
			*/}
      <Navbar />

      <Grid container spacing={5} sx={{ mt: 10 }}>
        <Grid xs={12} md={6} lg={3}>
          {indicators[0]}
          {/* <Indicator title="País" subtitle="Probabilidad" value={"Ecuador"} />*/}
        </Grid>
        <Grid xs={12} md={6} lg={3}>
          {indicators[1]}
          {/*<Indicator title="Ciudad" value={"Guayaquil"} />*/}
        </Grid>
        <Grid xs={12} md={6} lg={3}>
          {indicators[2]}

          {/*<Indicator title="Temperatura" value={"25.4 °C"} />*/}
        </Grid>
        <Grid xs={12} md={6} lg={3}>
        {indicators[3]}

          {/*<Indicator title="Velocidad Viento" value={"10 km/h"} />*/}
        </Grid>

        <Grid xs={12} md={6} lg={3}>
        {indicators[4]}

          {/*<Indicator title="Temperatura Máxima" value={"40 °C"} />*/}
        </Grid>
        <Grid xs={12} md={6} lg={9}></Grid>
        <Grid xs={12} md={3} lg={3}>
          <Summary></Summary>
        </Grid>
        <Grid xs={12} md={9} lg={9}>
        <BasicTable rows={rowsTable}></BasicTable>
        </Grid>

        <Grid xs={12} lg={2}>
          <ControlPanel />
        </Grid>
        <Grid xs={12} lg={10}>
          <WeatherChart></WeatherChart>
        </Grid>
      </Grid>
    </>
  );
}

export default App;
