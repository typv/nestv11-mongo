import { Link, Preview, Text } from '@react-email/components'
import { EmailLayout } from '../_layouts/EmailLayout'
import { UpdateAppointmentPatientEmailProps } from '../types'
import { extractDate } from '../utils'

export const UpdateAppointmentPatientEmail = ({
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
	feeAmount = '[Fee Amount]',
	discountAmount = '[Discount Amount]',
	total = '[Total]',
	patientNote = '[Patient Note]',
	supportEmail = 'support@docmap.com',
	feeSuffix = '$',
}: UpdateAppointmentPatientEmailProps) => (
	<EmailLayout>
		<Preview>
			Appointment Updated with {practitionerName} on{' '}
			{extractDate(appointmentDate)}.
		</Preview>
		<div className="bg-white m-0 mb-8 text-trueGray">
			<div>
				<Text className="font-semibold text-2xl leading-8 mb-6 mt-0">
					Appointment Updated with {practitionerName} on{' '}
					{extractDate(appointmentDate)}
				</Text>
				<Text className="text-base leading-6 mb-8 mt-0">
					Dear <span className="font-medium">{patientName}</span>,
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					Your appointment has been successfully updated. Please review your
					updated details below:
				</Text>
				<Text className="text-base font-bold leading-6 mt-0">
					Appointment Details
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
				<Text className="text-base font-bold leading-6 mt-0">
					Booking Summary
				</Text>
				<ul className="!pl-6 -mt-2">
					<li className="!h-7">
						<Text className="text-base font-semibold leading-6 mb-2 mt-0 inline-block">
							Fee:
						</Text>
						<Text className="text-base leading-6 mb-6 mt-0 inline-block ml-1">
							{feeSuffix}
							{feeAmount}
						</Text>
					</li>
					<li className="!h-7">
						<Text className="text-base font-semibold leading-6 mb-2 mt-0 inline-block">
							Discount Applied:
						</Text>
						<Text className="text-base leading-6 mb-6 mt-0 inline-block ml-1">
							-{feeSuffix}
							{discountAmount}
						</Text>
					</li>
					<li className="!h-7">
						<Text className="text-base font-semibold leading-6 mb-2 mt-0 inline-block">
							Total:
						</Text>
						<Text className="text-base leading-6 mb-6 mt-0 inline-block ml-1">
							{feeSuffix}
							{total}
						</Text>
					</li>
				</ul>
				<Text className="text-base font-bold leading-6 mt-0">
					Note from You
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0 -mt-2">
					{patientNote}
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					If this update was unexpected or incorrect, please log into your
					account or contact us at{' '}
					<span className="text-[#1890FF]">{supportEmail}</span>.
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
					Thank you for choosing DocMap. We look forward to seeing you soon!
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

export default UpdateAppointmentPatientEmail
