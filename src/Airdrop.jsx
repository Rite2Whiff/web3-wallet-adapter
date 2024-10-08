import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import React from "react";

const Airdrop = () => {
  const [dropValue, setDropValue] = React.useState(" ");
  const wallet = useWallet();
  const { connection } = useConnection();

  async function requestAirdrop() {
    const value = dropValue;
    await connection.requestAirdrop(wallet.publicKey, value * LAMPORTS_PER_SOL);
    console.log(`${value} airdropped in wallet address ${wallet.publicKey}`);
  }

  return (
    <div>
      <input
        type="number"
        name="solana"
        id="solana"
        value={dropValue}
        onChange={(e) => setDropValue(e.target.value)}
      />
      <button onClick={requestAirdrop}>Request Airdrop</button>
    </div>
  );
};

export default Airdrop;
