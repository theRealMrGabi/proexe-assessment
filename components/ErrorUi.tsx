import { FC } from "react";
import Link from "next/link";

export const ErrorUI: FC = () => {
	return (
		<div>
			<h1>Error occured !!!</h1>

			<Link href="/">
				<a>Go back Home</a>
			</Link>
		</div>
	);
};
