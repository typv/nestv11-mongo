import { Link, Preview, Text } from '@react-email/components'
import { EmailLayout } from '../_layouts/EmailLayout'
import { SystemMaintainanceEmailProps } from '../types'

export const SystemMaintainanceEmail = ({
	patientName = '[Patient Name]',
	maintainanceStartTime = 'May 13, 2025  11:00pm',
	maintainanceEndTime = ' May 14, 2025 2:00am (GMT+7)',
	supportEmail = 'support@docmap.com',
}: SystemMaintainanceEmailProps) => (
	<EmailLayout>
		<Preview>
			Scheduled System Maintenance - We're Updating to Serve You Better
		</Preview>
		<div className="bg-white m-0 mb-8 text-trueGray">
			<div>
				<Text className="font-semibold text-2xl leading-8 mb-6 mt-0">
					Scheduled System Maintenance - We're Updating to Serve You Better
				</Text>
				<Text className="text-base leading-6 mb-8 mt-0">
					Hi <span className="font-medium">{patientName}</span>,
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					We want to let you know that DocMap will undergo scheduled maintenance
					to improve our services and ensure a smoother experience.
				</Text>
				<Text className="text-base font-medium leading-6 mb-2 mt-0">
					Maintenance Window:
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					<span className="font-semibold">{maintainanceStartTime}</span> to{' '}
					<span className="font-semibold">{maintainanceEndTime}</span>
				</Text>
				<Text className="text-base leading-6 mt-0">During this time:</Text>
				<ul className="!pl-6 -mt-2 mb-6">
					<li className="!h-7">
						<Text className="text-base leading-6 mb-2 mt-0">
							You may experience limited access to the platform.
						</Text>
					</li>
					<li className="!h-7">
						<Text className="text-base leading-6 mb-2 mt-0">
							Appointment booking, messaging, and other features might be
							temporarily unavailable.
						</Text>
					</li>
					<li className="!h-7">
						<Text className="text-base leading-6 mb-2 mt-6">
							Your data and information remain safe and secure.
						</Text>
					</li>
				</ul>
				<Text className="text-base leading-6 mb-6 mt-0">
					We recommend planning your activity on DocMap accordingly. Normal
					services will resume automatically once maintenance is complete.
				</Text>
				<Text className="text-base leading-6 mt-0 font-semibold">
					Need help?
				</Text>
				<Text className="text-base leading-6 mb-6 -mt-4">
					If you have any urgent concerns or need assistance, please contact us
					at{' '}
					<Link style={{ color: '#1890FF' }} href={`mailto:${supportEmail}`}>
						{supportEmail}
					</Link>
					.
				</Text>
				<Text className="text-base leading-6 mt-0">
					Thank you for your understanding and continued trust in DocMap.
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

export default SystemMaintainanceEmail
