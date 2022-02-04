import { useState } from "react";
import { Button, DeleteUserForm } from "@components";
import { DeleteUser } from "@redux/actions";
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
					onClick={async () => {
						value.modalType();
						await value.setUser();
						await value.editAction();
					}}
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
