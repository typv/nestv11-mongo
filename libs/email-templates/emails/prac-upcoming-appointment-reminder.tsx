import { Button, Link, Preview, Text } from '@react-email/components'
import { EmailLayout } from '../_layouts/EmailLayout'
import { PractitionerUpcomingAppointmentReminderEmailProps } from '../types'

export const PractitionerUpcomingAppointmentReminderEmail = ({
	patientName = '[Patient Name]',
	userName = '[User Name]',
	serviceName = '[Service Name]',
	date = 'Friday, May 9, 2025',
	time = '10:00 AM - 11:00 AM',
	meetingLink = 'https://www.google.com/',
	locationAddress = '[Location Address]',
    locationType = '[Location Type]',
	appointmentDetailUrl = 'https://www.google.com/',
}: PractitionerUpcomingAppointmentReminderEmailProps) => (
	<EmailLayout>
		<Preview>Upcoming Appointment in 1 Hour – {patientName}</Preview>
		<div className="bg-white m-0 mb-8 text-trueGray">
			<div>
				<Text className="font-semibold text-2xl leading-8 mb-6 mt-0">
                    Reminder of your next scheduled appointment.
				</Text>
				<Text className="text-base leading-6 mb-8 mt-0">
					Hi <span className="font-medium">{userName}</span>,
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
                    This is a reminder that you have an upcoming appointment scheduled to begin in{' '}
					<span className="font-bold">1 hour</span>.
				</Text>
				<Text className="text-base font-bold leading-6 mt-0">
					Appointment Details
				</Text>
				<ul className="!pl-6 -mt-2 mb-6">
					<li className="!h-7">
						<Text className="text-base font-semibold leading-6 mb-2 mt-0 inline-block">
							Patient:
						</Text>
						<Text className="text-base leading-6 mb-6 mt-0 inline-block ml-1">
							{patientName}
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
                    Please ensure everything is ready before the session begins. <br/>
                    If there are any issues or changes, please contact the admin team.
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

export default PractitionerUpcomingAppointmentReminderEmail
