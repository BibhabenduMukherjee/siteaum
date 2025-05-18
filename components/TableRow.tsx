"use client";
import {
  TableRow,
  TableCell,
} from "@/components/ui/table";

export const TableRoww = ({ row }: any) => {
  return (
    <TableRow className="">
      {row.cells.map((cell: any, i: number) => (
        <TableCell key={i} className="px-4 py-3 border border-gray-200">
          {cell}
        </TableCell>
      ))}
    </TableRow>
  );
};
