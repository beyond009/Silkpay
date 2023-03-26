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
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal'

const style = {
	position: 'absolute' as 'absolute',
	top: '50%',
	left: '50%',
	transform: 'translate(-50%, -50%)',
	width: 600,
	display: 'flex',
	flexDirection: 'column',
	jusitifyContent: 'center',
	alignItems: 'center',
	bgcolor: 'background.paper',
	boxShadow: 24,
	p: 4,
}

enum Period {
	evidence, // Evidence can be submitted. This is also when drawing has to take place.
	commit, // Jurors commit a hashed vote. This is skipped for courts without hidden votes.
	vote, // Jurors reveal/cast their vote depending on whether the court has hidden votes or not.
	execution, // Tokens are redistributed and the ruling is executed.
}

const Payment: FC = () => {
	const router = useRouter()
	const { address } = useAccount()
	const [payment, setPayment] = useState<any>(undefined)
	const [disputeId, setDisputeId] = useState<number | undefined>()
	const [dispute, setDispute] = useState<any>()
	const [vote, setVote] = useState<any>()
	const [open, setOpen] = useState(false)
	const handleOpen = () => setOpen(true)
	const handleClose = () => setOpen(false)
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
			setDispute(dispute)
		}
	}
	const hanldeCastVote = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const signer = provider.getSigner()
		const arbitratorContract = new ethers.Contract(
			'0x5E62274484F958D0205E214dF5CBDb19964Ed5B3',
			arbitratorABI,
			signer
		)
	}
	const handleCommitVote = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const signer = provider.getSigner()
		const arbitratorContract = new ethers.Contract(
			'0x5E62274484F958D0205E214dF5CBDb19964Ed5B3',
			arbitratorABI,
			signer
		)
		let voteNumber = 0
		if (vote === 'Recipient win') voteNumber = 1
		const salt = ethers.utils.randomBytes(30)
		const abiCoder = new ethers.utils.AbiCoder()
		const res = abiCoder.encode(['uint', 'bytes'], [voteNumber, salt])
		const commit = ethers.utils.keccak256(res)
		arbitratorContract.commit(Number(disputeId), commit)
	}
	const handleNextPeriod = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const signer = provider.getSigner()
		const arbitratorContract = new ethers.Contract(
			'0x5E62274484F958D0205E214dF5CBDb19964Ed5B3',
			arbitratorABI,
			signer
		)
		await arbitratorContract.passPeriod(Number(disputeId))
		fetch()
	}
	const handleSubmitEvidence = () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const signer = provider.getSigner()
		const paymentContract = new ethers.Contract('0xdcb76B4C1C03c26A9f25409e73aA1969eE1800A4', paymentABI, signer)
		if (payment?.sender === address) {
			paymentContract.submitEvidenceBySender(Number(id), '')
		}
		if (payment?.recipient === address) {
			paymentContract.submitEvidenceByRecipient(Number(id), '')
		}
		handleClose()
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
						{isGracePeriod ? 'Grace period' : payment ? PaymnetStatus[payment?.status] : 'Locking'}
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
			<div className="flex gap-6 mt-12">
				{address === payment?.sender && PaymnetStatus[payment?.status] === 'Locking' ? (
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
			{payment?.status === PaymnetStatus.Appealing && (
				<>
					<div className="text-2xl mt-12 mb-6">Dispute</div>
					<div className="flex flex-col mb-12 gap-4">
						<div className="text-xl">Dispute id: {disputeId}</div>
						<div className="text-xl">
							Period: <div className="badge"> {Period[dispute?.period]}</div>
						</div>
					</div>
				</>
			)}
			<div className="flex gap-6 mt-12">
				{dispute?.period === Period.vote && (
					<button className="btn btn-info gap-2 w-40" onClick={() => handleOpen()}>
						Commit vote
					</button>
				)}
				{dispute?.period === Period.commit && (
					<button className="btn btn-info gap-2 w-40" onClick={() => handleOpen()}>
						Commit vote
					</button>
				)}
				{dispute?.period === Period.evidence &&
					(payment?.sender === address || payment?.recipient === address) && (
						<button
							className="btn btn-info gap-2  w-40"
							onClick={() => {
								handleOpen()
							}}
						>
							Sumbit Evidence
						</button>
					)}
				<button
					className="btn btn-info gap-2  w-40"
					onClick={() => {
						handleNextPeriod()
					}}
				>
					Next period
				</button>
			</div>
			<div className="mb-36"></div>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				{dispute?.period === Period.commit ? (
					<Box sx={style}>
						<Typography id="modal-modal-title" variant="h6" component="h2">
							Commit vote
						</Typography>
						<select
							className="select select-info w-full max-w-xs m-12"
							onChange={e => {
								setVote(e.target.value)
							}}
						>
							<option disabled selected>
								Select vote
							</option>
							<option>Payer win</option>
							<option>Recipient win</option>
						</select>
						<button
							className="btn btn-info gap-2  w-24 mt-12"
							onClick={() => {
								handleCommitVote()
							}}
						>
							Submit
						</button>
					</Box>
				) : (
					<Box sx={style}>
						<Typography id="modal-modal-title" variant="h6" component="h2">
							Upload evidence
						</Typography>

						<input
							type="file"
							className="file-input file-input-bordered file-input-info w-full max-w-xs mt-4"
						/>
						<button
							className="btn btn-info gap-2  w-24 mt-12"
							onClick={() => {
								handleSubmitEvidence()
							}}
						>
							Submit
						</button>
					</Box>
				)}
			</Modal>
		</div>
	)
}
export default Payment
