import { Link, Preview, Text } from '@react-email/components'
import { EmailLayout } from '../_layouts/EmailLayout'
import { PatientCancelAppointmentPatientEmailProps } from '../types'
import { extractDate } from '../utils'

export const PatientCancelAppointmentPatientEmail = ({
	practitionerName = '[Practitioner Name]',
	clinicName = '[Clinic Name]',
	patientName = '[Patient Name]',
	serviceName = '[Service Name]',
	appointmentDate = 'Friday, May 9, 2025',
	appointmentTime = '[Appointment Time]',
	locationType = 'Digital',
	meetingLink = '[Meeting Link]',
	channelName = '[Channel Name]',
	locationAddress = '[Location Address]',
	cancelReason = '[Cancel Reason]',
}: PatientCancelAppointmentPatientEmailProps) => (
	<EmailLayout>
		<Preview>
			Your Appointment with {practitionerName} on {extractDate(appointmentDate)}{' '}
			Has Been Canceled.
		</Preview>
		<div className="bg-white m-0 mb-8 text-trueGray">
			<div>
				<Text className="font-semibold text-2xl leading-8 mb-6 mt-0">
					Your Appointment with {practitionerName} on{' '}
					{extractDate(appointmentDate)} Has Been Canceled
				</Text>
				<Text className="text-base leading-6 mb-8 mt-0">
					Dear <span className="font-medium">{patientName}</span>,
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					This is to confirm that your appointment has been successfully
					canceled. Below are the details:
				</Text>
				<Text className="text-base font-bold leading-6 mt-0">
					Canceled Appointment Details
				</Text>
				<ul className="!pl-6 -mt-2">
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
							{appointmentDate}
						</Text>
					</li>
					<li className="!h-7">
						<Text className="text-base font-semibold leading-6 mb-2 mt-0 inline-block">
							Time:
						</Text>
						<Text className="text-base leading-6 mb-6 mt-0 inline-block ml-1">
							{appointmentTime}
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
					{locationType === 'Digital' ? (
						<li className="!h-[26px]">
							<Text className="text-base font-semibold leading-6 mb-6 mt-0 inline-block">
								Meeting Link:
							</Text>
							<Text className="text-base leading-6 mt-0 inline-block ml-1">
								<Link style={{ color: '#1890FF' }} href={meetingLink}>
									Join Meeting via {channelName}
								</Link>{' '}
							</Text>
						</li>
					) : (
						<li>
							<Text className="text-base font-semibold leading-6 mb-[2px] mt-0 inline-block">
								Address:
							</Text>
							<Text className="text-base leading-6 mb-6 mt-0 block">
								{locationAddress}
							</Text>
						</li>
					)}
				</ul>
				<Text className="text-base font-bold leading-6 mt-0">Reason</Text>
				<Text className="text-base leading-6 mb-6 mt-0 -mt-2">
					{cancelReason}
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					If this cancellation was made in error, you can easily rebook your
					appointment by logging into your DocMap account.
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					Thank you for using DocMap. We hope to serve you again soon.
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

export default PatientCancelAppointmentPatientEmail
