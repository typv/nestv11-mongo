import { Button, Preview, Text } from '@react-email/components'
import EmailLayout from '../_layouts/EmailLayout'
import { ResetYourPasswordEmailProps } from '../types'

export const ResetYourPasswordEmail = ({
	name = '[User Name]',
	resetPasswordUrl = 'https://www.google.com/',
}: ResetYourPasswordEmailProps) => (
	<EmailLayout>
		<Preview>Click to reset your password. Link expires in 30 minutes.</Preview>
		<div className="bg-white m-0 mb-8 text-trueGray">
			<div>
				<Text className="font-semibold text-2xl leading-8 mb-6 mt-0">
					Forgot Your Password? Let’s Reset It!
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					Hi <span className="font-medium">{name}</span>,
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					It looks like you requested a password reset for your{' '}
					<span className="font-medium">Docmap</span> account.
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					To reset your password, click the button below:
				</Text>
				<Button
					className="text-white bg-confirmButton text-sm w-[171px] h-8 rounded-md mb-6 text-center leading-8"
					href={resetPasswordUrl}
				>
					<span className="leading-[22px]">Reset my password</span>
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

export default ResetYourPasswordEmail
