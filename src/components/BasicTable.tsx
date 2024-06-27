import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useState, useEffect } from 'react';

/*
function createData(
  time: string,
  temp: number,
  humidity: number,
  wind: number
) {
  return { time, temp, humidity, wind };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24),
  createData("Ice cream sandwich", 237, 9.0, 37),
  createData("Eclair", 262, 16.0, 24),
  createData("Cupcake", 305, 3.7, 67),
  createData("Gingerbread", 356, 16.0, 49),
];*/


interface Config {
  rows: Array<object>;
}

export default function BasicTable( data:Config ) {
  let [rows, setRows] = useState<object[]>([])

  useEffect( () => {

    (()=> {

        setRows(data.rows)

    })()

}, [data] )

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
          <TableCell>Rango de horas</TableCell>
          <TableCell align="right">Dirección del viento</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {rows.map((row) => (
                 <TableRow
                     key={row.rangeHours}>
                     <TableCell component="th" scope="row">
                         {row.rangeHours}
                     </TableCell>
                     <TableCell align="right">{row.windDirection}</TableCell>
                 </TableRow>
             ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
