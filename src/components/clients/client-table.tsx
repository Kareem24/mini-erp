"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EllipsisVertical } from "lucide-react";
import TablePopover from "../table-popover";
// import { useGetClients } from "@/hooks/use-get-clients";

export function ClientTable({
  data,
}: {
  data: {
    id: number;
    full_name: string;
    email: string;
    phone_number: string;
    status: string;
    created_at: string;
  }[];
}) {
  // const { data: clients, isLoading, error } = useGetClients();

  // if (isLoading) return <div>Loading...</div>;
  // if (error) return <div>Error fetching clients</div>;
  // if (!data) return <div>No clients found</div>;
  return (
    <>
      <Table>
        {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead className="">status</TableHead>
            <TableHead className="">Created At</TableHead>
            <TableHead className="">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {clients?.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">{client.full_name}</TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.phone_number}</TableCell>
              <TableCell className="">
                {client.status ? "active" : "inactive"}
              </TableCell>
              <TableCell className="">
                {new Date(client.created_at).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <TablePopover>
                  <span>
                    <EllipsisVertical />
                  </span>
                </TablePopover>
              </TableCell>
            </TableRow>
          ))} */}
        </TableBody>
      </Table>
    </>
  );
}
