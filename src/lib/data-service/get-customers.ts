import { createClient } from "@/utils/supabase/server";

export const getCustomers = async (filter = {}) => {
  const supabase = await createClient();
  let query = supabase.from("customers").select("*");

  if ("search" in filter) {
    query = query.ilike("full_name", `%${filter.search}%`);
  }

  return query;
};

export const fetchSelectedCustomers = async () => {
  const supabase = await createClient();
  const { data } = await supabase.from("customers").select("id, full_name");
  return data;
};
