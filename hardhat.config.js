require("@nomiclabs/hardhat-waffle");

const secrets = {
  "AlchemyMumbaiAPIkey": "-B53i36HC0dwchxm586SE-0uuH3OKD7w",
  "Mnemonic": ""
}

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.4.18"
      },
      {
        version: "0.8.4"
      }
    ]
  },
  networks: {
    hardhat: {
      chainId: 31337
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2/${secrets.AlchemyMumbaiAPIkey}`,
      accounts: {
        mnemonic: secrets.Mnemonic
      }
    },
  },

  paths: {
    artifacts: "./denft-frontend/src/contracts"
  }
};
