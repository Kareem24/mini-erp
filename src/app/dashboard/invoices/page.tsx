import { createClient } from "@/utils/supabase/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Invoice {
  id: string;
  total_amount: number;
  status: string;
  due_date: string;
  issued_at: string;
  sales: {
    id: string;
    customers: {
      full_name: string;
    };
  };
}

export default async function InvoicesPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("invoices")
    .select(
      `
      id,
      total_amount,
      status,
      due_date,
      issued_at,
      sales (
        id,
        customers (
          full_name
        )
      )
    `
    )
    .order("issued_at", { ascending: false });

  const invoices = data as unknown as Invoice[];

  if (error)
    return (
      <div>
        <p className="text-red-500">Error: {error.message}</p>
        <p className="text-red-500">Please try again later.</p>
      </div>
    );

  if (!invoices || invoices.length === 0) {
    return (
      <div className="p-6 space-y-6">
        <h1 className="text-2xl font-bold">Invoices</h1>
        <p className="text-gray-500">No invoices found.</p>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Invoices</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Total</TableHead>
            {/* <TableHead>Due Date</TableHead> */}
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices?.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>
                {invoice.sales?.customers?.full_name ?? "N/A"}
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    invoice.status === "Paid"
                      ? "default"
                      : invoice.status === "Partial"
                      ? "outline"
                      : "destructive"
                  }
                  className={cn(
                    invoice.status === "Paid" && "bg-green-500 text-white"
                  )}
                >
                  {invoice.status}
                </Badge>
              </TableCell>
              <TableCell>₦{invoice.total_amount}</TableCell>
              {/* <TableCell>
                {new Date(invoice.due_date).toLocaleDateString()}
              </TableCell> */}
              <TableCell>
                {new Date(invoice.issued_at).toLocaleDateString()}
              </TableCell>
              <TableCell className="text-right">
                <Link href={`/dashboard/invoices/${invoice.id}`}>
                  <Button size="sm">View</Button>
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
