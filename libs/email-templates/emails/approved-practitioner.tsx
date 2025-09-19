import { Button, Preview, Text } from '@react-email/components'
import EmailLayout from '../_layouts/EmailLayout'
import { ApprovePractitionerEmailProps } from '../types'

export const ApprovePractitionerEmail = ({
	name = '[User Name]',
	practitionerName = '[Practitioner Name]',
	verifyUrl = 'https://www.google.com/',
}: ApprovePractitionerEmailProps) => (
	<EmailLayout>
		<Preview>Your practitioner profile has been approved</Preview>
		<div className="bg-white m-0 mb-8 text-trueGray">
			<div>
				<Text className="font-semibold text-2xl leading-8 mb-6 mt-0">
					Your practitioner profile has been approved
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					Hi <span className="font-medium">{name}</span>,
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					Great news! The practitioner profile{' '}
					<span className="font-medium">{practitionerName}</span> has been
					approved by our admin team.
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					You can now manage the profile details, update availability, and list
					it on the marketplace for patient bookings.
				</Text>
				<Button
					className="text-white bg-confirmButton text-sm w-[180px] h-8 rounded-md mb-6 text-center leading-8"
					href={verifyUrl}
				>
					<span className="leading-[22px]">Go to Manage Profile</span>
				</Button>
				<Text className="text-base leading-6 mb-6 mt-0">
					If you have any questions or need assistance, feel free to contact us.
				</Text>
			</div>
		</div>
	</EmailLayout>
)

export default ApprovePractitionerEmail
