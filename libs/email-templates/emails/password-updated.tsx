import { Preview, Text } from '@react-email/components'
import { EmailLayout } from '../_layouts/EmailLayout'
import { PasswordUpdatedEmailProps } from '../types'

export const PasswordUpdatedEmail = ({
	name = '[User Name]',
}: PasswordUpdatedEmailProps) => (
	<EmailLayout>
		<Preview>
			Your password was successfully updated. Contact support if this wasn’t
			you.
		</Preview>
		<div className="bg-white m-0 mb-8 text-trueGray">
			<div>
				<Text className="font-semibold text-2xl leading-8 mb-6 mt-0">
					Your Password Has Been Successfully Changed
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					Hi <span className="font-medium">{name}</span>,
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					We wanted to let you know that your password has been successfully
					updated.
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					If you did not make this change or if you have any concerns, please
					contact our support team immediately.
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					To keep your account secure, make sure your new password is unique and
					not shared with anyone.
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					If you have any questions, feel free to reach out!
				</Text>
				<Text className="text-base leading-6 my-0">Thank you,</Text>
			</div>
		</div>
	</EmailLayout>
)

export default PasswordUpdatedEmail
