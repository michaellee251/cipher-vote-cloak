// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract CipherVoteCloak is SepoliaConfig {
    using FHE for *;
    
    struct VoteSession {
        euint32 sessionId;
        euint32 totalVotes;
        euint32 optionCount;
        bool isActive;
        bool isEnded;
        string title;
        string description;
        address creator;
        uint256 startTime;
        uint256 endTime;
        mapping(uint256 => euint32) encryptedVotes; // optionId => encrypted vote count
    }
    
    struct VoteOption {
        uint256 optionId;
        string name;
        string description;
        bool isValid;
    }
    
    struct Voter {
        address voterAddress;
        bool hasVoted;
        uint256 voteTime;
    }
    
    mapping(uint256 => VoteSession) public voteSessions;
    mapping(uint256 => VoteOption) public voteOptions;
    mapping(uint256 => mapping(address => Voter)) public voters; // sessionId => voterAddress => Voter
    mapping(address => euint32) public voterReputation;
    
    uint256 public sessionCounter;
    uint256 public optionCounter;
    
    address public owner;
    address public verifier;
    
    event VoteSessionCreated(uint256 indexed sessionId, address indexed creator, string title);
    event VoteOptionAdded(uint256 indexed sessionId, uint256 indexed optionId, string name);
    event VoteCast(uint256 indexed sessionId, uint256 indexed optionId, address indexed voter);
    event VoteSessionEnded(uint256 indexed sessionId);
    event VoteSessionVerified(uint256 indexed sessionId, bool isVerified);
    event ReputationUpdated(address indexed voter, uint32 reputation);
    
    constructor(address _verifier) {
        owner = msg.sender;
        verifier = _verifier;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyVerifier() {
        require(msg.sender == verifier, "Only verifier can call this function");
        _;
    }
    
    function createVoteSession(
        string memory _title,
        string memory _description,
        uint256 _duration
    ) public returns (uint256) {
        require(bytes(_title).length > 0, "Title cannot be empty");
        require(_duration > 0, "Duration must be positive");
        
        uint256 sessionId = sessionCounter++;
        
        VoteSession storage session = voteSessions[sessionId];
        session.sessionId = FHE.asEuint32(0); // Will be set properly later
        session.totalVotes = FHE.asEuint32(0);
        session.optionCount = FHE.asEuint32(0);
        session.isActive = true;
        session.isEnded = false;
        session.title = _title;
        session.description = _description;
        session.creator = msg.sender;
        session.startTime = block.timestamp;
        session.endTime = block.timestamp + _duration;
        
        emit VoteSessionCreated(sessionId, msg.sender, _title);
        return sessionId;
    }
    
    function addVoteOption(
        uint256 sessionId,
        string memory _name,
        string memory _description
    ) public returns (uint256) {
        require(voteSessions[sessionId].creator == msg.sender, "Only session creator can add options");
        require(voteSessions[sessionId].isActive, "Session must be active");
        require(!voteSessions[sessionId].isEnded, "Session has ended");
        require(bytes(_name).length > 0, "Option name cannot be empty");
        
        uint256 optionId = optionCounter++;
        
        voteOptions[optionId] = VoteOption({
            optionId: optionId,
            name: _name,
            description: _description,
            isValid: true
        });
        
        // Initialize encrypted vote count for this option
        voteSessions[sessionId].encryptedVotes[optionId] = FHE.asEuint32(0);
        
        // Increment option count
        voteSessions[sessionId].optionCount = FHE.add(voteSessions[sessionId].optionCount, FHE.asEuint32(1));
        
        emit VoteOptionAdded(sessionId, optionId, _name);
        return optionId;
    }
    
    function castVote(
        uint256 sessionId,
        uint256 optionId,
        externalEuint32 encryptedVote,
        bytes calldata inputProof
    ) public {
        require(voteSessions[sessionId].creator != address(0), "Session does not exist");
        require(voteSessions[sessionId].isActive, "Session is not active");
        require(!voteSessions[sessionId].isEnded, "Session has ended");
        require(block.timestamp <= voteSessions[sessionId].endTime, "Session has expired");
        require(voteOptions[optionId].isValid, "Invalid vote option");
        require(!voters[sessionId][msg.sender].hasVoted, "Voter has already voted");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalVote = FHE.fromExternal(encryptedVote, inputProof);
        
        // Record voter information
        voters[sessionId][msg.sender] = Voter({
            voterAddress: msg.sender,
            hasVoted: true,
            voteTime: block.timestamp
        });
        
        // Add encrypted vote to the option
        voteSessions[sessionId].encryptedVotes[optionId] = FHE.add(
            voteSessions[sessionId].encryptedVotes[optionId], 
            internalVote
        );
        
        // Increment total votes
        voteSessions[sessionId].totalVotes = FHE.add(
            voteSessions[sessionId].totalVotes, 
            FHE.asEuint32(1)
        );
        
        emit VoteCast(sessionId, optionId, msg.sender);
    }
    
    function endVoteSession(uint256 sessionId) public {
        require(voteSessions[sessionId].creator == msg.sender, "Only session creator can end session");
        require(voteSessions[sessionId].isActive, "Session is not active");
        require(block.timestamp > voteSessions[sessionId].endTime, "Session has not expired yet");
        
        voteSessions[sessionId].isActive = false;
        voteSessions[sessionId].isEnded = true;
        
        emit VoteSessionEnded(sessionId);
    }
    
    function verifyVoteSession(uint256 sessionId, bool isVerified) public onlyVerifier {
        require(voteSessions[sessionId].creator != address(0), "Session does not exist");
        
        // In a real implementation, this would verify the integrity of the voting process
        emit VoteSessionVerified(sessionId, isVerified);
    }
    
    function updateVoterReputation(address voter, euint32 reputation) public onlyVerifier {
        require(voter != address(0), "Invalid voter address");
        
        voterReputation[voter] = reputation;
        emit ReputationUpdated(voter, 0); // FHE.decrypt(reputation) - will be decrypted off-chain
    }
    
    function getVoteSessionInfo(uint256 sessionId) public view returns (
        string memory title,
        string memory description,
        uint8 totalVotes,
        uint8 optionCount,
        bool isActive,
        bool isEnded,
        address creator,
        uint256 startTime,
        uint256 endTime
    ) {
        VoteSession storage session = voteSessions[sessionId];
        return (
            session.title,
            session.description,
            0, // FHE.decrypt(session.totalVotes) - will be decrypted off-chain
            0, // FHE.decrypt(session.optionCount) - will be decrypted off-chain
            session.isActive,
            session.isEnded,
            session.creator,
            session.startTime,
            session.endTime
        );
    }
    
    function getVoteOptionInfo(uint256 optionId) public view returns (
        string memory name,
        string memory description,
        bool isValid
    ) {
        VoteOption storage option = voteOptions[optionId];
        return (
            option.name,
            option.description,
            option.isValid
        );
    }
    
    function getVoterInfo(uint256 sessionId, address voter) public view returns (
        bool hasVoted,
        uint256 voteTime
    ) {
        Voter storage voterInfo = voters[sessionId][voter];
        return (
            voterInfo.hasVoted,
            voterInfo.voteTime
        );
    }
    
    function getVoterReputation(address voter) public view returns (uint8) {
        return 0; // FHE.decrypt(voterReputation[voter]) - will be decrypted off-chain
    }
    
    function getEncryptedVoteCount(uint256 sessionId, uint256 optionId) public view returns (uint8) {
        return 0; // FHE.decrypt(voteSessions[sessionId].encryptedVotes[optionId]) - will be decrypted off-chain
    }
    
    // Function to get all vote options for a session (off-chain helper)
    function getSessionOptions(uint256 sessionId) public view returns (uint256[] memory) {
        // This would need to be implemented with additional storage to track options per session
        // For now, returning empty array
        uint256[] memory options = new uint256[](0);
        return options;
    }
}
