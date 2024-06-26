require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks: {
    hardhat: {},
    xdctestnet: {
      url: "https://earpc.apothem.network",
      accounts: [
        process.env.PRIVATE_KEY ||
          1234567890123456789012345678901234567890123456789012345678901234,
      ],
    },
    sepolia: {
      url: "https://sepolia.drpc.org",
      accounts: [
        process.env.PRIVATE_KEY ||
          1234567890123456789012345678901234567890123456789012345678901234,
      ],
    },
  },
};
