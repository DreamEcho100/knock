import Button from '@components/shared/core/Button';
import FormInput from '@components/shared/core/FormInput';
import { IKnockPluginBoutiqueProps } from '@pages/boutique/[pluginsBoutique]';
import { useMutation } from '@tanstack/react-query';
import type { IGenericErrorResponse } from 'types';
import Head from 'next/head';
import Image from 'next/image';
import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import FormField from '@components/shared/core/FieldForm';

const KnockScreen = ({ knockPluginBoutique }: IKnockPluginBoutiqueProps) => {
	const [openRedeem, setOpenRedeem] = useState(false);
	const [formValues, setFormValues] = useState({
		redeemCode: '',
		firstName: '',
		lastName: '',
		email: ''
	});

	const redeemMutation = useMutation<
		{
			success: true;
			message: string;
			response: {};
		},
		IGenericErrorResponse,
		FormEvent
	>({
		mutationFn: (event) => {
			event.preventDefault();

			return fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_RELATIVE_PATH}/clients/redeem-code`,
				{
					method: 'POST',
					headers: { 'Content-type': 'application/json' },
					body: JSON.stringify({
						data: {
							customer_code: formValues.redeemCode,
							product_id: knockPluginBoutique.id.split('/')[4],
							variant_id: knockPluginBoutique.variants[0].id.split('/')[4]
						}
					})
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
			if (result) {
				setOpenRedeem((prev) => !prev);
			}
			setTimeout(() => toast(result.message), 0);
		},
		onError: (error) => {
			setTimeout(() => toast(error.message, { type: 'error' }), 0);
		}
	});

	const createOrderRedeem = useMutation<
		{
			success: true;
			message: string;
			response: {};
		},
		IGenericErrorResponse,
		FormEvent
	>({
		mutationFn: (event) => {
			event.preventDefault();

			return fetch(
				`${process.env.NEXT_PUBLIC_BACKEND_RELATIVE_PATH}/clients/create-redeem-order`,
				{
					method: 'POST',
					headers: { 'Content-type': 'application/json' },
					body: JSON.stringify({
						...formValues,
						price: Number(knockPluginBoutique.variants[0].price.amount),
						variantId: knockPluginBoutique.variants[0].id.split('/')[4],
						productId: knockPluginBoutique.id.split('/')[4]
					})
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
			if (result) {
				setOpenRedeem((prev) => !prev);
			}
			setTimeout(() => toast(result.message), 0);
		},
		onError: (error) => {
			setTimeout(() => toast(error.message, { type: 'error' }), 0);
		}
	});

	return (
		<>
			<Head>
				<title>KNOCK Clipper | PLUGINS THAT KNOCK</title>
				<meta
					name='description'
					content="This is the only soft clipper you'll ever need. KNOCK Clipper is a premium quality, user adjustable hard &amp; soft clipper designed by DECAP. It is the CLIP module from his acclaimed plugin, KNOCK. It is inspired by the signature sound of his popular drum kit series DRUMS THAT KNOCK, which has helped shaped the sonics"
				/>
			</Head>

			<section className='relative flex items-center justify-center  flex-col max-w-[1200px]  m-auto'>
				<div className='my-[80px]'>
					<h2 className='text-4xl font-bold'>{knockPluginBoutique.title}</h2>
				</div>
				<div className='max-w-[500px] '>
					<Image
						width={knockPluginBoutique.images[0].width}
						height={knockPluginBoutique.images[0].height}
						alt={knockPluginBoutique.title}
						src={knockPluginBoutique.images[0].src}
					/>
				</div>
				{openRedeem ? (
					<form
						onSubmit={createOrderRedeem.mutate}
						className={
							'my-[80px]  w-[80%] h-[350px] border rounded-2xl bg-black '
						}
					>
						<div className='flex flex-col p-5 gap-5'>
							<FormField
								values={formValues}
								setValues={setFormValues}
								name='firstName'
								placeholder='*first name'
								autoComplete='first-name'
								minLength={3}
							/>
							<FormField
								values={formValues}
								setValues={setFormValues}
								name='lastName'
								placeholder='*last name'
								autoComplete='last-name'
								minLength={3}
							/>
							<FormField
								values={formValues}
								setValues={setFormValues}
								name='email'
								type='email'
								placeholder='*email'
								autoComplete='email'
								minLength={3}
							/>
							<FormInput
								placeholder='Your Access Code'
								values={formValues}
								setValues={setFormValues}
								name='redeemCode'
								required
								minLength={3}
							/>
						</div>
						<div className='flex items-center justify-center p-2 '>
							<Button>REDEEM</Button>
						</div>
					</form>
				) : (
					<form
						onSubmit={redeemMutation.mutate}
						className='flex gap-3 items-center my-[80px]'
					>
						<FormInput
							placeholder='Your Access Code'
							values={formValues}
							setValues={setFormValues}
							name='redeemCode'
							required
							minLength={3}
							variants={{ border: 'all', rounded: 'md', p: 'sm' }}
						/>
						<Button className=''> REDEEM </Button>
					</form>
				)}
			</section>
		</>
	);
};

export default KnockScreen;
