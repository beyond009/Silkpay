import { FC, useState, useRef, useEffect } from 'react'
import { APP_NAME } from '@/lib/consts'
import ConnectWallet from '@/components/ConnectWallet'
import { Header } from '@/components/Header'
import { CurrencyDollarIcon, ClockIcon, IdentificationIcon } from '@heroicons/react/outline'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { abi as paymentABI } from '@/abi/SilkPayV1.json'
import { BackButton } from '@/components/BackButton'
import { PaymnetStatus } from '..'

const Payment: FC = () => {
	const router = useRouter()
	const [payment, setPayment] = useState<any>(null)
	const { id } = router.query
	const fetch = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const paymentContract = new ethers.Contract('0x0dc627cB3bB1319007A5500259e8A16e672d8328', paymentABI, provider)
		const res = await paymentContract.payments(Number(id))
		console.log(res)
		setPayment(res)
	}
	const formatDate = (start: number, lock: number) => {
		console.log(start, lock, start + lock)
		return new Date((start + lock / 1000) * 1000)
	}

	const formateTime = (unix: number) => {
		const days = unix / 1000 / 60 / 60 / 24
		const hours = unix / 1000 / 60 / 60
		if (days >= 1) return `${Math.floor(days)} ${days > 1 ? 'days' : 'day'}`
		return `${Math.floor(hours)} ${hours > 1 ? 'hours' : 'hour'}`
	}
	useEffect(() => {
		fetch()
	}, [])
	return (
		<div className="flex flex-col w-full h-full items-start justify-start max-w-6xl sm:pt-0">
			<div className="flex">
				<BackButton />
			</div>
			<div className="stats shadow mt-12 bg-gray-50 dark:bg-slate-500">
				<div className="stat">
					<div className="stat-figure mt-3">
						<IdentificationIcon width={36} height={36} />
					</div>
					<div className="stat-title">Payment ID</div>
					<div className="stat-value">{id}</div>
					{/* <div className="stat-desc">desc</div> */}
				</div>
				<div className="stat">
					<div className="stat-figure text-primary mt-3">
						<CurrencyDollarIcon width={36} height={36} />
					</div>
					<div className="stat-title">Total amount</div>
					<div className="stat-value text-primary">
						{payment ? ethers.utils.formatEther(payment.amount) : '0'}ETH
					</div>
					{/* <div className="stat-desc">desc</div> */}
				</div>

				<div className="stat">
					<div className="stat-figure text-secondary mt-3">
						<ClockIcon width={36} height={36} />
					</div>
					<div className="stat-title">Locking Time</div>
					<div className="stat-value text-secondary">
						{payment ? formateTime(payment.lockTime.toNumber()) : ''}
					</div>
					{/* <div className="stat-desc">21% more than last month</div> */}
				</div>

				<div className="stat">
					<div className="stat-figure text-secondary"></div>
					<div className="stat-value">{payment ? PaymnetStatus[payment.status] : 'Locking'}</div>
					<div className="stat-title">Current status</div>
					<div className="stat-desc text-secondary">
						Locked until{' '}
						{payment
							? formatDate(payment.startTime.toNumber(), payment.lockTime.toNumber()).toLocaleDateString()
							: ''}
					</div>
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
