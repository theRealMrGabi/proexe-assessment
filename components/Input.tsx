import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	name: string;
	label?: string;
	errorMessage?: string;
}

// eslint-disable-next-line react/display-name
export const Input = forwardRef<HTMLInputElement, InputProps>(
	({ name, label, prefix, errorMessage, ...rest }, ref) => {
		return (
			<div className="w-full bg-transparent mb-4">
				<label
					htmlFor={name}
					className="text-black text-xs font-medium capitalize"
				>
					{label}
				</label>

				<div className="flex flex-row items-center pt-1">
					<input
						{...rest}
						name={name}
						ref={ref}
						className="border w-full border-black rounded focus:outline-none p-3 bg-white placeholder:text-base-gray-100 text-sm"
					/>
				</div>

				{errorMessage && (
					<p className="text-red-600 text-xs pt-1">{errorMessage}</p>
				)}
			</div>
		);
	}
);
