// app/(dashboard)/sales/[salesId]/page.tsx

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent } from "@/components/ui/card";
import { createClient } from "@/utils/supabase/server";

export default async function SingleSalePage({
  params,
}: {
  params: { salesId: string };
}) {
  const supabase = await createClient();

  const salesId = params.salesId;

  // Fetch the sale and related items
  interface SingleSaleData {
    id: string;
    total_amount: number;
    created_at: string;
    customers: {
      full_name: string;
    };
    sale_items: {
      id: string;
      quantity: number;
      products: {
        name: string;
        price: number;
      };
    }[];
  }
  const { data, error } = await supabase
    .from("sales")
    .select(
      `
      id,
      total_amount,
      created_at,
      customers ( full_name ),
      sale_items (
        id,
        quantity,
        products (
          name,
          price
        )
      )
    `
    )
    .eq("id", salesId)
    .single();

  const sale = data as unknown as SingleSaleData;

  if (!sale || error) {
    return (
      <div>
        <h1 className="text-2xl font-bold">Sale Not Found</h1>
        <p className="text-red-500">Error: {error?.message}</p>
        <p className="text-gray-500">Sale ID: {salesId}</p>
        <p className="text-gray-500">Please check the sale ID and try again.</p>
      </div>
    );
  }
  console.log("Sale data:", sale); // Debugging line to check the fetched sale data
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Sale Detail</h1>

      <Card>
        <CardContent className="p-4 space-y-2">
          <p>
            <strong>Customer:</strong> {sale.customers?.full_name}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {new Date(sale.created_at).toLocaleDateString()}
          </p>
          <p>
            <strong>Total:</strong> ₦{sale.total_amount.toLocaleString()}
          </p>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-semibold mb-2">Sale Items</h2>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sale.sale_items.map((item) => {
              const { products, quantity } = item;
              const price = products?.price || 0;
              const name = products?.name || "Unknown";
              return (
                <TableRow key={item.id}>
                  <TableCell>{name}</TableCell>
                  <TableCell>{quantity}</TableCell>
                  <TableCell>₦{price.toLocaleString()}</TableCell>
                  <TableCell>₦{(price * quantity).toLocaleString()}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
