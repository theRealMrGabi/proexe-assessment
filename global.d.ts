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
}

type modalType = "Add New User" | "Edit User";

interface UserReducerType {
	loading: boolean;
	users: UserProps[];
	error: null;
	user: object;
	modalType: modalType;
}

interface FormModalProps {
	closeModal: () => void;
	onFormSubmit: (data: UserProps) => void;
	isLoading?: boolean;
}

interface DeleteModalProps {
	closeModal: () => void;
	onFormSubmit: () => void;
}
