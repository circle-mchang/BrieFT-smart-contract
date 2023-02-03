require('dotenv').config();
const ethers = require('ethers');

// Get Alchemy API Key
const API_KEY = process.env.API_KEY;

// Define an Alchemy Provider
const provider = new ethers.providers.AlchemyProvider('goerli', API_KEY)

const contract = require("../artifacts/contracts/MinNFT.sol/MyNFT.json");




// Create a signer
const privateKey = process.env.PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider)

// Get contract ABI and address
const abi = contract.abi
const contractAddress = '0xDb6207A2c37f47A49e8aC907E5D3f832207210ea'

// Create a contract instance
const myNftContract = new ethers.Contract(contractAddress, abi, signer)




// Get the NFT Metadata IPFS URL
const tokenUri = "https://gateway.pinata.cloud/ipfs/QmWbzRKxWAc4n99LLrEs189wx5QssVZNd56hn4PPGQyt68"

// Call mintNFT function
const mintNFT = async () => {
    let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri)
    await nftTxn.wait()
    console.log(`NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`)
}

mintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });