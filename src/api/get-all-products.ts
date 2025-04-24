import { createClient } from "@/utils/supabase/server";

export const getProducts = async (filter = {}) => {
  const supabase = await createClient();

  const query = supabase.from("products").select("*");

  if ("search" in filter) {
    return query.ilike("name", `%${filter.search}%`);
  }

  return query;
};
