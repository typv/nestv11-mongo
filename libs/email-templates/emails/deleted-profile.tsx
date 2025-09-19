import { Button, Preview, Text } from '@react-email/components'
import EmailLayout from '../_layouts/EmailLayout'
import { DeletedProfileEmailProps } from '../types'

export const DeletedProfileEmail = ({
	name = '[User Name]',
	fullName = '[Full Name]',
	verifyUrl = 'https://www.google.com/',
	deletedOn = '[Date / Time]',
}: DeletedProfileEmailProps) => (
	<EmailLayout>
		<Preview>Profile has been successfully deleted</Preview>
		<div className="bg-white m-0 mb-8 text-trueGray">
			<div>
				<Text className="font-semibold text-2xl leading-8 mb-6 mt-0">
					Profile has been successfully deleted
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					Hi <span className="font-medium">{name}</span>,
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					We’re writing to confirm that the following profile has been
					successfully deleted from your account:
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					Profile Name: <span className="font-medium">{fullName}</span>
					<br />
					Deleted on: <span className="font-medium">{deletedOn}</span>
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					This action is permanent and the profile is no longer accessible.
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					If this was done in error, please contact our admin team as soon as
					possible.
				</Text>
				<Button
					className="text-white bg-confirmButton text-sm w-[180px] h-8 rounded-md text-center leading-8"
					href={verifyUrl}
				>
					<span className="leading-[22px]">Contact our Admin</span>
				</Button>
			</div>
		</div>
	</EmailLayout>
)

export default DeletedProfileEmail
