import { useTheme } from 'next-themes'
import { APP_NAME } from '@/lib/consts'
import { createClient, WagmiConfig, Chain, configureChains } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'
const scrollTestNetwork: Chain = {
	id: 534353,
	name: 'Scroll Alpha Testnet',
	network: 'Scroll Alpha Testnet',
	nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
	rpcUrls: {
		default: { http: ['https://alpha-rpc.scroll.io/l2'] },
		public: { http: ['https://alpha-rpc.scroll.io/l2'] },
	},
	blockExplorers: {
		default: { name: 'Scroll explorer', url: 'https://blockscout.scroll.io/' },
	},
	testnet: true,
}
const { chains, provider } = configureChains(
	[scrollTestNetwork],
	[
		jsonRpcProvider({
			rpc: chain => ({
				http: `https://alpha-rpc.scroll.io/l2`,
			}),
		}),
	]
)

const client = createClient(getDefaultClient({ appName: 'SilkPay', chains }))

const Web3Provider = ({ children }) => {
	const { resolvedTheme } = useTheme()

	return (
		<WagmiConfig client={client}>
			<ConnectKitProvider mode={resolvedTheme as 'light' | 'dark'}>{children}</ConnectKitProvider>
		</WagmiConfig>
	)
}

export default Web3Provider
