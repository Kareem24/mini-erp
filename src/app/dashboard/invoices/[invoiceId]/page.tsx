// app/(dashboard)/invoices/[invoiceId]/page.tsx
import PaidBtn from "@/components/invoices/paid-btn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { createClient } from "@/utils/supabase/server";

interface PageProps {
  params: { invoiceId: string };
}

interface SingleInvoiceData {
  id: string;
  status: string;
  total_amount: number;
  due_date: string | null;
  issued_at: string;
  sales: {
    id: string;
    customers: {
      id: string;
      full_name: string;
      email: string;
      phone: string;
    };
    sale_items: {
      id: string;
      quantity: number;
      products: {
        name: string;
        price: number;
      };
    }[];
  };
}

export default async function SingleInvoicePage({ params }: PageProps) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("invoices")
    .select(
      `
      id,
      status,
      total_amount,
      due_date,
      issued_at,
      sales (
        id,
        customers (
          id,
          full_name,
          email,
          phone
        ),
        sale_items (
          id,
          quantity,
          products (
            name,
            price
          )
        )
      )
    `
    )
    .eq("id", params.invoiceId)
    .single();

  if (error)
    return (
      <div>
        <p className="text-red-500">Error: {error?.message}</p>
        <p className="text-red-500">Invoice not found.</p>
      </div>
    );

  const invoice = data as unknown as SingleInvoiceData;

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Invoice #{invoice.id}</h1>

      <div className="space-y-2">
        <div>
          <span className="font-semibold">Customer:</span>{" "}
          {invoice.sales?.customers?.full_name}
        </div>
        <div>
          <span className="font-semibold">Payment Status:</span>{" "}
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
        </div>
        <div>
          <span className="font-semibold">Total:</span> ₦{invoice.total_amount}
        </div>
        <div>
          <span className="font-semibold">Due Date:</span>{" "}
          {invoice.due_date
            ? new Date(invoice.due_date).toLocaleDateString()
            : "N/A"}
        </div>
        <div>
          <span className="font-semibold">Date Created:</span>{" "}
          {new Date(invoice.issued_at).toLocaleDateString()}
        </div>
      </div>

      <div className="pt-4">
        <h2 className="text-lg font-semibold mb-2">Items</h2>
        <div className="space-y-2">
          {invoice.sales?.sale_items?.map((item) => (
            <Card key={item.id}>
              <CardContent className="p-4 flex justify-between items-center">
                <div>
                  <div className="font-semibold">{item.products.name}</div>
                  <div className="text-sm text-gray-500">
                    ₦{item.products.price} × {item.quantity}
                  </div>
                </div>
                <div className="font-bold">
                  ₦{item.products.price * item.quantity}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-4 w-full space-x-4">
          {invoice.status === "Unpaid" && <PaidBtn id={invoice.id} />}
          <Button variant={"outline"} size={"lg"}>
            Print
          </Button>
        </div>
      </div>
    </div>
  );
}
