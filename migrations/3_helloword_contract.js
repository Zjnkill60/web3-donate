var HelloWorld = artifacts.require("Faucet");
module.exports = function(deployer) {
    deployer.deploy(HelloWorld);
    // Additional contracts can be deployed here
};