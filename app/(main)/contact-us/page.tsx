import { defaultSiteName3 } from '~/utils/core/next-seo.config';
import type { Metadata } from 'next';
import ContactUsScreen from './screen';

export const metadata: Metadata = {
	title: `Contact Us | ${defaultSiteName3}`,
	description:
		'If you have a question, please review FAQs before submitting a ticket.',
};

export default ContactUsScreen;
