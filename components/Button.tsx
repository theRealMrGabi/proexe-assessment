import { FC } from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	text: string;
	loading?: boolean;
	bgColor?: "blue" | "green" | "orange" | "red" | "white";
}

export const Button: FC<ButtonProps> = ({
	text,
	loading,
	type = "submit",
	className,
	bgColor = "blue",
	...rest
}) => {
	return (
		<button
			{...rest}
			disabled={loading || rest.disabled}
			className={`${className} 
			${loading && "opacity-40 cursor-not-allowed"}
			${bgColor === "blue" && `bg-sky-600 text-white`} 
			${bgColor === "orange" && `bg-orange-400 text-white`} 
			${bgColor === "red" && `bg-red-500 text-white`} 
			${bgColor === "green" && `bg-green-500 text-white`} 
			${bgColor === "white" && `border border-red-500 bg-white text-red-500`} 
			w-full rounded py-2 px-6 text-sm  font-medium`}
		>
			{text}
		</button>
	);
};
