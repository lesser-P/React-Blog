import { useEffect, useState } from 'react'
import { useDebounce } from 'ahooks'
import { parseEther } from 'viem'
import {
  useContractEvent,
  usePrepareSendTransaction,
  useSendTransaction,
  useWaitForTransaction,
  useContractWrite,
  useFeeData,
  useNetwork,
  useContractRead,
} from 'wagmi'
import WagimDemo from './WagimDemo'

async function SendTransaction() {
  //   const { data } = useContractRead({
  //     address: '0x08fDe05088a6f760376af8E0Af363c0ce43e8129',
  //     abi: [
  //       {
  //         inputs: [],
  //         stateMutability: 'nonpayable',
  //         type: 'constructor',
  //       },
  //       {
  //         anonymous: false,
  //         inputs: [
  //           {
  //             indexed: true,
  //             internalType: 'address',
  //             name: 'owner',
  //             type: 'address',
  //           },
  //           {
  //             indexed: true,
  //             internalType: 'address',
  //             name: 'spender',
  //             type: 'address',
  //           },
  //           {
  //             indexed: false,
  //             internalType: 'uint256',
  //             name: 'value',
  //             type: 'uint256',
  //           },
  //         ],
  //         name: 'Approval',
  //         type: 'event',
  //       },
  //       {
  //         anonymous: false,
  //         inputs: [
  //           {
  //             indexed: true,
  //             internalType: 'address',
  //             name: 'from',
  //             type: 'address',
  //           },
  //           {
  //             indexed: true,
  //             internalType: 'address',
  //             name: 'to',
  //             type: 'address',
  //           },
  //           {
  //             indexed: false,
  //             internalType: 'uint256',
  //             name: 'value',
  //             type: 'uint256',
  //           },
  //         ],
  //         name: 'Transfer',
  //         type: 'event',
  //       },
  //       {
  //         anonymous: false,
  //         inputs: [
  //           {
  //             indexed: true,
  //             internalType: 'address',
  //             name: 'from',
  //             type: 'address',
  //           },
  //           {
  //             indexed: true,
  //             internalType: 'address',
  //             name: 'to',
  //             type: 'address',
  //           },
  //           {
  //             indexed: false,
  //             internalType: 'uint256',
  //             name: 'amount',
  //             type: 'uint256',
  //           },
  //         ],
  //         name: 'transferTo',
  //         type: 'event',
  //       },
  //       {
  //         inputs: [
  //           {
  //             internalType: 'address',
  //             name: 'owner',
  //             type: 'address',
  //           },
  //           {
  //             internalType: 'address',
  //             name: 'spender',
  //             type: 'address',
  //           },
  //         ],
  //         name: 'allowance',
  //         outputs: [
  //           {
  //             internalType: 'uint256',
  //             name: '',
  //             type: 'uint256',
  //           },
  //         ],
  //         stateMutability: 'view',
  //         type: 'function',
  //       },
  //       {
  //         inputs: [
  //           {
  //             internalType: 'address',
  //             name: 'spender',
  //             type: 'address',
  //           },
  //           {
  //             internalType: 'uint256',
  //             name: 'amount',
  //             type: 'uint256',
  //           },
  //         ],
  //         name: 'approve',
  //         outputs: [
  //           {
  //             internalType: 'bool',
  //             name: '',
  //             type: 'bool',
  //           },
  //         ],
  //         stateMutability: 'nonpayable',
  //         type: 'function',
  //       },
  //       {
  //         inputs: [
  //           {
  //             internalType: 'address',
  //             name: 'account',
  //             type: 'address',
  //           },
  //         ],
  //         name: 'balanceOf',
  //         outputs: [
  //           {
  //             internalType: 'uint256',
  //             name: '',
  //             type: 'uint256',
  //           },
  //         ],
  //         stateMutability: 'view',
  //         type: 'function',
  //       },
  //       {
  //         inputs: [],
  //         name: 'decimals',
  //         outputs: [
  //           {
  //             internalType: 'uint8',
  //             name: '',
  //             type: 'uint8',
  //           },
  //         ],
  //         stateMutability: 'view',
  //         type: 'function',
  //       },
  //       {
  //         inputs: [
  //           {
  //             internalType: 'address',
  //             name: 'spender',
  //             type: 'address',
  //           },
  //           {
  //             internalType: 'uint256',
  //             name: 'subtractedValue',
  //             type: 'uint256',
  //           },
  //         ],
  //         name: 'decreaseAllowance',
  //         outputs: [
  //           {
  //             internalType: 'bool',
  //             name: '',
  //             type: 'bool',
  //           },
  //         ],
  //         stateMutability: 'nonpayable',
  //         type: 'function',
  //       },
  //       {
  //         inputs: [
  //           {
  //             internalType: 'address',
  //             name: 'to',
  //             type: 'address',
  //           },
  //           {
  //             internalType: 'uint256',
  //             name: '_maxScore',
  //             type: 'uint256',
  //           },
  //         ],
  //         name: 'getTokens',
  //         outputs: [],
  //         stateMutability: 'nonpayable',
  //         type: 'function',
  //       },
  //       {
  //         inputs: [
  //           {
  //             internalType: 'address',
  //             name: 'from',
  //             type: 'address',
  //           },
  //         ],
  //         name: 'getmaxScore',
  //         outputs: [
  //           {
  //             internalType: 'uint256',
  //             name: '',
  //             type: 'uint256',
  //           },
  //         ],
  //         stateMutability: 'nonpayable',
  //         type: 'function',
  //       },
  //       {
  //         inputs: [
  //           {
  //             internalType: 'address',
  //             name: 'spender',
  //             type: 'address',
  //           },
  //           {
  //             internalType: 'uint256',
  //             name: 'addedValue',
  //             type: 'uint256',
  //           },
  //         ],
  //         name: 'increaseAllowance',
  //         outputs: [
  //           {
  //             internalType: 'bool',
  //             name: '',
  //             type: 'bool',
  //           },
  //         ],
  //         stateMutability: 'nonpayable',
  //         type: 'function',
  //       },
  //       {
  //         inputs: [
  //           {
  //             internalType: 'address',
  //             name: 'to',
  //             type: 'address',
  //           },
  //         ],
  //         name: 'mint',
  //         outputs: [],
  //         stateMutability: 'nonpayable',
  //         type: 'function',
  //       },
  //       {
  //         inputs: [],
  //         name: 'name',
  //         outputs: [
  //           {
  //             internalType: 'string',
  //             name: '',
  //             type: 'string',
  //           },
  //         ],
  //         stateMutability: 'view',
  //         type: 'function',
  //       },
  //       {
  //         inputs: [],
  //         name: 'symbol',
  //         outputs: [
  //           {
  //             internalType: 'string',
  //             name: '',
  //             type: 'string',
  //           },
  //         ],
  //         stateMutability: 'view',
  //         type: 'function',
  //       },
  //       {
  //         inputs: [],
  //         name: 'totalSupply',
  //         outputs: [
  //           {
  //             internalType: 'uint256',
  //             name: '',
  //             type: 'uint256',
  //           },
  //         ],
  //         stateMutability: 'view',
  //         type: 'function',
  //       },
  //       {
  //         inputs: [
  //           {
  //             internalType: 'address',
  //             name: 'to',
  //             type: 'address',
  //           },
  //           {
  //             internalType: 'uint256',
  //             name: 'amount',
  //             type: 'uint256',
  //           },
  //         ],
  //         name: 'transfer',
  //         outputs: [
  //           {
  //             internalType: 'bool',
  //             name: '',
  //             type: 'bool',
  //           },
  //         ],
  //         stateMutability: 'nonpayable',
  //         type: 'function',
  //       },
  //       {
  //         inputs: [
  //           {
  //             internalType: 'address',
  //             name: 'from',
  //             type: 'address',
  //           },
  //           {
  //             internalType: 'address',
  //             name: 'to',
  //             type: 'address',
  //           },
  //           {
  //             internalType: 'uint256',
  //             name: 'amount',
  //             type: 'uint256',
  //           },
  //         ],
  //         name: 'transferFrom',
  //         outputs: [
  //           {
  //             internalType: 'bool',
  //             name: '',
  //             type: 'bool',
  //           },
  //         ],
  //         stateMutability: 'nonpayable',
  //         type: 'function',
  //       },
  //     ],
  //     functionName: 'getmaxScore',
  //     args: ['0xF5AcD7df01A57360E8E53AC2d28B8452EC0eFcc6'],
  //   })
  return (
    <>
      <WagimDemo></WagimDemo>
      {/* {data} */}
    </>
  )
}
export default SendTransaction
