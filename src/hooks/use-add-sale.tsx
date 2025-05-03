import { revalidateRoutePath } from "@/actions/revalidate-route";
import { createClient } from "@/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";
// import { revalidatePath } from "next/cache";

type SaleItem = {
  product_id: string;
  quantity: number;
};

async function createSale({
  customerId,
  items,
}: {
  customerId: string;
  items: SaleItem[];
}) {
  const supabase = createClient();

  if (!customerId || items.length === 0) {
    throw new Error("Invalid data: customer and items are required.");
  }

  console.log({ customerId, items });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  //   Get all unique product IDs
  const productIds = items.map((item) => item.product_id);

  // Fetch all products in one request
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("id, price")
    .in("id", productIds);

  if (productsError) {
    throw new Error("Failed to fetch products.");
  }

  // Create a map for quick lookup
  const priceMap = new Map(products.map((p) => [p.id, p.price]));

  // Calculate total amount
  let totalAmount = 0;
  for (const item of items) {
    const price = priceMap.get(item.product_id);
    if (price === undefined) {
      throw new Error(`Product not found: ${item.product_id}`);
    }
    totalAmount += price * item.quantity;
  }

  // Insert sale
  const { data: sale, error: saleError } = await supabase
    .from("sales")
    .insert([
      { customer_id: customerId, total_amount: totalAmount, user_id: user?.id },
    ])
    .select()
    .single();

  if (saleError) {
    throw new Error(saleError.message);
  }

  const saleId = sale.id;

  // Insert sale items

  const saleItems = items.map((item) => ({
    sale_id: saleId,
    product_id: item.product_id,
    quantity: item.quantity,
    total_price: item.quantity * priceMap.get(item.product_id),
    price: priceMap.get(item.product_id),
  }));

  const { error: saleItemsError } = await supabase
    .from("sale_items")
    .insert(saleItems);

  if (saleItemsError) {
    throw new Error(saleItemsError.message);
  }

  const { error: invoiceError } = await supabase.from("invoices").insert([
    {
      sale_id: saleId,
      total_amount: totalAmount,
      due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // due in 7 days
      created_by: (await supabase.auth.getUser()).data.user?.id,
    },
  ]);

  if (invoiceError) {
    throw new Error(invoiceError.message);
  }

  return {
    success: true,
    saleId: sale.id,
    total_amount: totalAmount,
    message: "Sale created successfully",
  };
}

export const useCreateSale = () => {
  const { mutate, isPending } = useMutation({
    mutationFn: ({
      customerId,
      items,
    }: {
      customerId: string;
      items: SaleItem[];
    }) => createSale({ customerId, items }),
    onSuccess: (data) => {
      console.log("Sale created successfully", data);
      revalidateRoutePath("/dashboard/sales");
    },
    onError: (error) => {
      console.error("Error creating sale:", error);
    },
  });
  return { mutate, isPending };
};
