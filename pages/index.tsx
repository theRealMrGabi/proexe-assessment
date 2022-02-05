import type { NextPage } from "next";
import { useEffect, useState, useCallback } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import {
	GetUsers,
	CreateUser,
	SetUserToEdit,
	EditUser,
	SetModalType,
	ClearSelectedUser,
} from "@redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {
	Button,
	Table,
	UserTableHeader,
	AddUserForm,
	Layout,
	LoadingSpinner,
	Select,
} from "@components";
import { AppState } from "@redux/reducers";
import styles from "../styles/modal.module.scss";

const Home: NextPage = () => {
	const { users, modalType, loading } = useSelector(
		(state: AppState) => state.user
	);
	const [modal, setModal] = useState<boolean>(false);
	const [localUsers, setLocalUsers] = useState<any>([]);
	const [filterValue, setfilterValue] = useState("id");

	const dispatch = useDispatch();
	const getUsers = GetUsers();
	const createUser = CreateUser();
	const setUserToEdit = SetUserToEdit();
	const editUser = EditUser();
	const setModalType = SetModalType();
	const clearSelectedUser = ClearSelectedUser();

	const openModal = () => setModal(true);
	const closeModal = () => {
		setModal(false);
		dispatch(clearSelectedUser());
	};

	const filterUsers = useCallback(() => {
		const sort = [...localUsers].sort((a: any, b: any) =>
			a[filterValue] > b[filterValue] ? 1 : -1
		);
		return setLocalUsers(sort);
	}, [localUsers, filterValue]);

	useEffect(() => {
		dispatch(getUsers());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		setLocalUsers(users);
	}, [users]);

	useEffect(() => {
		filterUsers();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filterValue]);

	const handleFormSubmit = (data: UserProps) => {
		modalType === "Add New User"
			? dispatch(createUser(data))
			: dispatch(editUser(data));
	};

	return (
		<Layout>
			<div className="p-5">
				<h3 className="font-bold text-xl md:text-3xl">Dashboard</h3>

				<div className="shadow-form rounded-md mt-6">
					<div className="p-4 flex flex-col md:flex-row justify-between border-b border-gray-200 items-start md:items-center gap-y-3 md:gap-y-0">
						<h4 className="font-medium text-lg">User List</h4>

						<div className="flex gap-x-4 items-center">
							<div className="">
								<Select
									placeholder="Filter"
									options={[
										{ value: "id", label: "All" },
										{ value: "username", label: "Username" },
										{ value: "name", label: "Name" },
										{ value: "email", label: "Email" },
										{ value: "city", label: "City" },
										{ value: "id", label: "ID" },
									]}
									onChange={({ value }: any) => setfilterValue(value)}
								/>
							</div>
							<div>
								<Button
									bgColor="blue"
									text="Add User"
									onClick={() => {
										openModal();
										dispatch(setModalType("Add New User"));
									}}
								/>
							</div>
						</div>
					</div>

					<div className="p-4">
						{localUsers?.length > 0 ? (
							<Table
								header={UserTableHeader}
								tableData={localUsers?.map((item: UserProps, i: number) => ({
									...item,
									sn: i + 1,
									city: item.city,
									edit: {
										id: item?.id,
										setUser: () => dispatch(setUserToEdit(item)),
										modalType: () => dispatch(setModalType("Edit User")),
										editAction: () => {
											openModal();
										},
									},
									delete: {
										id: item?.id,
									},
								}))}
							/>
						) : (
							<>
								{loading ? (
									<div className="grid place-content-center min-h-[40vh]">
										<LoadingSpinner />
									</div>
								) : !localUsers.length ? (
									<div className="grid place-content-center min-h-[40vh] text-lg font-medium">
										No Data Available
									</div>
								) : null}
							</>
						)}
					</div>
				</div>

				<DialogOverlay isOpen={modal} onDismiss={closeModal}>
					<DialogContent className={styles.formModal} aria-label="modal">
						<AddUserForm
							closeModal={closeModal}
							onFormSubmit={handleFormSubmit}
						/>
					</DialogContent>
				</DialogOverlay>
			</div>
		</Layout>
	);
};

export default Home;
