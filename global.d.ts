interface MetaProps {
	title?: string;
	keywords?: string;
	description?: string;
}

interface UserProps {
	email: string;
	id: number;
	name: string;
	username: string;
	city: string;
	// phone: string;
	// website: string;
	// address: {
	// 	city: string;
	// 	street: string;
	// 	suite: string;
	// 	zipcode: string;
	// 	geo: {
	// 		lat: string;
	// 		lng: string;
	// 	};
	// };
	// company: {
	// 	bs: string;
	// 	name: string;
	// 	catchPhrase: string;
	// };
}

interface UserReducerType {
	loading: boolean;
	users: UserProps[];
	error: null;
}

interface FormModalProps {
	closeModal: () => void;
	// onFormSubmit: (data: object) => void;
	isLoading?: boolean;
}

interface DeleteModalProps {
	closeModal: () => void;
	onFormSubmit: () => void;
}
