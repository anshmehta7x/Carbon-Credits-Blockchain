async function main() {
  const [deployer, verifier, regulator] = await ethers.getSigners();

  console.log("Deploying contracts with the account:", deployer.address);
  console.log(verifier.address, regulator.address);
  const CarbonCreditManager = await ethers.getContractFactory(
    "CarbonCreditManager"
  );
  const carbonCreditManager = await CarbonCreditManager.deploy(
    verifier.address,
    regulator.address
  );
  await carbonCreditManager.waitForDeployment();
  console.log(
    "CarbonCreditManager deployed to:",
    await carbonCreditManager.address
  );
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
