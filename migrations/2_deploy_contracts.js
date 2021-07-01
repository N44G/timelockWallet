var TimeLockedWalletFactory = artifacts.require("TimeLockedWalletFactory");
var TokenN = artifacts.require("TokenN");

module.exports = function(deployer) {
  deployer.deploy(TimeLockedWalletFactory);
  deployer.deploy(TokenN);
};
