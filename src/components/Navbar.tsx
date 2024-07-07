import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-scroll";

const Navbar: React.FC = () => {
  return (
    <AppBar className="appBar">
      <Toolbar>
        <Typography variant="h6" className="title">
          Dashboard Clima
        </Typography>
        <Button color="inherit" className="button">
          <Link to="indicadores" smooth={true} duration={500}>
            Inicio
          </Link>
        </Button>
        <Button color="inherit" className="button">
          <Link to="tabla" smooth={true} duration={500}>
            Tabla
          </Link>
        </Button>
        <Button color="inherit" className="button">
          <Link to="grafico" smooth={true} duration={500}>
            Diagrama
          </Link>
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
