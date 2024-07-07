import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useRef } from "react";

interface ControlPanelProps {
  onVariableChange: (variable: string | null) => void;
}

export default function ControlPanel({ onVariableChange }: ControlPanelProps) {
  const descriptionRef = useRef<HTMLDivElement>(null);

  let items = [
    {
      name: "Humedad",
      description:
        "Cantidad de vapor de agua presente en el aire, generalmente expresada como un porcentaje.",
    },
    {
      name: "Nubosidad",
      description:
        "Grado de cobertura del cielo por nubes, afectando la visibilidad y la cantidad de luz solar recibida.",
    },
  ];

  let options = items.map((item, key) => (
    <MenuItem key={key} value={item.name}>
      {item.name}
    </MenuItem>
  ));

  const handleChange = (event: SelectChangeEvent) => {
    let value = event.target.value;
    if (descriptionRef.current !== null) {
      let item = items.find((i) => i.name === value);
      descriptionRef.current.innerHTML = item ? item.description : "";
    }
    onVariableChange(value === "" ? null : value);
  };

  return (
    <Paper
      sx={{
        p: 2,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography mb={2} component="h3" variant="h6" color="primary">
        Variables Meteorológicas
      </Typography>

      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="simple-select-label">Variables</InputLabel>
          <Select
            labelId="simple-select-label"
            id="simple-select"
            label="Variables"
            defaultValue=""
            onChange={handleChange}
          >
            <MenuItem value="">Seleccione una variable</MenuItem>
            {options}
          </Select>
        </FormControl>
      </Box>

      <Typography
        ref={descriptionRef}
        mt={2}
        component="p"
        color="text.secondary"
      />
    </Paper>
  );
}
