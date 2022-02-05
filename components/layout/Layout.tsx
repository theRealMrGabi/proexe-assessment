import { FC } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Meta, ErrorUI } from "@components";

export const Layout: FC<MetaProps> = ({
	children,
	title,
	keywords,
	description,
}) => {
	return (
		<>
			<Meta title={title} keywords={keywords} description={description} />
			<main>
				<ErrorBoundary FallbackComponent={ErrorUI}>{children}</ErrorBoundary>
			</main>
		</>
	);
};
