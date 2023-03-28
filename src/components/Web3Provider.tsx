import { useTheme } from 'next-themes'
import { createClient, WagmiConfig, Chain, configureChains } from 'wagmi'
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'

export const contractAddress = {
	scrollTestNetwork: {
		paymentContract: '',
		arbitrationContract: '',
	},
}

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
const gnosisNetwork: Chain = {
	id: 100,
	name: 'Gnosis',
	network: 'Gnosis',
	nativeCurrency: { name: 'xDAI', symbol: 'xDAI', decimals: 18 },
	rpcUrls: {
		default: { http: ['https://gnosis.blockpi.network/v1/rpc/public	'] },
		public: { http: ['https://gnosis.blockpi.network/v1/rpc/public	'] },
	},
	testnet: true,
}
const gnosisTestNetwork: Chain = {
	name: 'Gnosis Testnet',
	network: 'chiado',
	nativeCurrency: { name: 'xDAI', symbol: 'xDAI', decimals: 18 },
	id: 10200,
	rpcUrls: {
		default: { http: ['https://chiado-rpc.gnosis.io/'] },
		public: { http: ['https://chiado-rpc.gnosis.io/'] },
	},
	blockExplorers: {
		default: { name: 'Gnosis explorer', url: 'https://blockscout.com/gnosis/chiado/' },
	},
	testnet: true,
}
const zkEVMNetwork: Chain = {
	name: 'zkEVM',
	network: 'zkEVM',
	id: 1442,
	nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
	rpcUrls: {
		default: { http: ['https://rpc.public.zkevm-test.net'] },
		public: { http: ['https://rpc.public.zkevm-test.net'] },
	},
	testnet: true,
}
const { chains, provider } = configureChains(
	[scrollTestNetwork, gnosisNetwork, gnosisTestNetwork, zkEVMNetwork],
	[
		jsonRpcProvider({
			rpc: chain => ({
				http: chain.rpcUrls.default.http[0],
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
