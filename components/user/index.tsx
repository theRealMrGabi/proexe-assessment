import { FC, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { Button, Input } from "@components";
import { AddUserSchema } from "@validations";
import { AppState } from "@redux/reducers";

export const AddUserForm: FC<FormModalProps> = ({
	closeModal,
	onFormSubmit,
	isLoading,
}) => {
	const { user, modalType } = useSelector((state: AppState) => state.user);

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
	} = useForm({ resolver: yupResolver(AddUserSchema()) });

	useEffect(() => {
		setValue("email", user.email);
		setValue("name", user.name);
		setValue("username", user.username);
		setValue("city", user.city);
		setValue("id", user.id);
	}, [user, setValue]);

	const onSubmit = handleSubmit((data: any) => {
		onFormSubmit(data);
		closeModal();
	});

	return (
		<div className="border border-gray-300 shadow-form rounded-lg">
			<div className="flex justify-between items-center border-b border-gray-300 p-4">
				<h5 className="font-medium text-lg">{modalType}</h5>
				<div className="cursor-pointer" onClick={() => closeModal()}>
					{" "}
					&#x2715;
				</div>
			</div>

			<form className="p-4" onSubmit={onSubmit}>
				<Input
					{...register("name")}
					placeholder="Enter name"
					label="Name"
					errorMessage={errors.name?.message}
				/>

				<Input
					{...register("email")}
					placeholder="Enter email address"
					label="Email"
					type="email"
					errorMessage={errors.email?.message}
				/>

				<Input
					{...register("username")}
					placeholder="Enter email address"
					label="Username"
					errorMessage={errors.username?.message}
				/>

				<Input
					{...register("city")}
					placeholder="Enter city of residence"
					label="City"
					errorMessage={errors.city?.message}
				/>

				<div className="w-full flex flex-col md:flex-row justify-end gap-x-4 gap-y-4 md:gap-y-0">
					<div>
						<Button
							text="Cancel"
							loading={isLoading}
							bgColor="white"
							onClick={() => closeModal()}
						/>
					</div>
					<div>
						<Button
							text="Submit"
							type="submit"
							bgColor="green"
							loading={isLoading}
							onClick={onSubmit}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

export const DeleteUserForm: FC<DeleteModalProps> = ({
	closeModal,
	onFormSubmit,
}) => {
	return (
		<div className="text-center">
			<h3 className="font-medium text-lg">Delete User</h3>
			<p className="text-sm">Are you sure you want to delete User?</p>

			<div className="flex justify-center gap-x-4 mt-10">
				<div>
					<Button text="Cancel" bgColor="white" onClick={() => closeModal()} />
				</div>
				<div>
					<Button text="Confirm" bgColor="red" onClick={() => onFormSubmit()} />
				</div>
			</div>
		</div>
	);
};

export * from "./TableHeader";
