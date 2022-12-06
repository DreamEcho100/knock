import type { NextPage } from 'next';

import Button from '@components/shared/core/Button';
import FormInput from '@components/shared/core/FormInput';
import { FormEvent, useState } from 'react';
import Head from 'next/head';
import { useRef } from 'react';
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import type { IGenericErrorResponse } from 'types';
import { toast } from 'react-toastify';
import { CountryDropdown } from 'react-country-region-selector';
// import moment from 'moment';

const ContactUsPage: NextPage = () => {
	const date = Date.now();
	const [formValues, setFormValues] = useState({
		fullName: '',
		email: '',
		subject: `New customer message on ${
			// moment(new Date(date)).format('MMMM Do YYYY,h:mm:ss a')
			new Date().toLocaleString('en-UK', {
				dateStyle: 'long',
				timeStyle: 'short',
				hourCycle: 'h12'
			})
		}`,
		message: '',
		countryCode: ''
	});

	const configRef = useRef({
		toNotSubmit: false
	});

	const submitForm = useMutation<
		{
			success: true;
			message: string;
			user: {
				customerAccessToken: { accessToken: string; expiresAt: string };
			};
		},
		IGenericErrorResponse,
		FormEvent
	>({
		mutationFn: (event) => {
			event.preventDefault();

			return fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_RELATIVE_PATH}/clients/contact-us`,
				{
					method: 'POST',
					headers: { 'Content-type': 'application/json' },
					body: JSON.stringify(formValues)
				}
			)
				.then((response) => response.json())
				.then((result) => {
					if ('success' in result && !result.success)
						throw new Error(result.message);

					return result;
				});
		},
		onSuccess: (result) => {
			setTimeout(() => toast.success(result.message), 0);
		},
		onError: (result) =>
			setTimeout(() => toast(result.message, { type: 'error' }), 0)
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
						className='flex flex-col items-center sm:items-start gap-10 my-8 border-[0.125rem] border-bg-secondary-1 rounded-2xl py-12 px-8 sm:px-12'
						method='POST'
						onSubmit={submitForm.mutate}
					>
						<input type='hidden' name='_template' value='box' />
						<input type='text' name='_honey' style={{ display: 'none' }} />
						{/* <input type="hidden" name="_next" value="https://yourdomain.co/thanks.html" /> */}
						<div className='w-full'>
							<h4 className='pb-4'>Country</h4>
							<CountryDropdown
								classes='w-full bg-transparent outline-none transition-all duration-150 border-[0.125rem] border-slate-500 focus:border-slate-700 rounded-md px-3 py-2'
								value={formValues.countryCode}
								onChange={(value) =>
									setFormValues((oldValue) => {
										return {
											...oldValue,
											countryCode: value
										};
									})
								}
							/>
						</div>
						<FormInput
							spanTitleProps={{ children: 'Name', className: 'capitalize' }}
							labelContainerProps={{ className: 'w-full gap-2' }}
							placeholder='Your name'
							values={formValues}
							setValues={setFormValues}
							name='fullName'
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
							name='subject'
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
