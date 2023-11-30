import logo from './logo.svg';
import './App.css';
import Home from './components/Home';
import { StarknetProvider } from './components/Provider';
import { Card, CardHeader, CardContent, Typography } from '@mui/material';
import { useAccount, useNetwork } from "@starknet-react/core";


function App() {
  return (
    <StarknetProvider>
      <Home />
      <Inner />
    </StarknetProvider>
  );
}

function Inner() {
  const { address } = useAccount();
  const { chain } = useNetwork();
  const addressShort = address
    ? `${address.slice(0, 6)}...${address.slice(-4)}`
    : null;
  return (
    <Card sx={{ maxWidth: 400, margin: 'auto' }}>
    <CardHeader title="Your Wallet" />
    <CardContent sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <Typography variant="body1">
        {address
          ? `Connected as ${addressShort} on ${chain.name}`
          : 'Connect wallet to get started'}
      </Typography>
    </CardContent>
  </Card>
  );
}

export default App;
