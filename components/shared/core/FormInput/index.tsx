import {
	Dispatch,
	HTMLAttributes,
	InputHTMLAttributes,
	TextareaHTMLAttributes,
	SetStateAction,
	useId
} from 'react';

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
};

type TFormFieldTextarea = TextareaHTMLAttributes<HTMLTextAreaElement> & {
	isATextarea: true;
	isAComboBox?: false;
};

const TextareaField = ({ isATextarea, ...props }: TFormFieldTextarea) => {
	return <textarea rows={7.5} {...props} />;
};

const FormInput = <T,>({
	name,
	setValues,
	value,
	values,
	handleOnChange,
	labelContainerProps = {},
	spanTitleProps,
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
					value={(values[name] as string | undefined) || ''}
					id={`email-${formInputId}`}
					className='w-full bg-transparent px-4 py-3 border-b border-b-slate-500 outline-none
					transition-all duration-150
					focus:border-b-slate-700'
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
					className='w-full bg-transparent px-4 py-3 border-b border-b-slate-500 outline-none
					transition-all duration-150
					focus:border-b-slate-700'
				/>
			)}
		</label>
	);
};

export default FormInput;
