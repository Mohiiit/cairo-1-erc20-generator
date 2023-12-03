import React from 'react'
import { useAccount, useNetwork, useConnect, Connector } from "@starknet-react/core";
import { Card, CardHeader, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent  } from '@mui/material';
import CreateToken from './CreateToken';


const Home = () => {
    const { connect, connectors } = useConnect();
  return (
    <div style={{ width: '100%' }} className="flex justify-end">
        <Inner />
    <Card>
    <CardHeader title="Connect" />
      <CardContent>
        <div className="flex flex-col gap-4">
          {connectors.map((connector) => (
            <Button
              key={connector.id}
              onClick={() => connect({ connector })}
              disabled={!connector.available()}
              startIcon={<img src={connector.icon.dark} alt="icon" className="w-4 h-4 mr-2" />}
            >
              Connect {connector.name}
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
    <CreateToken />
  </div>
  )
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

export default Home