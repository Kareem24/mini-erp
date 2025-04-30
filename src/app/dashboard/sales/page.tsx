// app/(dashboard)/sales/page.tsx
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { createClient } from "@/utils/supabase/server";
import SalesForm from "@/components/sales/sales-form";

export default async function SalesPage() {
  const supabase = await createClient();

  // const { data: sales, error } = await supabase
  //   .from("sales")
  //   .select(
  //     `
  //     id,
  //     total_amount,
  //     created_at,
  //     customers ( name )
  //   `
  //   )
  //   .order("created_at", { ascending: false });
  // const supabase = createClient();

  const { data: customers } = await supabase
    .from("customers")
    .select("id, full_name");

  const { data: products } = await supabase
    .from("products")
    .select("id, name, price")
    .order("name", { ascending: true });

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Sales</h1>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>{"Unknown"}</TableCell>
            <TableCell>₦{100}</TableCell>
            <TableCell>{new Date("2025/4/5").toLocaleDateString()}</TableCell>
            <TableCell>
              <Button variant="destructive" size="sm">
                Delete
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <div>
        <SalesForm products={products || []} customers={customers || []} />
      </div>
    </div>
  );
}
