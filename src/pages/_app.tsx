import 'tailwindcss/tailwind.css'
import { ThemeProvider } from 'next-themes'
import { Header } from '@/components/Header'
import Web3Provider from '@/components/Web3Provider'
import ThemeSwitcher from '@/components/ThemeSwitcher'

const App = ({ Component, pageProps }) => {
	return (
		<ThemeProvider attribute="class">
			<Web3Provider>
				<div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
					<Header />
					<ThemeSwitcher className="absolute bottom-6 right-6" />
					<Component {...pageProps} />
				</div>
			</Web3Provider>
		</ThemeProvider>
	)
}

export default App
