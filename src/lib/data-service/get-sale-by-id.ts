import { createClient } from "@/utils/supabase/server";

export async function getSaleById(id: string) {
  const supabase = await createClient();

  const { data: sale, error } = await supabase
    .from("sales")
    .select(
      `
      id,
      total_amount,
      created_at,
      customers(name),
      sale_items(
        quantity,
        products(name, price)
      )
    `
    )
    .eq("sale_id", id)
    .single();

  if (error) throw error;
  return sale;
}
