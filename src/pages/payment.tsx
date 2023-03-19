import { FC, useState, useRef } from 'react'
import { APP_NAME } from '@/lib/consts'
import ConnectWallet from '@/components/ConnectWallet'
import { Header } from '@/components/Header'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { BackButton } from '@/components/BackButton'

const Payment: FC = () => {
	const [tabValue, setTabValue] = useState<number>(0)
	const amountRef = useRef()
	const oneRef = useRef()
	const multiRef = useRef()
	const handleCreate = () => {
		const amount = (amountRef.current as HTMLInputElement).value
		if (tabValue) {
			const multi = (multiRef.current as HTMLTextAreaElement).value
			let tempArray = multi.valueOf().split(/[\s,;:\t\r\n]+/)
			console.log(tempArray)
		} else {
			const one = (oneRef.current as HTMLInputElement).value
		}
	}
	return (
		<div className="flex flex-col w-full h-full items-start justify-start max-w-6xl sm:pt-0">
			<div className="flex">
				<BackButton />
			</div>
		</div>
	)
}
export default Payment
