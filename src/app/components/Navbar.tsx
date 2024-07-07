import React from 'react'
import { ConnectKitButton } from 'connectkit'

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-20 py-4 bg-amber-300 border-b-2 border-amber-800">
      <div className="flex items-center">
        <h1 className="text-xl font-bold">LandChain</h1>
      </div>
      <div className="flex items-center space-x-4">
        <button className="px-4 py-2 text-blue-600 rounded-md bg-blue-200 hover:bg-blue-300">
          User
        </button>
        <button className="px-4 py-2 text-blue-600 rounded-md bg-blue-200 hover:bg-blue-300">
          Govt Authority
        </button>
        <ConnectKitButton />
      </div>
    </nav>
  )
}

export default Navbar
