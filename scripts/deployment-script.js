async function main() {
  const [accounts] = await ethers.getSigners();
  console.log("deployed contract with account - ", await accounts.getAddress());

  const Token = await ethers.getContractFactory('DeNFT');
  const token = await Token.deploy();

  const MarketPlace = await ethers.getContractFactory('MarketPlace');
  const marketplace = await MarketPlace.deploy();

  console.log("Token address ==> ", token.address);
  console.log("MarketPlace address ==> ", marketplace.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
