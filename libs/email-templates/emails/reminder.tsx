import { Button, Preview, Text } from '@react-email/components'
import EmailLayout from '../_layouts/EmailLayout'
import { ReminderEmailProps } from '../types'

export const ReminderEmail = ({
	verifyUrl = 'https://www.google.com/',
}: ReminderEmailProps) => (
	<EmailLayout>
		<Preview>
			Please confirm your email within 30 minutes to activate your DocMap
			account
		</Preview>
		<div className="bg-white mb-8 text-trueGray">
			<div>
				<Text className="font-semibold text-2xl leading-8 mb-6 mt-0">
					Oh no, you missed a step!
				</Text>
				<Text className="text-base leading-6 mt-0 mb-6">
					To complete your sign-up and get started with Docmap, just click the
					button below to confirm your email address
				</Text>
				<Button
					className="text-white bg-confirmButton text-sm leading-6 w-40 h-8 rounded-md mb-6 text-center leading-8"
					href={verifyUrl}
				>
					<span className="leading-[22px]">Confirm my email</span>
				</Button>
				<Text className="text-base leading-6 my-0 text-trueGray">
					For your security, this link will expire in{' '}
					<span className="font-medium">30 minutes</span>. Please click the
					button before it expires.
				</Text>
			</div>
		</div>
	</EmailLayout>
)

export default ReminderEmail
