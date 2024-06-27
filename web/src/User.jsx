import React, { useState, useEffect } from "react";
import { useReadContract, useWriteContract } from "wagmi";
import abi from "./abi";

export default function User({ account, contract_address }) {
  const { writeContract } = useWriteContract();

  const [balance, setBalance] = useState(0);
  const [purchaseAmount, setPurchaseAmount] = useState("");

  const {
    data: balanceData,
    error: balanceError,
    isLoading: balanceIsLoading,
  } = useReadContract({
    abi: abi,
    address: contract_address,
    functionName: "balanceOf",
    args: [account.address],
  });

  useEffect(() => {
    if (balanceError) {
      console.error("Error:", balanceError);
    } else if (balanceIsLoading) {
      console.log("Loading balance...");
    } else {
      setBalance(balanceData);
    }
  }, [balanceData, balanceError, balanceIsLoading]);

  function handlePurchase() {
    if (!purchaseAmount || isNaN(purchaseAmount) || purchaseAmount <= 0) {
      alert("Please enter a valid amount");
      return;
    }

    const valueInWei = BigInt(parseFloat(purchaseAmount) * 1e18); // Convert ether to wei

    writeContract({
      abi: abi,
      address: contract_address,
      functionName: "purchaseCredits",
      args: [account.address],
      value: valueInWei,
    });
  }

  return (
    <>
      <h1>User</h1>
      <p>Address: {account.address}</p>
      <p>Carbon Credits owned: {balance ? balance.toString() : "0"}</p>
      <section>
        <h2>Purchase Carbon Credits, payable in ether</h2>
        <h3>You will receive credits equal to the amount of ether you send</h3>
        <input
          type="number"
          placeholder="Enter amount in ether"
          value={purchaseAmount}
          onChange={(e) => setPurchaseAmount(e.target.value)}
        />
        <button onClick={handlePurchase}>Buy</button>
      </section>
    </>
  );
}
