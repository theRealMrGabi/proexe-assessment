import { FC } from "react";
import Head from "next/head";

export const Meta: FC<MetaProps> = ({ title, keywords, description }) => {
	const name = "Proexe assessment";
	const websiteURL = "https://proexe-assessment.netlify.app/";
	const metaContent = "";

	return (
		<Head>
			<meta data-charset="UTF-8" />
			<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			<meta name="title" content={name} />
			<meta name="author" content={name} />
			<meta name="theme-color" content="#b8c1ec" />
			<meta name="pagename" content={metaContent} />
			<meta name="url" content={websiteURL} />
			<meta itemProp="name" content={name} />
			<meta property="og:site_name" content={name} />
			<meta property="og:type" content="website" />
			<meta property="og:url" content={websiteURL} />
			<meta property="og:title" content={name} />
			<meta property="og:description" content={metaContent} />
			<meta property="twitter:card" content="summary" />
			<meta property="twitter:url" content={websiteURL} />
			<meta property="twitter:title" content={name} />
			<meta property="twitter:description" content="Rocket Global" />
			<meta property="twitter:image:alt" content={`A picture of ${name}`} />
			<meta name="keywords" content={keywords} />
			<meta name="description" content={description} />
			<link rel="icon" href="/favicon.ico" />
			<title>{title}</title>
		</Head>
	);
};

Meta.defaultProps = {
	title: "Proexe assessment",
	keywords: "",
	description: "",
};
