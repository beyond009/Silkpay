import React from 'react'
import ConnectWallet from '@/components/ConnectWallet'
import { Logo } from './Logo'
export const Header = () => {
	return (
		<div className="flex justify-between w-full max-w-6xl mx-auto py-12 bg-gray-100 dark:bg-gray-900 sm:px-6 lg:px-8">
			<div className="flex items-center text-4xl m-[-22px]">
				<Logo /> Silkpay
			</div>
			<div className="flex">
				<ConnectWallet />
			</div>
		</div>
	)
}
