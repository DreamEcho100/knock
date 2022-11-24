import React, { useState } from 'react';
import classes from '../../../styles/accountPages.module.scss';
import FormField from '@components/shared/core/FieldForm';
import Button from '@components/shared/core/Button';
import { toast } from 'react-toastify';
import axios from 'axios';

const getAppApiPath = () =>
	typeof window === 'undefined'
		? // !!!
		  process.env.NEXT_PUBLIC_VERCEL_URL
			? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}/api`
			: process.env.NEXT_PUBLIC_BACKEND_ABSOLUTE_PATH
		: process.env.NEXT_PUBLIC_BACKEND_RELATIVE_PATH;

const ResetPage = () => {
	const [formValues, setValues] = useState({
		password: '',
		confirmPassword: ''
	});

	const resetAccount = async (e) => {
		e.preventDefault();

		const resetUrl = window.location.href;

		if (formValues.confirmPassword !== formValues.password) {
			return toast.warning('Confirm password is not the same as password');
		}

		const data = {
			resetUrl,
			password: formValues.password
		};

		try {
			const response = await axios.post(
				`${getAppApiPath()}/clients/reset-password`,
				data
			);
			if (response) {
				return toast.success(response.data.message);
			}
		} catch (error) {
			if (error.response.data) {
				return toast.warn(error.response.data.message);
			}
		}
	};

	return (
		<section className={classes.accountPageSection}>
			<div className={classes.accountPageContainer}>
				<form
					onSubmit={resetAccount}
					className={classes.accountPageContainerInputs}
				>
					<h4>RESET PASSWORD</h4>
					<p>Enter a new password for :</p>
					<FormField
						values={formValues.password}
						setValues={setValues}
						name='password'
						type='password'
						placeholder='*password'
						autoComplete='password'
						minLength={3}
					/>
					<FormField
						values={formValues.confirmPassword}
						setValues={setValues}
						name='confirmPassword'
						type='password'
						placeholder='*confirm password'
						autoComplete='confirm password'
						minLength={3}
					/>
					<Button>RESET</Button>
				</form>
			</div>
		</section>
	);
};

export default ResetPage;
