import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { useState } from "react";
import {
  LAMPORTS_PER_SOL,
  SystemProgram,
  PublicKey,
  Transaction,
} from "@solana/web3.js";
import { Buffer } from "buffer";
window.Buffer = Buffer;

const SendSol = () => {
  const [pubKey, setPubKey] = useState("");
  const [solAmount, setSolAmount] = useState(0);
  const wallet = useWallet();
  const { connection } = useConnection();

  async function sendSol() {
    let topubKey = pubKey;
    let amount = solAmount;
    const transaction = new Transaction();
    transaction.add(
      SystemProgram.transfer({
        fromPubkey: wallet.publicKey,
        toPubkey: new PublicKey(topubKey),
        lamports: amount * LAMPORTS_PER_SOL,
      })
    );
    await wallet.sendTransaction(transaction, connection);
    alert(`Sent ${amount} to ${topubKey}`);
  }

  return (
    <div>
      <input
        type="text"
        name="public-key"
        id="public-key"
        value={pubKey}
        onChange={(e) => setPubKey(e.target.value)}
      />
      <input
        type="number"
        name="sol-amount"
        id="sol-amount"
        value={solAmount}
        onChange={(e) => setSolAmount(e.target.value)}
      />
      <button onClick={sendSol}>Send</button>
    </div>
  );
};

export default SendSol;
