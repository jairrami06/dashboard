import { Chart } from "react-google-charts";
import Paper from "@mui/material/Paper";

interface WeatherChartProps {
  data: any[];
  selectedVariable: string | null;
}

export default function WeatherChart({
  data,
  selectedVariable,
}: WeatherChartProps) {
  const options = {
    curveType: "function",
    legend: { position: "right" },
  };

  let filteredData;
  if (selectedVariable === "Humedad") {
    filteredData = data.map((row, index) => {
      if (index === 0) return ["Hora", "Humedad"];
      return [row[0], row[1]];
    });
  } else if (selectedVariable === "Nubosidad") {
    filteredData = data.map((row, index) => {
      if (index === 0) return ["Hora", "Nubosidad"];
      return [row[0], row[2]];
    });
  } else {
    filteredData = data;
  }

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Chart
        chartType="LineChart"
        data={filteredData}
        width="100%"
        height="400px"
        options={options}
        legendToggle
      />
    </Paper>
  );
}
