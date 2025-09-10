import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { useState, useEffect } from 'react';

// Contract ABI - This would be generated from the compiled contract
const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_verifier",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "sessionId",
        "type": "uint256"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "title",
        "type": "string"
      }
    ],
    "name": "VoteSessionCreated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_description",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_duration",
        "type": "uint256"
      }
    ],
    "name": "createVoteSession",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "sessionId",
        "type": "uint256"
      }
    ],
    "name": "getVoteSessionInfo",
    "outputs": [
      {
        "internalType": "string",
        "name": "title",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "description",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "totalVotes",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "optionCount",
        "type": "uint8"
      },
      {
        "internalType": "bool",
        "name": "isActive",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "isEnded",
        "type": "bool"
      },
      {
        "internalType": "address",
        "name": "creator",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "startTime",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "endTime",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

const CONTRACT_ADDRESS = import.meta.env.VITE_CONTRACT_ADDRESS || '0x0000000000000000000000000000000000000000';

export const useVoteContract = () => {
  const { address } = useAccount();
  const [contractAddress, setContractAddress] = useState(CONTRACT_ADDRESS);

  return {
    contractAddress,
    setContractAddress,
    isConnected: !!address,
    abi: CONTRACT_ABI,
  };
};

export const useVoteSession = (sessionId: number) => {
  const { contractAddress, abi } = useVoteContract();

  const { data: sessionInfo, isLoading, error } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: abi,
    functionName: 'getVoteSessionInfo',
    args: [BigInt(sessionId)],
    query: {
      enabled: !!contractAddress && sessionId >= 0,
    },
  });

  return {
    sessionInfo,
    isLoading,
    error,
  };
};

export const useCreateVoteSession = () => {
  const { contractAddress, abi } = useVoteContract();

  const { writeContract: createSession, isPending: isLoading, error } = useWriteContract();

  const createVoteSession = (title: string, description: string, duration: number) => {
    createSession({
      address: contractAddress as `0x${string}`,
      abi: abi,
      functionName: 'createVoteSession',
      args: [title, description, BigInt(duration)],
    });
  };

  return {
    createSession: createVoteSession,
    isLoading,
    error,
  };
};
