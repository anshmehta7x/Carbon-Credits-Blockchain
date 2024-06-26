async function main() {
  const signers = await ethers.getSigners();
  const deployer = signers[0];

  console.log("Deploying contracts with the account:", deployer.address);
  const CarbonCreditManager = await ethers.getContractFactory(
    "CarbonCreditManager"
  );
  const carbonCreditManager = await CarbonCreditManager.deploy(
    deployer.address,
    deployer.address
  );
  await carbonCreditManager.deployTransaction.wait();

  console.log(carbonCreditManager.address);
  console.log(carbonCreditManager.deployTransaction);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
