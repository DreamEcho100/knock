import type { VariantProps } from 'class-variance-authority';
import type {
	Dispatch,
	HTMLAttributes,
	InputHTMLAttributes,
	TextareaHTMLAttributes,
	SetStateAction
} from 'react';

import { useId } from 'react';
import { cva } from 'class-variance-authority';

type TName<T> = keyof T;

type IProps<T> = {
	values: T;
	handleOnChange?: (prev: T) => T;
	setValues: Dispatch<SetStateAction<T>>;
	name: TName<T>;
	spanTitleProps?: HTMLAttributes<HTMLSpanElement>;
	labelContainerProps?: HTMLAttributes<HTMLSpanElement>;
} & (TFormFieldInput | TFormFieldTextarea);

type TFormFieldInput = InputHTMLAttributes<HTMLInputElement> & {
	isATextarea?: false;
	isAComboBox?: false;
	variants?: VariantProps<typeof handleInputVariants>;
};

type TFormFieldTextarea = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	isATextarea: true;
	isAComboBox?: false;
	variants?: VariantProps<typeof handleInputVariants>;
};

const TextareaField = ({ isATextarea, ...props }: TFormFieldTextarea) => {
	return <textarea rows={7.5} {...props} />;
};

const handleInputVariants = cva(
	['w-full bg-transparent outline-none', 'transition-all duration-150'],
	{
		variants: {
			border: {
				b: ['border-b border-b-slate-500', 'focus:border-b-slate-700'],
				all: ['border-[0.125rem] border-slate-500', 'focus:border-slate-700']
			},
			rounded: {
				sm: 'rounded-sm',
				md: 'rounded-md'
			},
			p: {
				sm: 'px-3 py-2',
				md: 'px-4 py-3'
			}
		},
		defaultVariants: {
			border: 'b',
			p: 'md'
		}
	}
);

const FormInput = <T,>({
	name,
	setValues,
	value,
	values,
	handleOnChange,
	labelContainerProps = {},
	spanTitleProps,
	variants,
	...inputProps
}: IProps<T>) => {
	const formInputId = useId();

	return (
		<label
			{...labelContainerProps}
			htmlFor={`email-${formInputId}`}
			className={`flex flex-col ${labelContainerProps.className || ''}`}
		>
			{spanTitleProps && <span {...spanTitleProps} />}
			{inputProps.isATextarea ? (
				<TextareaField
					// name={name}
					onChange={(event) => {
						setValues(
							handleOnChange ||
								((prev) => ({
									...prev,
									[name]: event.target.value
								}))
						);
					}}
					name={name.toString()}
					value={(values[name] as string | undefined) || ''}
					id={`email-${formInputId}`}
					className={handleInputVariants(variants)}
					{...inputProps}
				/>
			) : (
				<input
					{...inputProps}
					name={name.toString()}
					onChange={(event) => {
						setValues(
							handleOnChange ||
								((prev) => ({
									...prev,
									[name]:
										event.target.type === 'date'
											? event.target.valueAsDate
											: event.target.type === 'number'
											? event.target.valueAsNumber
											: event.target.value
								}))
						);
					}}
					value={(values[name] as string | undefined) || ''}
					id={`email-${formInputId}`}
					className={handleInputVariants(variants)}
				/>
			)}
		</label>
	);
};

export default FormInput;
