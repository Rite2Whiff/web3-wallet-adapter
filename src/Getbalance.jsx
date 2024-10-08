import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React from "react";

const Getbalance = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = React.useState(null);

  async function getSolBalance() {
    const pubKey = wallet.publicKey;
    if (!pubKey) {
      console.log("no wallet found");
    } else {
      const balance = await connection.getBalance(pubKey);
      setBalance(balance);
    }
  }

  getSolBalance();

  return <div>Sol balance :{balance / LAMPORTS_PER_SOL}</div>;
};

export default Getbalance;
