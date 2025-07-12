import { Row } from "@tanstack/react-table";

export const globalFilterFn = <TData extends { companyName: string; jobTitle: string }>(
  row: Row<TData>,
  columnId: string,
  filterValue: string
) => {
  const search = filterValue.toLowerCase();
  return (
    row.original.companyName.toLowerCase().includes(search) ||
    row.original.jobTitle.toLowerCase().includes(search)
  );
};
