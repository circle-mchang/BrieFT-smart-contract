// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;
// ERC721 standard 
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
// Counter for how many NFTs are minted
import "@openzeppelin/contracts/utils/Counters.sol";
// Access control (who is allowed to do what with the smart contract)
import "@openzeppelin/contracts/access/Ownable.sol";

contract MyNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    constructor() ERC721("MinNFT", "Min-NFT") {}

    function mintNFT(address recipient, string memory tokenURI)
        public
        onlyOwner
        returns (uint256)
    {
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }
}