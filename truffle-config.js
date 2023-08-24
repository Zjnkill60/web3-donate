

// require('dotenv').config();
// const { MNEMONIC, PROJECT_ID } = process.env;

const HDWalletProvider = require('@truffle/hdwallet-provider');
const MNEMONIC = 'two plunge reduce stumble point nest wall clock approve frozen skill ghost'
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: "./public/contracts",
  networks: {
    develop: {
      port: 8545
    },
    testnet: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    onus: {
      provider: () => new HDWalletProvider(MNEMONIC, `https://rpc.onuschain.io/`),
      network_id: 1975,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  }
  ,
  compilers: {
    solc: {
      version: "0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
    }
  },
};
