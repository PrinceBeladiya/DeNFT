require("@nomiclabs/hardhat-waffle");
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
    }
  },

  // networks: {
  //   rinkeby: {
  //     url: `https://rinkeby.infura.io/v3/${api}`,
  //     accounts: [`${Rinkeby_key}`]
  //   }
  // }

  paths: {
    artifacts: "./denft-frontend/src/contracts"
  }
};
