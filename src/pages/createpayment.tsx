import { FC, useState, useRef } from 'react'
import { APP_NAME } from '@/lib/consts'
import { Header } from '@/components/Header'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { BackButton } from '@/components/BackButton'
import { abi as paymentABI } from '@/abi/SilkPayV1.json'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useAccount } from 'wagmi'
import { ethers } from 'ethers'

const CreatePayment: FC = () => {
	const [tabValue, setTabValue] = useState<number>(0)
	const [lockDate, setLockDate] = useState<any>()
	const amountRef = useRef()
	const oneRef = useRef()
	const multiRef = useRef()
	const handleCreate = () => {
		const amount = (amountRef.current as HTMLInputElement).value
		let result = []
		if (tabValue) {
			const multi = (multiRef.current as HTMLTextAreaElement).value
			result = multi.valueOf().split(/[\s,;:\t\r\n]+/)
		} else {
			const one = (oneRef.current as HTMLInputElement).value
			result = [one]
		}
		console.log(lockDate.unix())
		if (window.ethereum) {
			const provider = new ethers.providers.Web3Provider(window.ethereum)
			const signer = provider.getSigner()
			const paymentContract = new ethers.Contract(
				'0x0dc627cB3bB1319007A5500259e8A16e672d8328',
				paymentABI,
				signer
			)
		}
	}

	return (
		<div className="flex flex-col w-full h-full items-start justify-start max-w-6xl sm:pt-0">
			<div className="flex">
				<BackButton />
			</div>
			<div className="flex flex-col w-full gap-6 form mt-12">
				<div className="flex text-2xl">Payment amount (ETH)</div>
				<input ref={amountRef} type="text" placeholder="Type here" className="input input-bordered w-full" />
				<div className="flex text-2xl">Locked until</div>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
					<DatePicker disablePast value={lockDate} onChange={newValue => setLockDate(newValue)} />
				</LocalizationProvider>

				<div className="tabs w-full">
					<a
						className={'tab tab-lifted tab-lg ' + (tabValue ? '' : 'tab-active')}
						onClick={() => {
							setTabValue(0)
						}}
					>
						one recipient
					</a>
					<a
						className={'tab tab-lifted tab-lg ' + (tabValue ? 'tab-active' : '')}
						onClick={() => {
							setTabValue(1)
						}}
					>
						Multiple potential recipients
					</a>
				</div>
				{!tabValue ? (
					<>
						<div className="flex text-2xl">Recipient</div>
						<input
							ref={oneRef}
							type="text"
							placeholder="Type here"
							className="input input-bordered w-full"
						/>
					</>
				) : (
					<>
						<div className="flex text-2xl">Recipients</div>
						<textarea
							ref={multiRef}
							placeholder="Please enter each address in a new line followed by a separator (comma,colon or blank space)"
							className="textarea textarea-bordered textarea-lg w-full"
						></textarea>
					</>
				)}
				<button
					className="btn btn-info max-w-xs self-center"
					onClick={() => {
						handleCreate()
					}}
				>
					Create Payment
				</button>
			</div>
		</div>
	)
}
export default CreatePayment
