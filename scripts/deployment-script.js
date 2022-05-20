async function main() {
  const [accounts] = await ethers.getSigners();
  console.log("deployed contract with account - ", await accounts.getAddress());

  const DeNFT = await ethers.getContractFactory('DeNFT');
  const deNFT = await DeNFT.deploy();

  const MarketPlace = await ethers.getContractFactory('MarketPlace');
  const marketplace = await MarketPlace.deploy();

  console.log("DeNFT address ==> ", deNFT.address);
  console.log("MarketPlace address ==> ", marketplace.address);
  console.log("FractionalERC721Factory address ==> ", fractionFactory.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
