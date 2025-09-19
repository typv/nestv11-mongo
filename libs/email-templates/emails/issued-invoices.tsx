import { Preview, Text } from '@react-email/components'
import { EmailLayout } from '../_layouts/EmailLayout'
import { IssuedInvoicesEmailProps } from '../types'

export const IssuedInvoicesEmail = ({
	userName = '[User Name]',
	amount = '£226',
	billingPeriod = '09/2025',
	paymentDate = 'Friday, Sep 19, 2025',
	cardInfo = '1234 5678 9012 3456',
}: IssuedInvoicesEmailProps) => (
	<EmailLayout>
		<Preview>[DocMap] Successful payment for [billing period] bill</Preview>
		<div className="bg-white m-0 mb-8 text-trueGray">
			<div>
				<Text className="font-semibold text-2xl leading-8 mb-6 mt-0">
                    Payment successful – Your invoice is ready
				</Text>
				<Text className="text-base leading-6 mb-8 mt-0">
					Hi <span className="font-medium">{userName}</span>,
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
                    This is a confirmation that your billing has been successfully processed.
				</Text>
				<Text className="text-base font-bold leading-6 mt-0">
                    Payment summary:
				</Text>
				<ul className="!pl-6 -mt-2 mb-6">
					<li className="!h-7">
						<Text className="text-base font-semibold leading-6 mb-2 mt-0 inline-block">
                            Amount Charged:
						</Text>
						<Text className="text-base leading-6 mb-6 mt-0 inline-block ml-1">
							{amount}
						</Text>
					</li>
					<li className="!h-7">
						<Text className="text-base font-semibold leading-6 mb-2 mt-0 inline-block">
                            Billing Period:
						</Text>
						<Text className="text-base leading-6 mb-6 mt-0 inline-block ml-1">
							{billingPeriod}
						</Text>
					</li>
					<li className="!h-7">
						<Text className="text-base font-semibold leading-6 mb-2 mt-0 inline-block">
                            Payment Date:
						</Text>
						<Text className="text-base leading-6 mb-6 mt-0 inline-block ml-1">
							{paymentDate}
						</Text>
					</li>
					<li className="!h-7">
						<Text className="text-base font-semibold leading-6 mb-2 mt-0 inline-block">
                            Payment Method:
						</Text>
						<Text className="text-base leading-6 mb-6 mt-0 inline-block ml-1">
							{cardInfo}
						</Text>
					</li>
				</ul>
                <Text className="text-base leading-6 mb-6 mt-0">
                    Please find the attached invoice below for more details.
				</Text>
                <Text className="text-base leading-6 mb-8 mt-0">
                    If you have any questions about this charge or need assistance, feel free to contact our support team.
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

export default IssuedInvoicesEmail
