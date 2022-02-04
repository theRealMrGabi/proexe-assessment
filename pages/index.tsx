import type { NextPage } from "next";
import { useEffect, useState, useMemo } from "react";
import { DialogOverlay, DialogContent } from "@reach/dialog";
import { GetUsers, CreateUser } from "@redux/actions";
import { useDispatch, useSelector } from "react-redux";
import {
	Button,
	Table,
	UserTableHeader,
	AddUserForm,
	Layout,
} from "@components";
import { AppState } from "@redux/reducers";
import styles from "../styles/modal.module.scss";

const Home: NextPage = () => {
	const [modal, setModal] = useState<boolean>(false);

	const dispatch = useDispatch();
	const getUsers = GetUsers();
	const createUser = CreateUser();

	const openModal = () => setModal(true);
	const closeModal = () => setModal(false);

	const { users } = useSelector((state: AppState) => state.user);

	const memoisedUsers: UserProps[] = useMemo(() => users, [users]);

	useEffect(() => {
		dispatch(getUsers());
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// const handleFormSubmit = (data: object) => createUser(data);

	// const handleFormSubmit = (data: object) => {
	// 	// console.log("action submit--->");
	// 	// console.log("form data -->", data);

	// 	dispatch(createUser(data, () => closeModal()));
	// };

	return (
		<Layout>
			<div className="p-5">
				<h3 className="font-bold text-xl md:text-3xl">Dashboard</h3>

				<div className="shadow-form rounded-md mt-6">
					<div className="p-4 flex justify-between border-b border-gray-200 items-center">
						<h4 className="font-medium text-lg">User List</h4>
						<div>
							<Button
								bgColor="blue"
								text="Add User"
								onClick={() => openModal()}
							/>
						</div>
					</div>

					<div className="p-4">
						{/* {users?.length > 0 ? ( */}
						{memoisedUsers?.length > 0 ? (
							<Table
								header={UserTableHeader}
								tableData={[...users]?.map((item: UserProps, i) => ({
									...item,
									sn: i + 1,
									city: item.city,
									edit: {
										id: item?.id,
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
							<div className="text-center text-lg font-medium">
								No data available
							</div>
						)}
					</div>
				</div>

				<DialogOverlay isOpen={modal} onDismiss={closeModal}>
					<DialogContent className={styles.formModal} aria-label="modal">
						<AddUserForm
							closeModal={closeModal}
							// onFormSubmit={handleFormSubmit}
						/>
					</DialogContent>
				</DialogOverlay>
			</div>
		</Layout>
	);
};

export default Home;
