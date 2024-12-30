// components/MetaMaskButton.js
import React from "react";
import { useMetaMask } from "../hooks/useMetaMask";

const MetaMaskBtn = () => {
  const { address, isConnected, connectMetaMask, disconnectMetaMask } =
    useMetaMask();

  return (
    <div>
      {isConnected ? (
        <div>
          <button onClick={disconnectMetaMask}>Disconnect Wallet</button>
        </div>
      ) : (
        <button onClick={connectMetaMask}>MetaMask Login</button>
      )}
    </div>
  );
};

export default MetaMaskBtn;
