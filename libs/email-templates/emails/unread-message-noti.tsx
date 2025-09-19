import { Button, Preview, Text } from '@react-email/components'
import { EmailLayout } from '../_layouts/EmailLayout'
import { UnreadMessageNotificationEmailProps } from '../types'

export const UnreadMessageNotificationEmail = ({
	practitionerName = '[Practitioner Name]',
	inboxUrl = 'https://www.google.com/',
}: UnreadMessageNotificationEmailProps) => (
	<EmailLayout>
		<Preview>You have an unread message waiting</Preview>
		<div className="bg-white m-0 mb-8 text-trueGray">
			<div>
				<Text className="font-semibold text-2xl leading-8 mb-6 mt-0">
					You have an unread message waiting
				</Text>
				<Text className="text-base leading-6 mb-8 mt-0">
					Hi <span className="font-medium">{practitionerName}</span>,
				</Text>
				<Text className="text-base leading-6 mt-0 mb-2">
					You have message(s) in your inbox that haven’t been replied to in over
					an hour.
				</Text>
				<Text className="text-base leading-6 mt-0 mb-6">
					We wanted to make sure you don’t miss anything important.
				</Text>
				<Text className="text-base leading-6 mt-0 mb-2">
					To view and respond to your conversation(s), click the link below:
				</Text>
				<Button
					className="text-white bg-confirmButton text-sm w-[113px] h-8 rounded-md mb-6 text-center leading-8"
					href={inboxUrl}
				>
					<span className="leading-[22px]">Go to inbox</span>
				</Button>
				<Text className="text-base leading-6 mt-0 mb-6">
					Keeping your communication timely helps ensure the best care
					experience possible.
				</Text>
				<Text className="text-base leading-6 mt-0 mb-2">
					This is an automated reminder from DocMap.
				</Text>
				<Text className="text-base leading-6 mt-0 mb-6">
					If you’ve already responded, you can ignore this message.
				</Text>
				<Text className="text-base leading-6 mt-0">
					Warm regards,
					<br />
					DocMap Care Team
				</Text>
			</div>
		</div>
	</EmailLayout>
)

export default UnreadMessageNotificationEmail
