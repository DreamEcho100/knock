import type { NextPage } from 'next';

import Button from '@components/shared/core/Button';
import FormInput from '@components/shared/core/FormInput';
import { useState } from 'react';
import Head from 'next/head';

const ContactUsPage: NextPage = () => {
	const [formValues, setFormValues] = useState({
		name: '',
		email: '',
		_subject: '',
		message: ''
	});

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
						action={
							process.env.NEXT_PUPLIC_FORMSUBMIT_EMAIL
								? `https://formsubmit.co/${process.env.NEXT_PUPLIC_FORMSUBMIT_EMAIL}`
								: ''
						}
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
						<Button>Submit</Button>
					</form>
				</div>
			</section>
		</>
	);
};

export default ContactUsPage;
