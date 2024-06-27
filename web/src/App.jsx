import { useEffect, useState } from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

import "./App.css";
import { useAccount, useReadContract } from "wagmi";
import abi from "./abi";

function App() {
  const account = useAccount();
  const [verifier, setVerifier] = useState(null);
  const [regulator, setRegulator] = useState(null);
  const contract_address =
    import.meta.env.CONTRACT_ADDRESS ||
    "0xC9bC49A715f07383972eBA3000B79696F6e9a33a";

  const {
    data: verifierData,
    error,
    isLoading,
  } = useReadContract({
    abi: abi,
    address: contract_address,
    functionName: "getVerifier",
  });

  useEffect(() => {
    if (error) {
      console.error("Error:", error);
    } else if (isLoading) {
      console.log("Loading verifier...");
    } else {
      setVerifier(verifierData);
    }
  }, [verifierData, error, isLoading]);

  const {
    data: regulatorData,
    error: regulatorError,
    isLoading: regulatorIsLoading,
  } = useReadContract({
    abi: abi,
    address: contract_address,
    functionName: "getRegulator",
  });

  useEffect(() => {
    if (regulatorError) {
      console.error("Error:", regulatorError);
    } else if (regulatorIsLoading) {
      console.log("Loading regulator...");
    } else {
      setRegulator(regulatorData);
    }
  }, [regulatorData, regulatorError, regulatorIsLoading]);

  return (
    <>
      <div
        style={
          //align to top right of page
          {
            position: "absolute",
            right: 0,
            top: 0,
            padding: "10px",
            margin: "10px",
            borderRadius: "10px",
            boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.1)",
            zIndex: 1000,
          }
        }
      >
        <ConnectButton />
      </div>
      <div>
        {account.address === verifier ? (
          <div>
            <h1>Verifier</h1>
            <p>Address: {verifier}</p>
          </div>
        ) : account.address === regulator ? (
          <div>
            <h1>Regulator</h1>
            <p>Address: {regulator}</p>
          </div>
        ) : (
          <div>
            <h1>User</h1>
            <p>Address: {account.address}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
