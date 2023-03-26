import { FC, useEffect, useState } from 'react'
import { APP_NAME } from '@/lib/consts'
import ConnectWallet from '@/components/ConnectWallet'
import { Header } from '@/components/Header'
import { BookOpenIcon, CodeIcon, ShareIcon, PlusIcon } from '@heroicons/react/outline'
import { ethers } from 'ethers'
import { abi as paymentABI } from '@/abi/SilkPayV1.json'
import { useAccount } from 'wagmi'
import Router from 'next/router'

export enum PaymnetStatus {
	Locking, //锁定期
	Appealing, //During arbitration 仲裁中
	Executed, //在申诉期，存在申诉，申诉被裁决及执行完成
	Paid, // 没有仲裁时，正常支付完成
	Refund, //没有仲裁，资金退回支付方
}
const Home: FC = () => {
	const { address } = useAccount()
	const [payments, setPayments] = useState<Array<any>>([])
	const desensitizationAddress = (info: string, len = 5) => {
		return info.substring(0, len) + '...' + info.substring(info.length - len, info.length)
	}
	const fetch = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const paymentContract = new ethers.Contract('0x4B62466d0A6cC59c65b6C93917AD9D30de259266', paymentABI, provider)
		const senderPayment = await paymentContract.getPaymentIDsBySender(address)
		const recipientPayment = await paymentContract.getPaymentIDsByRecipient(address)
		const tPayments = []
		for (let i = 0; i < senderPayment[1].length; i++) {
			const tmp = {}
			Object.assign(tmp, await paymentContract.payments(senderPayment[1][i]))
			tmp['id'] = senderPayment[1][i].toNumber()
			tPayments.push(tmp)
		}
		for (let i = 0; i < recipientPayment[1].length; i++) {
			const tmp = {}
			Object.assign(tmp, await paymentContract.payments(senderPayment[1][i]))
			tmp['id'] = recipientPayment[1][i]
			tPayments.push(tmp)
		}
		setPayments(tPayments)
		console.log(tPayments)
	}
	useEffect(() => {
		fetch()
	}, [address])
	return (
		<div className="max-w-6xl flex flex-col items-start w-full mx-auto sm:px-6 lg:px-8 py-4 sm:pt-0">
			<div className="cards w-full flex gap-8 ">
				<div className="card w-96 bg-gray-50 dark:glass">
					<div className="card-body">
						<h2 className="card-title text-black">Create Payment</h2>
						<p>Start your arbitrable payment from here...</p>
						<div className="card-actions justify-center mt-10">
							<button className="btn btn-info gap-2" onClick={() => Router.push('/createpayment')}>
								Create <PlusIcon width={24} height={24} />
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="text-3xl mt-7">Related Payments</div>
			<div className="flex flex-col gap-6 mt-7 w-full">
				{payments.map((v, k) => {
					return (
						<div
							key={k}
							className="flex items-center gap-4 relative rounded-[15px] w-full h-16 px-12 shadow-sm bg-gray-50 dark:bg-slate-600 hover:shadow-xl cursor-pointer text-xl"
							onClick={() => {
								Router.push('/payment/' + v.id)
							}}
						>
							<div className="badge badge-primary badge-outline">{desensitizationAddress(v.sender)}</div>
							pay to
							<div className="badge badge-secondary badge-outline">
								{v.targeted ? desensitizationAddress(v.recipient) : 'whitelist'}
							</div>
							<div>{Number(v.id)}</div>
							{ethers.utils.formatEther(v.amount)} ETH
							<div className="badge absolute right-8">{PaymnetStatus[v.status]}</div>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Home
