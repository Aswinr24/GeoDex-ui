'use client'
import Register from './Register'
import { WagmiProvider, createConfig, http } from 'wagmi'
import { mainnet, polygon, sepolia } from 'wagmi/chains'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    appName: 'MetaCert',
    walletConnectProjectId: '',
    chains: [mainnet, polygon, sepolia],
    transports: {
      // RPC URL for each chain
      [sepolia.id]: http(
        `https://eth-sepolia.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_ID}`
      ),
    },
    ssr: true,
  })
)
const queryClient = new QueryClient()

export default function Home() {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider theme="auto">
            <Register />
          </ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  )
}
