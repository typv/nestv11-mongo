import { Button, Preview, Text } from '@react-email/components'
import { EmailLayout } from '../_layouts/EmailLayout'
import { OverduePaymentsEmailProps } from '../types'

export const OverduePaymentsEmail = ({
	userName = '[User Name]',
	totalCommissionFee = '£226',
    billingPeriod = '09/2025',
	offset = '£12',
	billingAmount = '£214',
	paymentDate = 'Friday, Sep 19, 2025',
    overduePaymentsReviewUrl = 'https://www.google.com/',
}: OverduePaymentsEmailProps) => (
	<EmailLayout>
		<Preview>[DocMap] Overdue payment for [billing period] bill</Preview>
		<div className="bg-white m-0 mb-8 text-trueGray">
			<div>
				<Text className="font-semibold text-2xl leading-8 mb-6 mt-0">
                    An overdue payment is awaiting your action
				</Text>
				<Text className="text-base leading-6 mb-8 mt-0">
					Hi <span className="font-medium">{userName}</span>,
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
                    We wanted to remind you that a payment on your account is now overdue.
				</Text>
				<Text className="text-base font-bold leading-6 mt-0">
                    Overdue Billing Details:
				</Text>
				<ul className="!pl-6 -mt-2 mb-6">
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
                            Total Commission Fee:
						</Text>
						<Text className="text-base leading-6 mb-6 mt-0 inline-block ml-1">
							{totalCommissionFee}
						</Text>
					</li>
					<li className="!h-7">
						<Text className="text-base font-semibold leading-6 mb-2 mt-0 inline-block">
                            Offset:
						</Text>
						<Text className="text-base leading-6 mb-6 mt-0 inline-block ml-1">
							{offset}
						</Text>
					</li>
					<li className="!h-7">
						<Text className="text-base font-semibold leading-6 mb-2 mt-0 inline-block">
                            Billing Amount:
						</Text>
						<Text className="text-base leading-6 mb-6 mt-0 inline-block ml-1">
							{billingAmount}
						</Text>
					</li>
                    <li className="!h-7">
						<Text className="text-base font-semibold leading-6 mb-2 mt-0 inline-block">
                            Origin Due Date:
						</Text>
						<Text className="text-base leading-6 mb-6 mt-0 inline-block ml-1">
							{paymentDate}
						</Text>
					</li>
				</ul>
                <Text className="text-base leading-6 mb-6 mt-0">
                    To avoid service interruptions, please log in and complete your payment as soon as possible.
				</Text>
                <Button
					className="text-white bg-confirmButton text-sm w-[214px] h-8 rounded-md mb-6 text-center leading-8"
					href={overduePaymentsReviewUrl}
				>
					<span className="leading-[22px]">Pay Now</span>
				</Button>
                <Text className="text-base leading-6 mb-8 mt-0">
                    If you've already settled this payment, please disregard this message. Otherwise, feel free to reach out if you need help or have any questions.
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

export default OverduePaymentsEmail
