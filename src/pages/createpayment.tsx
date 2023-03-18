import { FC } from 'react'
import { APP_NAME } from '@/lib/consts'
import ConnectWallet from '@/components/ConnectWallet'
import { Header } from '@/components/Header'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { BackButton } from '@/components/BackButton'

const CreatePayment: FC = () => {
	return (
		<div className="flex flex-col h-full w-full items-start sm:items-center sm:pt-0">
			<BackButton />
		</div>
	)
}

export default CreatePayment
