import { useState } from "react";
import { ed25519 } from "@noble/curves/ed25519";
import bs58 from "bs58";
import { useWallet } from "@solana/wallet-adapter-react";

const Signmessage = () => {
  const [messageValue, setMessageValue] = useState("");
  const { publicKey, signMessage } = useWallet();

  async function sendMessage() {
    if (!publicKey) throw new Error("no public key found");
    if (!signMessage)
      throw new Error("wallet does not support signing message");
    const message = messageValue;
    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);
    console.log(message, encodedMessage, signature);
    if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes()))
      throw new Error("Message signature invalid");
    alert(`Message signature : ${bs58.encode(signature)}`);
  }

  return (
    <div>
      <input
        type="text"
        name="sign"
        id="sign"
        value={messageValue}
        onChange={(e) => setMessageValue(e.target.value)}
      />
      <button onClick={sendMessage}>Sign message</button>
    </div>
  );
};

export default Signmessage;
