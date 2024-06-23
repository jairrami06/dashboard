import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

const Navbar: React.FC = () => {
  return (
    <AppBar className="appBar">
      <Toolbar>
        <Typography variant="h6" className="title">
          Dashboard Clima
        </Typography>
        <Button color="inherit" className="button">Inicio</Button>
        <Button color="inherit" className="button">Tabla</Button>
        <Button color="inherit" className="button">Diagrama</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;