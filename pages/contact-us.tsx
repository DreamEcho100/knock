import type { NextPage } from 'next';

import Button from '@components/shared/core/Button';
import FormInput from '@components/shared/core/FormInput';
import { useState } from 'react';
import Head from 'next/head';
import { useRef } from 'react';
import Link from 'next/link';

const ContactUsPage: NextPage = () => {
	const [formValues, setFormValues] = useState({
		name: '',
		email: '',
		_subject: `New customer message on ${new Date().toString()}`,
		message: ''
	});

	const configRef = useRef({
		toNotSubmit: false
	});

	return (
		<>
			<Head>
				<title>Contact Us | KNOCK Plugin - Make Your Drums Knock</title>
				<meta
					name='description'
					content='If you have a question, please review FAQs before submitting a ticket.'
				/>
			</Head>
			<section className='bg-primary-1 section-p-v1'>
				<div className='max-w-[800px] mx-auto'>
					<header className='flex flex-col gap-4 text-text-primary-1'>
						<h1 className='text-h2 font-semibold'>Contact Us</h1>
						<p className='text-text-primary-2'>
							If you have a question, please review{' '}
							<Link
								href='/faqs'
								className='text-bg-secondary-1 hover:text-violet-600 focus:text-violet-600'
							>
								FAQs
							</Link>{' '}
							before submitting a ticket.
						</p>
					</header>

					<form
						className='flex flex-col items-center sm:items-start gap-10 my-8 border-[0.125rem] border-bg-secondary-1 rounded-2xl p-12'
						action={
							process.env.NEXT_PUPLIC_FORMSUBMIT_EMAIL
								? `https://formsubmit.co/${process.env.NEXT_PUPLIC_FORMSUBMIT_EMAIL}`
								: ''
						}
						method='POST'
						onSubmit={(event) => {
							if (configRef.current.toNotSubmit) event.preventDefault();
						}}
					>
						<input type='hidden' name='_template' value='box' />
						<input type='text' name='_honey' style={{ display: 'none' }} />
						{/* <input type="hidden" name="_next" value="https://yourdomain.co/thanks.html" /> */}
						<FormInput
							spanTitleProps={{ children: 'Name', className: 'capitalize' }}
							labelContainerProps={{ className: 'w-full gap-2' }}
							placeholder='Your name'
							values={formValues}
							setValues={setFormValues}
							name='name'
							required
							minLength={3}
							variants={{ border: 'all', rounded: 'md', p: 'sm' }}
						/>
						<FormInput
							spanTitleProps={{ children: 'Email', className: 'capitalize' }}
							labelContainerProps={{ className: 'w-full gap-2' }}
							placeholder='Email'
							values={formValues}
							setValues={setFormValues}
							name='email'
							required
							minLength={3}
							variants={{ border: 'all', rounded: 'md', p: 'sm' }}
							type='email'
						/>
						<FormInput
							spanTitleProps={{ children: 'Subject', className: 'capitalize' }}
							labelContainerProps={{ className: 'w-full hidden gap-2' }}
							placeholder='Subject'
							values={formValues}
							setValues={setFormValues}
							name='_subject'
							required
							minLength={3}
							variants={{ border: 'all', rounded: 'md', p: 'sm' }}
						/>
						<FormInput
							isATextarea
							spanTitleProps={{ children: 'Message', className: 'capitalize' }}
							labelContainerProps={{ className: 'w-full gap-2' }}
							placeholder='Message'
							values={formValues}
							setValues={setFormValues}
							name='message'
							required
							minLength={3}
							variants={{ border: 'all', rounded: 'md', p: 'sm' }}
							onKeyDown={(event) => {
								if (
									event.shiftKey &&
									(event.keyCode === 13 || event.key === 'Enter')
								) {
									return (configRef.current.toNotSubmit = true);
								}
								configRef.current.toNotSubmit = false;
							}}
							onKeyUp={() => {
								configRef.current.toNotSubmit = false;
							}}
						/>
						<Button>Submit</Button>
					</form>
				</div>
			</section>
		</>
	);
};

export default ContactUsPage;
