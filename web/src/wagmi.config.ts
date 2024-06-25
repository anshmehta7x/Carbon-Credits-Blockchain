import { createConfig, http } from 'wagmi'
import { bsc, bscTestnet, goerli, mainnet, sepolia, xdcTestnet } from 'wagmi/chains'
import { walletConnect } from 'wagmi/connectors'

export const wagmiConfig = createConfig({
  chains: [bsc, bscTestnet, goerli, mainnet, sepolia, xdcTestnet],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
    [bsc.id]: http(),
    [bscTestnet.id]: http(),
    [goerli.id]: http(),
    [xdcTestnet.id]: http(),
  },
  connectors: [
    walletConnect({
      projectId: 'f18c88f1b8f4a066d3b705c6b13b71a8',
    }),
  ],
})
