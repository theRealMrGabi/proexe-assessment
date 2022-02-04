import { FC, useMemo } from "react";
import { useTable } from "react-table";
import styles from "./Table.module.scss";

interface TableProps {
	header: {
		Header: string;
		accessor: string;
		component?: (item: any) => JSX.Element;
	}[];
	tableData?: any;
}

export const Table: FC<TableProps> = ({ header, tableData }) => {
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
					<tbody className="bg-base-white-200" {...getTableBodyProps()}>
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
			</table>
		</div>
	);
};
