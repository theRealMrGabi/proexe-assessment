import { FC, useMemo } from "react";
import { LoadingSpinner } from "@components";
import styles from "./Table.module.scss";
import { useTable } from "react-table";

interface TableProps {
	header: {
		Header: string;
		accessor: string;
		component?: (item: any) => JSX.Element;
	}[];
	tableData?: any;
	loading?: boolean;
	error?: null;
}

export const Table: FC<TableProps> = ({
	header,
	tableData,
	loading,
	error,
}) => {
	const columns: any = useMemo(() => header, [header]);
	const data = useMemo(() => tableData, [tableData]);

	const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
		useTable({
			columns,
			data,
		});
	return (
		<div
			className={`${styles.tableCont} overflow-x-scroll border border-gray-300`}
		>
			<table
				{...getTableProps()}
				className={styles.table}
				data-testid="table-component"
			>
				<thead>
					{headerGroups.map((headerGroup, i) => (
						<tr {...headerGroup.getHeaderGroupProps()} key={i}>
							{headerGroup.headers.map((column, i) => (
								<th {...column.getHeaderProps()} key={i}>
									{column.render("Header")}
								</th>
							))}
						</tr>
					))}
				</thead>

				{Boolean(data?.length) && (
					<tbody className="t-body bg-base-white-200" {...getTableBodyProps()}>
						{rows.map((row, i) => {
							prepareRow(row);
							return (
								<tr {...row.getRowProps()} key={i}>
									{row.cells.map((cell, i) => {
										return (
											<td {...cell.getCellProps()} key={i}>
												{cell.render("Cell")}
											</td>
										);
									})}
								</tr>
							);
						})}
					</tbody>
				)}

				{!Boolean(data?.length) && (
					<tbody className="w-full h-full">
						<tr>
							<td>
								{loading ? (
									<div className="flex justify-center items-center">
										<LoadingSpinner />
									</div>
								) : (
									<div className="text-center font-bold text-xl">
										No Data Available
									</div>
								)}
							</td>
						</tr>

						{error && <div className="items-center">{error}</div>}
					</tbody>
				)}
			</table>
		</div>
	);
};
