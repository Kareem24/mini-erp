import { createClient } from "@/utils/supabase/server";

export const getCustomers = async (filter = {}) => {
  const supabase = await createClient();
  let query = supabase.from("customers").select("*");

  if ("search" in filter) {
    query = query.ilike("full_name", `%${filter.search}%`);
  }

  return query;
};
