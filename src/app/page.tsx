'use client'
import Navbar from './components/Navbar'
import { WagmiProvider, createConfig } from 'wagmi'
import { mainnet, polygon, sepolia } from 'wagmi/chains'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ConnectKitProvider, getDefaultConfig } from 'connectkit'
const config = createConfig(
  getDefaultConfig({
    // Your dApps chains
    appName: 'MetaCert',
    walletConnectProjectId: 'process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID',
    chains: [mainnet, polygon, sepolia],
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
            <Navbar />
          </ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  )
}
