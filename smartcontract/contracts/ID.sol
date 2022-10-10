// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ID is Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _userNumbers;

    uint256 private secretNum;
    mapping(uint256 => UserInfo) private idToUserInfo;

    struct UserInfo{
        uint256 userNumber;
        bytes32 userId;
        bytes32 userIc;
        string name;
        uint256 createdTime;
    }

    event CreateUserInfo(
        uint256 userNumber,
        bytes32 userId,
        bytes32 userIc,
        string name,
        uint256 createdTime
    );

    constructor(uint256 _secretNum){
      secretNum = _secretNum;
    }

    function createUserInfo(string memory name) public onlyOwner{
        _userNumbers.increment();
        uint256 userNumber = _userNumbers.current();
        uint256 createdTime = block.timestamp;
        bytes32 userId = keccak256(abi.encodePacked(secretNum, userNumber, createdTime, name));
        bytes32 userIc = keccak256(abi.encodePacked(userId, name, secretNum));
        idToUserInfo[userNumber] = 
        UserInfo(
            userNumber,
            userId,
            userIc,
            name,
            createdTime
        );
        emit CreateUserInfo(
            userNumber,
            userId,
            userIc,
            name,
            createdTime
        );
    }

    function fetchAllUserInfo() public view onlyOwner returns(UserInfo[] memory){
        uint256 currenNum = _userNumbers.current();
        UserInfo[] memory userInfos = new UserInfo[](currenNum);
        for (uint256 i=0; i< currenNum; i++){
            UserInfo storage userInfo = idToUserInfo[i+1];
            userInfos[i] = userInfo;
        }
        return userInfos;
    }

    function fetchUserInfoByIc(bytes32 _userIc) public view returns(UserInfo memory){
        uint256 currentNum = _userNumbers.current();
        for (uint256 i=0; i< currentNum; i++){
            UserInfo storage userInfo = idToUserInfo[i+1];
            if(userInfo.userIc == _userIc){
                return userInfo;
            }
        }
    }

    function fetchUserInfoById(bytes32 _userId) public view returns(UserInfo memory){
        uint256 currentNum = _userNumbers.current();
        for (uint256 i=0; i< currentNum; i++){
            UserInfo storage userInfo = idToUserInfo[i+1];
            if(userInfo.userId == _userId){
                return userInfo;
            }
        }
    }
}