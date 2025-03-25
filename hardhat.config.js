require("@nomicfoundation/hardhat-toolbox");

// Deployment on Moonbase Alpha Testnet
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
  	moonbase: {
  		url: 'https://rpc.api.moonbase.moonbeam.network',
  		chainId: 1287,
  		accounts: ['']
  	}
  }
};
