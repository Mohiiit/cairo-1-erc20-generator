import React from 'react'
import { useConnect, Connector } from "@starknet-react/core";
import { Button, Dialog, DialogTitle, DialogContent, Typography } from '@mui/material';


const Home = () => {
    const { connect, connectors } = useConnect();
  return (
    <div style={{ width: '100%' }} className="flex justify-end">
    <Dialog>
      <DialogTitle>Connect Wallet</DialogTitle>
      <DialogContent>
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
      </DialogContent>
    </Dialog>
  </div>
  )
}

export default Home