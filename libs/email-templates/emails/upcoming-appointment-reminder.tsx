import { Button, Link, Preview, Text } from '@react-email/components'
import { EmailLayout } from '../_layouts/EmailLayout'
import { UpcomingAppointmentReminderEmailProps } from '../types'

export const UpcomingAppointmentReminderEmail = ({
	practitionerName = '[Practitioner Name]',
	clinicName = '[Clinic Name]',
	patientName = '[Patient Name]',
	serviceName = '[Service Name]',
	locationType = 'Digital',
	meetingLink = 'https://www.google.com/',
	locationAddress = '[Location Address]',
	hourTillAppointment = 1,
	date = 'Friday, May 9, 2025',
	time = '10:00 AM - 11:00 AM',
	appointmentDetailUrl = 'https://www.google.com/',
}: UpcomingAppointmentReminderEmailProps) => (
	<EmailLayout>
		<Preview>Your appointment is coming up soon</Preview>
		<div className="bg-white m-0 mb-8 text-trueGray">
			<div>
				<Text className="font-semibold text-2xl leading-8 mb-6 mt-0">
					Your appointment is coming up soon
				</Text>
				<Text className="text-base leading-6 mb-8 mt-0">
					Hi <span className="font-medium">{patientName}</span>,
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					This is a reminder that you have an upcoming appointment scheduled in{' '}
					<span className="font-bold">{hourTillAppointment} hour</span>.
				</Text>
				<Text className="text-base font-bold leading-6 mt-0">
					Appointment Details
				</Text>
				<ul className="!pl-6 -mt-2 mb-6">
					<li className="!h-7">
						<Text className="text-base font-semibold leading-6 mb-2 mt-0 inline-block">
							Clinic:
						</Text>
						<Text className="text-base leading-6 mb-6 mt-0 inline-block ml-1">
							{clinicName}
						</Text>
					</li>
					<li className="!h-7">
						<Text className="text-base font-semibold leading-6 mb-2 mt-0 inline-block">
							Doctor:
						</Text>
						<Text className="text-base leading-6 mb-6 mt-0 inline-block ml-1">
							{practitionerName}
						</Text>
					</li>
					<li className="!h-7">
						<Text className="text-base font-semibold leading-6 mb-2 mt-0 inline-block">
							Service:
						</Text>
						<Text className="text-base leading-6 mb-6 mt-0 inline-block ml-1">
							{serviceName}
						</Text>
					</li>
					<li className="!h-7">
						<Text className="text-base font-semibold leading-6 mb-2 mt-0 inline-block">
							Date:
						</Text>
						<Text className="text-base leading-6 mb-6 mt-0 inline-block ml-1">
							{date}
						</Text>
					</li>
					<li className="!h-7">
						<Text className="text-base font-semibold leading-6 mb-2 mt-0 inline-block">
							Time:
						</Text>
						<Text className="text-base leading-6 mb-6 mt-0 inline-block ml-1">
							{time}
						</Text>
					</li>
					<li className="!h-7">
						<Text className="text-base font-semibold leading-6 mb-2 mt-0 inline-block">
							Location:
						</Text>
						<Text className="text-base leading-6 mb-6 mt-0 inline-block ml-1">
							{locationType}
						</Text>
					</li>
					{meetingLink ? (
						<li className="!h-7">
							<Text className="text-base font-semibold leading-6 mb-2 mt-0 inline-block">
								Meeting Link:
							</Text>
							<Text className="text-base leading-6 mb-6 mt-0 inline-block ml-1">
								<Link style={{ color: '#1890FF' }} href={meetingLink}>
									{meetingLink}
								</Link>{' '}
							</Text>
						</li>
					) : (
						<li className="!h-7">
							<Text className="text-base font-semibold leading-6 mb-2 mt-0 inline-block">
								Address:
							</Text>
							<Text className="text-base leading-6 mb-6 mt-0 inline-block ml-1">
								{locationAddress}
							</Text>
						</li>
					)}
				</ul>
				<Button
					className="text-white bg-confirmButton text-sm w-[214px] h-8 rounded-md mb-6 text-center leading-8"
					href={appointmentDetailUrl}
				>
					<span className="leading-[22px]">View Appointment Details</span>
				</Button>

				<Text className="text-base leading-6 mb-8 mt-0">
					Please ensure you're ready ahead of time to avoid any delays. If
					you're unable to attend, kindly update your appointment as soon as
					possible.
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

export default UpcomingAppointmentReminderEmail
