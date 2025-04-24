import { revalidateProductsPath } from "@/actions/revalidate-product";
import { ProductFormValues } from "@/lib/types";
import { createClient } from "@/utils/supabase/client";
import { useMutation } from "@tanstack/react-query";

const editProduct = async ({
  data,
  id,
}: {
  data: ProductFormValues;
  id: string;
}) => {
  const supabase = createClient();
  return await supabase
    .from("products")
    .update({ ...data })
    .eq("id", id)
    .select();
};

export const useEditProduct = () => {
  const { isPending, mutate } = useMutation({
    mutationFn: editProduct,
    onSuccess: (data) => {
      revalidateProductsPath();
      console.log(data);
    },
    onError: (error) => {
      console.error("Error Editing product:", error);
    },
  });
  return { isPending, mutate };
};
