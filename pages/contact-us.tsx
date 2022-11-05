import type { NextPage } from 'next';

import Button from '@components/shared/core/Button';
import FormInput from '@components/shared/core/FormInput';
import { useState } from 'react';

const ContactUsPage: NextPage = () => {
	const [formValues, setFormValues] = useState({
		name: '',
		email: '',
		subject: '',
		message: ''
	});

	return (
		<section className='bg-primary-1 p-8 sm:p-16'>
			<div className='max-w-[800px] mx-auto'>
				<header className='flex flex-col gap-4 text-text-primary-1'>
					<h1 className='text-h2 font-bold'>Contact us</h1>
					<p className='text-h3'>We&apos;d love to hear from you!</p>
				</header>

				<form className='flex flex-col items-center sm:items-start gap-16 my-8 border-[0.125rem] border-bg-secondary-1 rounded-2xl p-12'>
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
						name='subject'
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
	);
};

export default ContactUsPage;
