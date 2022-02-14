pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract PokemonToken is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping(address => string) tokenURIs;

    constructor() ERC721("PokemonToken", "PKT") {}

    struct UserToken {
        address userAddress;
        string tokenURI;
    }

    mapping(uint256 => UserToken) private userTokens;

    event TokenCreated(address indexed from, uint256 indexed itemId);

    function mint(string memory jsonMetaData) public {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, jsonMetaData);
        userTokens[newItemId] = UserToken(msg.sender, jsonMetaData);
        emit TokenCreated(msg.sender, newItemId);
    }

    function getUserTokens() public view returns (UserToken[] memory) {
        uint256 currentCount = _tokenIds.current();
        uint256 count = 0;
        uint256 latestCount = 0;
        for (uint256 i = 0; i < currentCount; i++) {
            if (userTokens[i + 1].userAddress == msg.sender) {
                count = count + 1;
            }
        }

        UserToken[] memory tokens = new UserToken[](count);
        for (uint256 i = 0; i < currentCount; i++) {
            if (userTokens[i + 1].userAddress == msg.sender) {
                UserToken memory item = userTokens[i + 1];
                tokens[latestCount] = item;
                latestCount = latestCount + 1;
            }
        }
        return tokens;
    }
}
