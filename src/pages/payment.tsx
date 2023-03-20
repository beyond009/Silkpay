import { FC, useState, useRef } from 'react'
import { APP_NAME } from '@/lib/consts'
import ConnectWallet from '@/components/ConnectWallet'
import { Header } from '@/components/Header'
import { CurrencyDollarIcon, ClockIcon } from '@heroicons/react/outline'
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
			<div className="stats shadow mt-12 bg-gray-50 dark:bg-slate-500">
				<div className="stat">
					<div className="stat-figure text-primary">
						<CurrencyDollarIcon width={36} height={36} />
					</div>
					<div className="stat-title">Total amount</div>
					<div className="stat-value text-primary">20 ETH</div>
					<div className="stat-desc">desc</div>
				</div>

				<div className="stat">
					<div className="stat-figure text-secondary">
						<ClockIcon width={36} height={36} />
					</div>
					<div className="stat-title">Locking Time</div>
					<div className="stat-value text-secondary">30 days</div>
					<div className="stat-desc">21% more than last month</div>
				</div>

				<div className="stat">
					<div className="stat-figure text-secondary"></div>
					<div className="stat-value">Locked</div>
					<div className="stat-title">Current status</div>
					<div className="stat-desc text-secondary">29 days remaining</div>
				</div>
			</div>
			<div className="mt-12 rounded-lg bg-gray-50 flex flex-col p-6">
				<div className="text-xl">Payer</div>
				<div className="">0xAa8b29773D87b22987B4D0BC4a72D5e9452Dd93D</div>
			</div>
			<div className="mt-12 rounded-lg bg-gray-50 flex flex-col p-6">
				<div className="text-xl">Recipients whitelist</div>
				<div className="">0xAa8b29773D87b22987B4D0BC4a72D5e9452Dd93D</div>
				<div className="">0xAa8b29773D87b22987B4D0BC4a72D5e9452Dd93D</div>
				<div className="">0xAa8b29773D87b22987B4D0BC4a72D5e9452Dd93D</div>
				<div className="">0xAa8b29773D87b22987B4D0BC4a72D5e9452Dd93D</div>
				<div className="">0xAa8b29773D87b22987B4D0BC4a72D5e9452Dd93D</div>
				<div className="">0xAa8b29773D87b22987B4D0BC4a72D5e9452Dd93D</div>
				<div className="">0xAa8b29773D87b22987B4D0BC4a72D5e9452Dd93D</div>
			</div>
			<button className="btn btn-info gap-2 mt-12 mb-36" onClick={() => {}}>
				Claim
			</button>
		</div>
	)
}
export default Payment
