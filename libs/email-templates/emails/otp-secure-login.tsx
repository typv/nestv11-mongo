import { Preview, Text } from '@react-email/components'
import { EmailLayout } from '../_layouts/EmailLayout'
import { OtpSecureLoginEmailProps } from '../types'

export const OtpSecureLoginEmail = ({
	userName = '[Practitioner Name]',
	otp = '875634',
	expiresIn = '15 minutes',
}: OtpSecureLoginEmailProps) => (
	<EmailLayout>
		<Preview>Your One-Time Password (OTP) for Secure Login</Preview>
		<div className="bg-white m-0 mb-8 text-trueGray">
			<div>
				<Text className="font-semibold text-2xl leading-8 mb-6 mt-0">
					Your One-Time Password (OTP) for Secure Login
				</Text>
				<Text className="text-base leading-6 mb-8 mt-0">
					Hi <span className="font-medium">{userName}</span>,
				</Text>
				<Text className="text-base leading-6 mt-0">
					Your One-Time Password (OTP) is:
				</Text>
				<Text className="text-xl font-medium leading-6 mb-6 -mt-2 text-[#393CE5] font-semibold">
					{otp}
				</Text>
				<Text className="text-base leading-6 mb-8 mt-0">
					This code is valid for{' '}
					<span className="font-semibold">{expiresIn}</span>.
				</Text>
				<Text className="text-base leading-6 mt-0">For your security:</Text>
				<ul className="!pl-6 -mt-2 mb-12">
					<li className="!h-7">
						<Text className="text-base leading-6 mb-2 mt-0">
							Please do not share this code with anyone.
						</Text>
					</li>
					<li className="!h-7">
						<Text className="text-base leading-6 mb-2 mt-0">
							You can request a new OTP only after 1 minute if neededYou can
							request a new OTP only after 1 minute if needed.
						</Text>
					</li>
				</ul>
				<Text className="text-base leading-6 mt-0 mb-6">
					If you did not request this OTP, please ignore this email.
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					Thank you,
					<br />
					DocMap Care Team
				</Text>
			</div>
		</div>
	</EmailLayout>
)

export default OtpSecureLoginEmail
