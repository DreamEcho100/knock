import {
	Dispatch,
	HTMLAttributes,
	InputHTMLAttributes,
	SetStateAction,
	useId
} from 'react';

type TName<T> = keyof T;

interface IProps<T>
	extends Omit<InputHTMLAttributes<HTMLInputElement>, 'name'> {
	values: T;
	handleOnChange?: (prev: T) => T;
	setValues: Dispatch<SetStateAction<T>>;
	name: TName<T>;
	// value: T[TName<T>]
	spanTitleProps?: HTMLAttributes<HTMLSpanElement>;
	labelContainerProps?: HTMLAttributes<HTMLSpanElement>;
}

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
		</label>
	);
};

export default FormInput;
