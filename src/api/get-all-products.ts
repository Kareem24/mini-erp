import { createClient } from "@/utils/supabase/server";

export const getProducts = async (filter = {}) => {
  const supabase = await createClient();

  let query = supabase.from("products").select("*");

  if ("search" in filter) {
    query = query.ilike("name", `%${filter.search}%`);
  }
  if ("query" in filter) {
    if (filter["query"] === "newest") {
      query = query.order("created_at", { ascending: false });
    }
    if (filter["query"] === "oldest") {
      query = query.order("created_at", { ascending: true });
    }
    if (filter["query"] === "low") {
      query = query.eq("stock", 0);
    }
    if (filter["query"] === "in-stock") {
      query = query.gte("stock", 1);
    }
    if (filter["query"] === "low") {
      query = query.order("price", { ascending: false });
    }
  }

  return query;
};
