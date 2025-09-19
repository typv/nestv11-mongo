import { Preview, Text } from '@react-email/components'
import { EmailLayout } from '../_layouts/EmailLayout'
import { GoogleAccountConnectionEmailProps } from '../types'

export const GoogleAccountConnectionEmail = ({
	practitionerName = '[Practitioner Name]',
	googleAccountEmail = 'japanandunicorn@gmail.com',
}: GoogleAccountConnectionEmailProps) => (
	<EmailLayout>
		<Preview>Your DocMap Account is Now Linked with Google</Preview>
		<div className="bg-white m-0 mb-8 text-trueGray">
			<div>
				<Text className="font-semibold text-2xl leading-8 mb-6 mt-0">
					Your DocMap Account is Now Linked with Google
				</Text>
				<Text className="text-base leading-6 mb-8 mt-0">
					Dear <span className="font-medium">{practitionerName}</span>,
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					We are happy to inform you that your Google account has been
					successfully linked to your DocMap account. You can now log in to
					DocMap using your Google credentials.
				</Text>
				<Text className="text-base font-medium leading-6 mb-2 mt-0">
					Here are the details of your connected account:
				</Text>
				<ul className="!pl-6 mt-0 mb-6">
					<li className="!h-7">
						<Text className="text-base font-semibold leading-6 mb-2 mt-0 inline-block">
							Google Account
						</Text>
						<Text className="text-base leading-6 mb-2 mt-0 inline-block ml-1">
							{googleAccountEmail}
						</Text>
					</li>
				</ul>
				<Text className="text-base leading-6 mb-6 mt-0">
					This will make logging in faster and easier each time you access
					DocMap.
				</Text>
				<Text className="text-base leading-6 mt-0 mb-6">
					If you have any questions or need further assistance, feel free to
					reach out to us.
				</Text>
				<Text className="text-base leading-6 mb-6">
					Thank you for using DocMap!
				</Text>

				<Text className="text-base leading-6 mb-6 mt-0">
					Warm regards,
					<br />
					DocMap Care Team
				</Text>
			</div>
		</div>
	</EmailLayout>
)

export default GoogleAccountConnectionEmail
