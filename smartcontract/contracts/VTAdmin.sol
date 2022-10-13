//SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract VTAdmin is ReentrancyGuard, Ownable, ERC721URIStorage{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _userNums;
    uint256 private secretNum;
    mapping(uint256 => User) private users;
    mapping(uint256 => Item) private items;

    struct User{
        uint256 userNum;
        bytes32 userId;
        string name;
    }

    struct Item{
        uint256 tokenId;
        bytes32 ic;
        bytes32 ownerId;
        uint256 txTime;
    }

    event AddedUser(
        uint256 userNum,
        bytes32 indexed userId,
        string name,
        uint256 addedTime
    );

    event CreateToken(
        uint256 tokenId,
        bytes32 ic,
        uint256 createdTime
    );

    event Transaction (
        uint256 tokenId,
        bytes32 indexed ic,
        bytes32 currentOwnerId,
        uint256 txTime
    );

    constructor(uint256 _secretNum)
    ERC721("Valleyin Tokens", "VT"){
        secretNum = _secretNum;
    }

    function confirmId(bytes32 _id) private view returns(bool){
        uint256 userNums = _userNums.current();
        for(uint256 i=0; i<userNums; i++){
            User storage user = users[i+1];
            if(user.userId == _id){
                return true;
            }
        }
        return false;
    }

    function confirmIc(bytes32 _ic) private view returns(bool){
        uint256 itemsNum = _tokenIds.current();
        for(uint256 i=0; i< itemsNum; i++){
            if(items[i+1].ic == _ic){
                return true;
            }
        }
        return false;
    }

    function addUser(string memory _name) public onlyOwner nonReentrant returns(bytes32){
        _userNums.increment();
        uint256 userNum = _userNums.current();
        bytes32 id = keccak256(abi.encodePacked(_name, block.timestamp, secretNum, userNum));
        User memory user = User(userNum ,id, _name);
        users[userNum] = user;
        emit AddedUser(userNum, id, _name, block.timestamp);
        return id;
    }

    function createToken(string memory _tokenURI, bytes32 _id) public onlyOwner nonReentrant returns(bytes32){
        require(confirmId(_id), "This userID is invalid");
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _mint(address(this), newItemId);
        _setTokenURI(newItemId, _tokenURI);
        bytes32 ic = keccak256(abi.encodePacked(block.timestamp, _tokenURI, secretNum, _id));
        items[newItemId] = Item(newItemId, ic, _id, block.timestamp);
        emit CreateToken(newItemId, ic, block.timestamp);
        emit Transaction(newItemId, ic, _id, block.timestamp);
        return ic;
    }

    function changeOwner(bytes32 _ic, bytes32 _id) public onlyOwner{
        require(confirmId(_id), "This userID is invalid");
        require(confirmIc(_ic), "This IC is invalid");
        Item memory itemByIc = fetchItemByIC(_ic);
        //require(_tokenId <= _tokenIds.current(), "Invalid tokenId");
        items[itemByIc.tokenId].ownerId = _id;
        Item storage item = items[itemByIc.tokenId];
        emit Transaction(item.tokenId, item.ic, _id, block.timestamp);
    }

    function fetchItemsById(bytes32 _id)public view returns(Item[] memory){
        require(confirmId(_id), "This userID is invalid");
        uint256 itemsNum = _tokenIds.current();
        uint256 currentNum = 0;
        for (uint256 i=0; i<itemsNum; i++){
            if(items[i+1].ownerId == _id){
                currentNum++;
            }
        }

        Item[] memory itemsById = new Item[](currentNum);
        uint256 index = 0;
        for (uint256 i=0; i<itemsNum; i++){
            if(items[i+1].ownerId == _id){
                itemsById[index] = items[i+1];
                index++;
            }
        }
        return itemsById;
    }

    function fetchItemByIC(bytes32 _ic)public view returns(Item memory){
        uint256 itemsNum = _tokenIds.current();
        for(uint256 i=0; i< itemsNum; i++){
            if(items[i+1].ic == _ic){
                return items[i+1];
            }
        }
    }

    function fetchAllUsers()public view onlyOwner returns(User[] memory){
        uint256 currentUserNum = _userNums.current();
        User[] memory allUsers = new User[](currentUserNum);
        for(uint256 i=0; i<currentUserNum; i++){
            allUsers[i] = users[i+1];
        }
        return allUsers;
    }

    function fetchAllItems() public view onlyOwner returns(Item[] memory){
        uint256 currentItemNum = _tokenIds.current();
        Item[] memory allItems = new Item[](currentItemNum);
        for(uint256 i=0; i<currentItemNum; i++){
            allItems[i] = items[i+1];
        }
        return allItems;
    }
}