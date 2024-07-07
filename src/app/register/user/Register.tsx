'use client'
import {
  useAccount,
  useWriteContract,
  useWaitForTransactionReceipt,
} from 'wagmi'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { abi } from '../../components/abi'

const Register = () => {
  const [name, setName] = useState('')
  const [aadhaarNo, setAadhaarNo] = useState('')
  const [panNo, setPanNo] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [email, setEmail] = useState('')
  const { address, isConnecting, isDisconnected } = useAccount()
  const [isHashReady, setIsHashReady] = useState(false)
  const [isLoads, setIsLoads] = useState(false)
  const { data: hashd, writeContract } = useWriteContract()

  const handleSubmit = async () => {
    setIsLoads(true)
    console.log(name, aadhaarNo, panNo, phoneNumber, email)
    writeContract({
      address: '0x7d5c1bfe80dc5bcfd5157a7a14868c87fcff134b',
      abi,
      functionName: 'registerUser',
      args: [name, aadhaarNo, panNo, phoneNumber, email],
    })
  }

  const {
    data: receipt,
    isLoading,
    isError,
  } = useWaitForTransactionReceipt({
    hash: hashd,
  })

  useEffect(() => {
    if (receipt?.logs) {
      setIsLoads(false)
      setIsHashReady(true)
      console.log(receipt.logs)
    }
  }, [receipt])

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-4">User Registration</h1>
      <form className="max-w-md mx-auto">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Aadhaar Number</label>
          <input
            type="text"
            value={aadhaarNo}
            onChange={(e) => setAadhaarNo(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">PAN Number</label>
          <input
            type="text"
            value={panNo}
            onChange={(e) => setPanNo(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Phone Number</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="block w-full px-3 py-2 border border-gray-300 rounded-md text-black focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Register
        </button>
        {hashd && <div className="text-sm pt-2">Transaction Hash: {hashd}</div>}
      </form>
    </div>
  )
}

export default Register
