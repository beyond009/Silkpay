import { ArrowLeftIcon } from '@heroicons/react/outline'
import Router from 'next/router'
export const BackButton = () => {
	return (
		<button className="btn btn-active btn-ghost gap-2" onClick={() => Router.back()}>
			<ArrowLeftIcon width={24} height={24} />
			Back
		</button>
	)
}
