import { FC } from 'react'
import { APP_NAME } from '@/lib/consts'
import ConnectWallet from '@/components/ConnectWallet'
import { Header } from '@/components/Header'
import { BookOpenIcon, CodeIcon, ShareIcon, PlusIcon } from '@heroicons/react/outline'
import ThemeSwitcher from '@/components/ThemeSwitcher'

const CreatePayment: FC = () => {
	return (
		<div className="relative flex flex-col items-top min-h-screen p-60  bg-gray-100 dark:bg-gray-900 sm:items-center py-4 sm:pt-0">
			<ThemeSwitcher className="absolute bottom-6 right-6" />
			<div className="max-w-6xl flex flex-col w-full mx-auto sm:px-6 lg:px-8">
				<div className="card w-96 glass">
					<div className="card-body">
						<h2 className="card-title text-black">Create payment</h2>
						<p>some description</p>
						<div className="card-actions justify-center mt-10">
							<button className="btn btn-info gap-2">
								Create <PlusIcon width={24} height={24} />
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default CreatePayment
