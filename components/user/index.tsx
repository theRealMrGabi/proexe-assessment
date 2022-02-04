import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "@components";
import { AddUserSchema } from "@validations";
import { DeleteUser, CreateUser } from "@redux/actions";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import styles from "../../styles/modal.module.scss";

export const UserTableHeader = [
	{
		Header: "S/N",
		accessor: "sn",
	},
	{
		Header: "ID",
		accessor: "id",
	},
	{ Header: "Name", accessor: "name" },
	{ Header: "Username", accessor: "username" },
	{ Header: "Email", accessor: "email" },
	{ Header: "City", accessor: "city" },
	{
		Header: "Edit",
		accessor: "edit",
		Cell: ({ value }: any) => (
			<div className="underline">
				<Button
					text="Edit"
					bgColor="orange"
					onClick={() => value.editAction()}
				/>
			</div>
		),
	},
	{
		Header: "Delete",
		accessor: "delete",
		Cell: ({ value }: any) => {
			const deleteUser = DeleteUser();
			const [modal, setModal] = useState<boolean>(false);
			const openModal = () => setModal(true);
			const closeModal = () => setModal(false);

			return (
				<div className="mr-4">
					<Button text="Delete" bgColor="red" onClick={() => openModal()} />

					<DialogOverlay isOpen={modal} onDismiss={closeModal}>
						<DialogContent className={styles.formModal} aria-label="modal">
							<DeleteUserForm
								closeModal={closeModal}
								onFormSubmit={() => {
									deleteUser(value.id);
									closeModal();
								}}
							/>
						</DialogContent>
					</DialogOverlay>
				</div>
			);
		},
	},
];

export const AddUserForm: FC<FormModalProps> = ({
	closeModal,
	// onFormSubmit,
	isLoading,
}) => {
	const createUser = CreateUser();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({ resolver: yupResolver(AddUserSchema()) });

	// const onSubmit = handleSubmit((data) => onFormSubmit(data));
	const onSubmit = handleSubmit((data) => createUser(data));
	return (
		<div className="border border-gray-300 shadow-form rounded-lg">
			<div className="flex justify-between items-center border-b border-gray-300 p-4">
				<h5 className="font-medium text-lg">Add New User</h5>
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
							// onClick={() => onSubmit()}
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
