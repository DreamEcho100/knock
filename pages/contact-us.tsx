import type { NextPage } from 'next';

// import ReCAPTCHA from 'react-google-recaptcha';
import { GoogleReCaptcha, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import Button from '@components/shared/core/Button';
import FormInput from '@components/shared/core/FormInput';
import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';

const ContactUsPage: NextPage = () => {
	const { executeRecaptcha } = useGoogleReCaptcha();
	const [formValues, setFormValues] = useState({
		name: '',
		email: '',
		_subject: '',
		message: ''
	});

	const handleReCAPTCHAonChange = (value: string | null) => {
		console.log('Captcha value:', value);
	};
	// Create an event handler so you can call the verification on button click event or form submit
	const handleReCaptchaVerify = useCallback(async () => {
		if (!executeRecaptcha) {
			console.log('Execute recaptcha not yet available');
			return;
		}

		const token = await executeRecaptcha('yourAction');
		// Do whatever you want with the token
	}, [executeRecaptcha]);

	// You can use useEffect to trigger the verification as soon as the component being loaded
	useEffect(() => {
		handleReCaptchaVerify();
	}, [handleReCaptchaVerify]);

	return (
		<>
			<Head>
				<title>Contact Us | KNOCK Plugin - Make Your Drums Knock</title>
				<meta name='description' content="We'd love to hear from you!" />
			</Head>
			<section className='bg-primary-1 section-p-v1'>
				<div className='max-w-[800px] mx-auto'>
					<header className='flex flex-col gap-4 text-text-primary-1'>
						<h1 className='text-h2 font-semibold'>Contact us</h1>
						<p className='text-h3'>We&apos;d love to hear from you!</p>
					</header>

					<form
						className='flex flex-col items-center sm:items-start gap-16 my-8 border-[0.125rem] border-bg-secondary-1 rounded-2xl p-12'
						action='https://formsubmit.co/maze6572198@gmail.com'
						method='POST'
					>
						<FormInput
							spanTitleProps={{ children: 'Name', className: 'capitalize' }}
							labelContainerProps={{ className: 'w-full' }}
							placeholder='Your name'
							values={formValues}
							setValues={setFormValues}
							name='name'
							required
							minLength={3}
						/>
						<FormInput
							spanTitleProps={{ children: 'Email', className: 'capitalize' }}
							labelContainerProps={{ className: 'w-full' }}
							placeholder='Email'
							values={formValues}
							setValues={setFormValues}
							name='email'
							required
							minLength={3}
							type='email'
						/>
						<FormInput
							spanTitleProps={{ children: 'Subject', className: 'capitalize' }}
							labelContainerProps={{ className: 'w-full' }}
							placeholder='Subject'
							values={formValues}
							setValues={setFormValues}
							name='_subject'
							required
							minLength={3}
						/>
						<FormInput
							spanTitleProps={{ children: 'Message', className: 'capitalize' }}
							labelContainerProps={{ className: 'w-full' }}
							placeholder='Message'
							values={formValues}
							setValues={setFormValues}
							name='message'
							required
							minLength={3}
						/>
						{/* <ReCAPTCHA
							sitekey='6LdjpwUjAAAAAJTSe4mdrNT3x0CFHfr0uaxEDC_H'
							onChange={handleReCAPTCHAonChange}
						/> */}
						{/* <GoogleReCaptcha
							onVerify={handleReCAPTCHAonChange}
							refreshReCaptcha={3}
						/> */}
						<button type='button' onClick={handleReCaptchaVerify}>
							Verify recaptcha
						</button>
						<Button>Submit</Button>
					</form>
				</div>
			</section>
		</>
	);
};

export default ContactUsPage;
