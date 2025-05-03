import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

interface SalesData {
  id: string;
  total_amount: number;
  created_at: string;
  customers: {
    id: string;
    full_name: string;
  };
}

const AllSalesPage = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("sales")
    .select(
      `
    id,
    total_amount,
    created_at,
    customers ( id, full_name )
  `
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching sales data:", error);
    return (
      <div className="p-6 space-y-6">
        Error loading sales data {error.message}{" "}
      </div>
    );
  }

  const salesData = data as unknown as SalesData[];
  return (
    <div className="p-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {salesData?.map((sale) => {
            return (
              <TableRow key={sale.id}>
                <TableCell>{sale.customers.full_name}</TableCell>

                <TableCell>₦{sale.total_amount}</TableCell>
                <TableCell>
                  {new Date(sale.created_at).toLocaleDateString()}
                </TableCell>
                <TableCell className="flex items-center gap-2 justify-end">
                  <Button variant="destructive" size="sm">
                    Delete
                  </Button>
                  <Link href={`/dashboard/sales/${sale.id}`}>
                    <Button size="sm">View</Button>
                  </Link>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AllSalesPage;
