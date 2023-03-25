import { FC, useState, useRef, useEffect, useCallback, useMemo } from 'react'
import { APP_NAME } from '@/lib/consts'
import ConnectWallet from '@/components/ConnectWallet'
import { Header } from '@/components/Header'
import { CurrencyDollarIcon, ClockIcon, IdentificationIcon } from '@heroicons/react/outline'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { ethers } from 'ethers'
import { useRouter } from 'next/router'
import { abi as paymentABI } from '@/abi/SilkPayV1.json'
import { abi as arbitratorABI } from '@/abi/SilkArbitrator.json'
import { BackButton } from '@/components/BackButton'
import { PaymnetStatus } from '..'
import { useAccount } from 'wagmi'
import handler from '../api/hello'

const Payment: FC = () => {
	const router = useRouter()
	const { address } = useAccount()
	const [payment, setPayment] = useState<any>(undefined)
	const [disputeId, setDisputeId] = useState<number | undefined>()
	const { id } = router.query
	const fetch = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const paymentContract = new ethers.Contract('0xdcb76B4C1C03c26A9f25409e73aA1969eE1800A4', paymentABI, provider)
		const res = await paymentContract.payments(Number(id))
		setPayment(res)
		if (res.status === PaymnetStatus.Appealing) {
			const disputeId = await paymentContract.PaymentIdtoDisputeId(Number(id))
			setDisputeId(disputeId.toNumber())
			const arbitratorContract = new ethers.Contract(
				'0x5E62274484F958D0205E214dF5CBDb19964Ed5B3',
				arbitratorABI,
				provider
			)
			const dispute = await arbitratorContract.disputes(disputeId)
			console.log(dispute)
		}
	}
	const handlePay = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const signer = provider.getSigner()
		const paymentContract = new ethers.Contract('0xdcb76B4C1C03c26A9f25409e73aA1969eE1800A4', paymentABI, signer)
		await paymentContract.pay(Number(id))
	}
	const hanldeCreateDispute = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const signer = provider.getSigner()
		const paymentContract = new ethers.Contract('0xdcb76B4C1C03c26A9f25409e73aA1969eE1800A4', paymentABI, signer)
		await paymentContract.raiseDisputeByRecipient(Number(id), { value: payment?.amount.div(10) })
	}
	const formatDate = (start: number, lock: number) => {
		console.log(start, lock, start + lock)
		return new Date((start + lock) * 1000)
	}
	const formateTime = (unix: number) => {
		const days = unix / 60 / 60 / 24
		const hours = unix / 60 / 60
		if (days >= 1) return `${Math.floor(days)} ${days > 1 ? 'days' : 'day'}`
		return `${Math.floor(hours)} ${hours > 1 ? 'hours' : 'hour'}`
	}
	const isGracePeriod: Boolean = useMemo(() => {
		if (payment) {
			if (
				Date.now() / 1000 > payment?.startTime.toNumber() + payment?.lockTime.toNumber() &&
				Date.now() / 1000 < payment?.startTime.toNumber() + payment?.lockTime.toNumber() + 600
			)
				return true
		}
		return false
	}, [payment])

	useEffect(() => {
		fetch()
	}, [id])
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
						{payment && ethers.utils.formatEther(payment['amount'])}ETH
					</div>
					{/* <div className="stat-desc">desc</div> */}
				</div>

				<div className="stat">
					<div className="stat-figure text-secondary mt-3">
						<ClockIcon width={36} height={36} />
					</div>
					<div className="stat-title">Locking Time</div>
					<div className="stat-value text-secondary">
						{/* {console.log(payment)} */}
						{payment ? formateTime(payment.lockTime.toNumber()) : ''}
					</div>
					{/* <div className="stat-desc">21% more than last month</div> */}
				</div>
				<div className="stat">
					<div className="stat-figure text-secondary"></div>
					<div className="stat-value">
						{isGracePeriod ? 'Grace period' : payment ? PaymnetStatus[payment.status] : 'Locking'}
					</div>
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
				<div className="">{payment?.sender}</div>
			</div>
			<div className="mt-12 rounded-lg bg-gray-50 flex flex-col p-6">
				<div className="text-xl">{payment?.targeted ? 'Recipient' : 'Recipients whitelist'}</div>
				{payment?.targeted ? <div className="">{payment?.recipient}</div> : 'whitelist addresses'}
			</div>
			<div className="flex gap-6 mt-12 mb-36">
				{address === payment?.sender && PaymnetStatus[payment.status] === 'Locking' ? (
					<button
						className="btn btn-info gap-2  w-40"
						onClick={() => {
							handlePay()
						}}
					>
						Pay
					</button>
				) : (
					''
				)}
				{isGracePeriod && address === payment?.recipient ? (
					<button
						className="btn btn-info gap-2  w-40"
						onClick={() => {
							hanldeCreateDispute()
						}}
					>
						Start Dispute
					</button>
				) : (
					''
				)}
			</div>
		</div>
	)
}
export default Payment
