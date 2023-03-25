import { FC, useEffect, useState } from 'react'
import { APP_NAME } from '@/lib/consts'
import ConnectWallet from '@/components/ConnectWallet'
import { Header } from '@/components/Header'
import { BookOpenIcon, CodeIcon, ShareIcon, PlusIcon } from '@heroicons/react/outline'
import { ethers } from 'ethers'
import { abi as paymentABI } from '@/abi/SilkPayV1.json'
import { useAccount } from 'wagmi'
import Link from 'next/link'
import Router from 'next/router'
import ThemeSwitcher from '@/components/ThemeSwitcher'
const Home: FC = () => {
	const { address } = useAccount()
	const [payments, setPayments] = useState<Array<any>>([])
	const desensitizationAddress = (info: string, len = 3) => {
		return info.substring(0, len) + '...' + info.substring(info.length - len, info.length)
	}
	const fetch = async () => {
		const provider = new ethers.providers.Web3Provider(window.ethereum)
		const paymentContract = new ethers.Contract('0x0dc627cB3bB1319007A5500259e8A16e672d8328', paymentABI, provider)
		const res = await paymentContract.getPaymentIDsBySender(address)
		const res1 = await paymentContract.getPaymentIDsByRecipient(address)
		const tPayments = []
		for (let i = 0; i < res[1].length; i++) {
			const tmp = {}
			Object.assign(tmp, await paymentContract.payments(res[1][i]))
			tmp['id'] = res[1][i].toNumber()
			tPayments.push(tmp)
		}
		for (let i = 0; i < res1[1].length; i++) {
			const tmp = {}
			Object.assign(tmp, await paymentContract.payments(res1[1][i]))
			tmp['id'] = res1[1][i]
			tPayments.push(tmp)
		}
		setPayments(tPayments)
	}
	useEffect(() => {
		fetch()
	}, [address])
	return (
		<div className="max-w-6xl flex flex-col items-start w-full mx-auto sm:px-6 lg:px-8 py-4 sm:pt-0">
			<div className="cards w-full flex gap-8 ">
				<div className="card w-96 bg-gray-50 dark:glass">
					<div className="card-body">
						<h2 className="card-title text-black">Create payment</h2>
						<p>some description</p>
						<div className="card-actions justify-center mt-10">
							<button className="btn btn-info gap-2" onClick={() => Router.push('/createpayment')}>
								Create <PlusIcon width={24} height={24} />
							</button>
						</div>
					</div>
				</div>
			</div>
			<div className="text-3xl mt-7">Related payments</div>
			<div className="flex flex-col gap-6 mt-7 w-full">
				{payments.map((v, k) => {
					return (
						<div
							key={k}
							className="flex items-center  rounded-[15px] w-full h-12 px-12 shadow-sm bg-gray-50 dark:bg-slate-600 hover:shadow-xl cursor-pointer text-xl"
							onClick={() => {
								Router.push('/payment/' + v.id)
							}}
						>
							{desensitizationAddress(v.sender)}
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default Home
