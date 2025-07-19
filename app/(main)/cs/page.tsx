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
import { topics } from "@/tooics"
import Link from "next/link"


   
export default  function CS(){
  return (
    <div className= "max-w-xl border  mt-[40px]  mx-auto p-2">
           <div className = "flex  justify-center">
           <Table>
      <TableCaption>List of Contents</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">Topics</TableHead>
        
          <TableHead className="text-center">Go to</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {topics.map((t) => (
            <>
            {
                t.published === true &&  <TableRow key={t.invoice}>
                <TableCell className="font-medium hover:cursor-pointer">{t.invoice}</TableCell>
                
                <TableCell className="text-center hover:cursor-pointer hover:underline hover:text-blue-500">
                    <Link href={t.url}>
                    {t.totalAmount}
                    </Link>
                    </TableCell>
              </TableRow>
            }
            
            </>
         
        ))}
      </TableBody>
     
    </Table>
           </div>
    </div>
  )
}