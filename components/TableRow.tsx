"use client"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
export const TableRoww = ({row}:any) => {
    return (
        <TableBody>
        <TableRow  className="P-2 border p-5 " >{
            row.cells.map(
                (cell:any) =>
          <TableCell key={cell} className = " border-black font-semibold">{cell}</TableCell>
        )
          }
        </TableRow>
        </TableBody>
        
      )
}