require("@nomiclabs/hardhat-waffle");
/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.4",

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
