import { Button, Preview, Text } from '@react-email/components'
import { EmailLayout } from '../_layouts/EmailLayout'
import { NewBillsToReviewEmailProps } from '../types'

export const NewBillsToReviewEmail = ({
	userName = '[User Name]',
	billingPeriod = '09/2025',
	totalCommissionFee = '£226',
	offset = '£12',
	billingAmount = '£214',
	paymentDate = 'Friday, Sep 19, 2025',
	billingDetailReviewUrl = 'https://www.google.com/',
}: NewBillsToReviewEmailProps) => (
	<EmailLayout>
		<Preview>[DocMap] Unpaid billing requires your attention</Preview>
		<div className="bg-white m-0 mb-8 text-trueGray">
			<div>
				<Text className="font-semibold text-2xl leading-8 mb-6 mt-0">
                    You have a billing period pending review
				</Text>
				<Text className="text-base leading-6 mb-8 mt-0">
					Hi <span className="font-medium">{userName}</span>,
				</Text>
				<Text className="text-base leading-6 mb-6 mt-0">
                    We noticed that you have an unpaid billing item in your account that requires your review.
				</Text>
				<Text className="text-base font-bold leading-6 mt-0">
                    Billing Details:
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
                            Due Date:
						</Text>
						<Text className="text-base leading-6 mb-6 mt-0 inline-block ml-1">
							{paymentDate}
						</Text>
					</li>
				</ul>
                <Text className="text-base leading-6 mb-6 mt-0">
                    Please log in to your account to review and take action as soon as possible to avoid any service disruptions.
				</Text>
				<Button
					className="text-white bg-confirmButton text-sm w-[214px] h-8 rounded-md mb-6 text-center leading-8"
					href={billingDetailReviewUrl}
				>
					<span className="leading-[22px]">Review Billing Now</span>
				</Button>
                <Text className="text-base leading-6 mb-8 mt-0">
                    If you’ve already made a payment or believe this is an error, feel free to contact our support team.
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

export default NewBillsToReviewEmail
