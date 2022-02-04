import * as Yup from "yup";

export const AddUserSchema = () => {
	return Yup.object().shape({
		email: Yup.string()
			.email("A valid email address is required")
			.required("A valid email address is required"),
		name: Yup.string()
			.required("Name is required")
			.min(3, "Name should be minimum of 3 characters"),
		username: Yup.string()
			.required("Username is required")
			.min(3, "Username should be minimum of 3 characters"),
		city: Yup.string()
			.required("City is required")
			.min(3, "City should be minimum of 3 characters"),
	});
};

export const EditUserSchema = () => {
	return Yup.object().shape({
		email: Yup.string()
			.email("A valid email address is required")
			.required("A valid email address is required"),
		name: Yup.string()
			.required("Name is required")
			.min(3, "Name should be minimum of 3 characters"),
	});
};
