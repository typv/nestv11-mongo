import { Button, Preview, Text } from '@react-email/components'
import EmailLayout from '../_layouts/EmailLayout'
import { VerifyEmailAddressEmailProps } from '../types'

export const VerifyEmailAddressEmail = ({
	name = '[User Name]',
	verifyUrl = 'https://www.google.com/',
}: VerifyEmailAddressEmailProps) => (
	<EmailLayout>
		<Preview>
			Please confirm your email within 30 minutes to activate your DocMap
			account
		</Preview>
		<div className="bg-white m-0 mb-8 text-trueGray">
			<div>
				<Text className="font-semibold text-2xl leading-8 mb-6 mt-0">
					Verify Your Email Address
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					Hi <span className="font-medium">{name}</span>,
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					We just want to make sure it's you 😊
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					Click the button below to confirm your email address and get started
					with <span className="font-medium">Docmap</span>
				</Text>
				<Button
					className="text-white bg-confirmButton text-sm w-40 h-8 rounded-md mb-6 text-center leading-8"
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

export default VerifyEmailAddressEmail
