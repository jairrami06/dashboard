import "./App.css";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import Indicator from "./components/Indicator";
import Summary from "./components/Summary";
import BasicTable from "./components/BasicTable";
import Navbar from "./components/Navbar";
import WeatherChart from "./components/WeatherChart";
import ControlPanel from "./components/ControlPanel";

function App() {
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
          <Indicator title="País" subtitle="Probabilidad" value={"Ecuador"} />
        </Grid>
        <Grid xs={12} md={6} lg={3}>
          <Indicator title="Ciudad" value={"Guayaquil"} />
        </Grid>
        <Grid xs={12} md={6} lg={3}>
          <Indicator title="Temperatura" value={"25.4 °C"} />
        </Grid>
        <Grid xs={12} md={6} lg={3}>
          <Indicator title="Velocidad Viento" value={"10 km/h"} />
        </Grid>

        <Grid xs={12} md={6} lg={3}>
          <Indicator title="Temperatura Máxima" value={"40 °C"} />
        </Grid>
        <Grid xs={12} md={6} lg={9}></Grid>
        <Grid xs={12} md={3} lg={3}>
          <Summary></Summary>
        </Grid>
        <Grid xs={12} md={9} lg={9}>
          <BasicTable />
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
