import { revalidateRoutePath } from "@/actions/revalidate-route";
import { ProductFormValues } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";

const addProduct = async (data: ProductFormValues) => {
  const supabase = createClient();
  return await supabase.from("products").insert([data]).select();
};

export const useAddProduct = () => {
  const { isPending, mutate } = useMutation({
    mutationFn: addProduct,
    onSuccess: (data) => {
      revalidateRoutePath();
      console.log(data);
    },
    onError: (error) => {
      console.error("Error adding product:", error);
    },
  });
  return { isPending, mutate };
};
