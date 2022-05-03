async function main() {
  const [accounts] = await ethers.getSigners();
  console.log("deployed contract with account - ", await accounts.getAddress());

  const Token = await ethers.getContractFactory('DeNFT');
  const token = await Token.deploy();

  console.log("Token address ==> ", token.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
