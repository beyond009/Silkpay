import { FC } from 'react'
import { APP_NAME } from '@/lib/consts'
import ConnectWallet from '@/components/ConnectWallet'
import { Header } from '@/components/Header'
import { BookOpenIcon, CodeIcon, ShareIcon } from '@heroicons/react/outline'
import ThemeSwitcher from '@/components/ThemeSwitcher'

const Home: FC = () => {
	return (
		<div className="relative flex flex-col items-top min-h-screen p-60  bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
			<Header />
			<ThemeSwitcher className="absolute bottom-6 right-6" />
			<div className="max-w-6xl mx-auto sm:px-6 lg:px-8"></div>
		</div>
	)
}

export default Home
