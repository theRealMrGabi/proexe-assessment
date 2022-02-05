import { FC } from "react";
import RSelect from "react-select";

interface SelectProps {
	options: {
		value: string;
		label: string;
	}[];
	onChange?: ({ value }: any) => void;
	placeholder?: string;
	height?: string;
	label?: string;
	name?: string;
}

export const Select: FC<SelectProps> = ({
	options,
	onChange,
	placeholder,
	height,
	label,
	name,
	...rest
}) => {
	const styles = {
		control: (provided: any, state: any) => ({
			...provided,
			borderRadius: "4px",
			height: height ?? "1.5rem",
			border: "1px solid #000000",
			hover: "none",
			boxShadow: 0,
			"&:hover": {
				border: "1px solid #000000",
			},
			color: "#091524",
			padding: "0 0.5rem",
			fontSize: "0.875rem",
		}),
		indicatorSeparator: (provided: any, state: any) => ({
			...provided,
			display: "none",
		}),
		dropdownIndicator: (provided: any, state: any) => ({
			...provided,
			color: "#000000",
			"&:hover": {
				color: "#000000",
			},
		}),
		placeholder: (provided: any, state: any) => ({
			...provided,
			color: "#091524",
		}),
		option: (provided: any, state: any) => ({
			...provided,
			fontSize: "0.75rem",
		}),
	};

	return (
		<div>
			<label
				className="text-black text-xs font-medium capitalize"
				htmlFor={name}
			>
				{label}
			</label>
			<RSelect
				{...rest}
				placeholder={placeholder}
				onChange={onChange}
				options={options}
				styles={styles}
			/>
		</div>
	);
};
