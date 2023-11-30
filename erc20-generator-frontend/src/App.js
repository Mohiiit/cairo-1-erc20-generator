import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { StarknetProvider } from './components/Provider';
import { Card, CardHeader, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent  } from '@mui/material';
import { useAccount, useNetwork, useConnect, Connector } from "@starknet-react/core";


function App() {
  return (
    <StarknetProvider>
      <Home />
    </StarknetProvider>
  );
}


export default App;
