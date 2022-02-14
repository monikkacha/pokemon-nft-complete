require("@nomiclabs/hardhat-waffle");
require("dotenv").config()

module.exports = {
  solidity: "0.8.4",
  networks: {
    mumbai: {
      url: process.env.ALCHEMY_API_KEY_MUMBAI,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
