import { FC, useState, useRef } from 'react'
import { APP_NAME } from '@/lib/consts'
import ConnectWallet from '@/components/ConnectWallet'
import { Header } from '@/components/Header'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import ThemeSwitcher from '@/components/ThemeSwitcher'
import { BackButton } from '@/components/BackButton'

const CreatePayment: FC = () => {
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
			<div className="flex flex-col w-full gap-6 form mt-12">
				<div className="flex text-2xl">Payment amount (ETH)</div>
				<input ref={amountRef} type="text" placeholder="Type here" className="input input-bordered w-full" />
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
